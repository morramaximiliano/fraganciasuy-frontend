import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext.jsx";
import axios from "../api/axios.js";

const CartContext = createContext();

const CartState = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const localData = localStorage.getItem("fraganciasuy_cart");
    return localData ? JSON.parse(localData) : [];
  });

  const { isAuthenticated, loading: authLoading } = useAuth();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [hasMerged, setHasMerged] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // El total se calcula en tiempo real, eliminando el error de desincronización
  const itemCount = cart.reduce((acc, curr) => acc + curr.qty, 0);

  const syncCart = async (cartToSync) => {
    if (authLoading || !isAuthenticated || isSyncing) return;

    setIsSyncing(true);
    try {
      const itemsPayload = cartToSync.map((product) => ({
        skuId: product.item.id,
        quantity: product.qty,
      }));

      // Enviamos el array plano al backend
      await axios.post("/cart/sync", itemsPayload);
    } catch (error) {
      console.error("🚨 Error al sincronizar con BD:", error);
    } finally {
      setIsSyncing(false); // CORREGIDO: ahora se libera el bloqueo
    }
  };

  const fetchCartFromDb = async () => {
    if (!isAuthenticated) {
      setIsInitialLoading(false);
      return;
    }

    try {
      const response = await axios.get("/cart");
      if (response.data?.success && response.data.cart) {
        const dbCart = response.data.cart.map((dbItem) => ({
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
        }));

        // Fusionamos local con DB
        const mergedCart = [...cart];
        dbCart.forEach((dbItem) => {
          const index = mergedCart.findIndex(
            (local) => local.item.id === dbItem.item.id,
          );
          if (index !== -1) {
            mergedCart[index].qty = Math.min(
              mergedCart[index].qty + dbItem.qty,
              mergedCart[index].item.stock,
            );
          } else {
            mergedCart.push(dbItem);
          }
        });
        console.log("Estado antes de actualizar:", cart);
        console.log("Datos que vienen del servidor:", response.data.cart);
        setCart(mergedCart);
      }
    } catch (error) {
      console.error("🚨 Error al recuperar carrito:", error);
    } finally {
      setHasMerged(true);
      setIsInitialLoading(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("fraganciasuy_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    fetchCartFromDb();
  }, [isAuthenticated]);

  useEffect(() => {
    // Sincronizamos solo si ya terminamos la carga inicial y la fusión
    if (isInitialLoading || !hasMerged || !isAuthenticated) return;

    const delayDebounceFn = setTimeout(() => {
      syncCart(cart);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [cart, isAuthenticated, hasMerged]);

  const addToCart = (name, id, brand, stock, price, sizeMl, imageUrl) => {
    const item = { id, name, brand, stock, price, sizeMl, imageUrl };
    const i = cart.findIndex((p) => p.item.id === id);

    let newCart = [...cart];
    if (i === -1 && stock > 0) {
      newCart.push({ item, qty: 1 });
    } else if (i !== -1 && newCart[i].qty < stock) {
      newCart[i] = { ...newCart[i], qty: newCart[i].qty + 1 };
    }
    setCart(newCart);
  };

  const removeFromCart = (id) => {
    const i = cart.findIndex((p) => p.item.id === id);
    if (i === -1) return;

    let newCart = [...cart];
    if (newCart[i].qty > 1) {
      newCart[i] = { ...newCart[i], qty: newCart[i].qty - 1 };
    } else {
      newCart.splice(i, 1);
    }
    setCart(newCart);
  };

  const removeItem = (id) => {
    setCart(cart.filter((p) => p.item.id !== id));
  };

  const clearCart = async () => {
    setCart([]);
    localStorage.removeItem("fraganciasuy_cart");
    if (isAuthenticated) await axios.post("/cart/clear").catch(() => {});
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
        isInitialLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export default CartState;
