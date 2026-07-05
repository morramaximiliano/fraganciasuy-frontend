import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext.jsx"; // Tu hook de autenticación
import axios from "../api/axios.js"; // Tu instancia customizada de Axios
import { Spinner } from "flowbite-react";

const CartContext = createContext();

const CartState = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const localData = localStorage.getItem("fraganciasuy_cart");
    return localData ? JSON.parse(localData) : [];
  });

  const [itemCount, setItemCount] = useState(() => {
    const localCount = localStorage.getItem("fraganciasuy_cart_count");
    return localCount ? JSON.parse(localCount) : 0;
  });

  const { isAuthenticated, loading: authLoading } = useAuth();
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  {
    isInitialLoading && <Spinner />;
  }

  const syncCart = async () => {
    if (authLoading || !isAuthenticated || isInitialLoading) return;

    try {
      await axios.post("/cart/sync", {
        items: cart.map((product) => ({
          skuId: product.item.id,
          quantity: product.qty,
        })),
      });
    } catch (error) {
      console.error("🚨 Error al sincronizar el carrito con la BD:", error);
    }
  };

  const fetchCartFromDb = async () => {
    if (authLoading || !isAuthenticated) {
      setIsInitialLoading(false);
      return;
    }

    try {
      const response = await axios.get("/cart");
      let mergedCart = [];
      let totalCount = 0;
      if (response.data?.success && response.data.cart) {
        const dbCart = response.data.cart.map((dbItem) => {
          return {
            item: {
              id: dbItem.skuId,
              name: dbItem.sku?.product.name,
              brand: dbItem.sku?.product.brand.name,
              stock: dbItem.sku?.stock,
              price: dbItem.sku?.price,
              sizeMl: dbItem.sku?.sizeMl,
              imageUrl: dbItem.sku?.product.imageUrl,
            },
            qty: dbItem.quantity,
          };
        });
        mergedCart = [...cart];
        dbCart.forEach((dbItem) => {
          const index = mergedCart.findIndex(
            (local) => local.item.id === dbItem.item.id,
          );
          if (index !== -1) {
            const totalQty = mergedCart[index].qty + dbItem.qty;
            mergedCart[index].qty = Math.min(
              totalQty,
              mergedCart[index].item.stock,
            );
          } else {
            mergedCart.push(dbItem);
          }
        });
      }
      totalCount = mergedCart.reduce((acc, curr) => acc + curr.qty, 0);
      setCart(mergedCart);
      setItemCount(totalCount);
      syncCart();
    } catch (error) {
      console.error(
        "🚨 Error al recuperar/fusionar el carrito con la BD:",
        error,
      );
    } finally {
      setIsInitialLoading(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("fraganciasuy_cart", JSON.stringify(cart));
    localStorage.setItem("fraganciasuy_cart_count", JSON.stringify(itemCount));
  }, [cart, itemCount]);

  useEffect(() => {
    fetchCartFromDb();
  }, [isAuthenticated, authLoading]);

  useEffect(() => {
    if (isInitialLoading || !isAuthenticated) return;
    const delayDebounceFn = setTimeout(() => {
      syncCart();
    }, 800);
    return () => clearTimeout(delayDebounceFn);
  }, [cart, isAuthenticated, authLoading, isInitialLoading]);

  const addToCart = (name, id, brand, stock, price, sizeMl, imageUrl) => {
    const item = {
      id: id,
      name: name,
      brand: brand,
      stock: stock,
      price: price,
      sizeMl: sizeMl,
      imageUrl: imageUrl,
    };

    const i = cart.findIndex((product) => product.item.id === item.id);
    let newCart = [];
    if (i === -1 && item.stock > 0) {
      newCart = [...cart, { item: item, qty: 1 }];
      setItemCount(itemCount + 1);
    } else {
      newCart = [...cart];
      if (newCart[i].qty < newCart[i].item.stock) {
        newCart[i] = {
          ...newCart[i],
          qty: newCart[i].qty + 1,
        };
        setItemCount(itemCount + 1);
      }
    }
    setCart(newCart);
  };

  const removeFromCart = (id) => {
    const i = cart.findIndex((product) => product.item.id === id);
    let newCart = [];
    if (i !== -1) {
      newCart = [...cart];
      if (newCart[i].qty > 1) {
        newCart[i] = {
          ...newCart[i],
          qty: newCart[i].qty - 1,
        };
        setItemCount(itemCount - 1);
      } else if (newCart[i].qty === 1) {
        newCart.splice(i, 1);
        setItemCount(itemCount - 1);
      }
    }
    setCart(newCart);
  };

  const removeItem = (id) => {
    const i = cart.findIndex((product) => product.item.id === id);
    let newCart = [];
    if (i !== -1) {
      newCart = [...cart];
      setItemCount(itemCount - newCart[i].qty);
      newCart.splice(i, 1);
      setCart(newCart);
    }
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("fraganciasuy_cart");
    localStorage.removeItem("fraganciasuy_cart_count");
    localStorage.removeItem("cart");
    setItemCount(0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        itemCount,
        addToCart,
        removeFromCart,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export default CartState;
export { CartContext };
