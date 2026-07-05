import { createContext, useContext, useState, useEffect, useRef } from "react";
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
  const [isSyncing, setIsSyncing] = useState(false);
  const [hasMerged, setHasMerged] = useState(false);
  const itemCount = cart.reduce((acc, curr) => acc + curr.qty, 0);

  const isInitialLoad = useRef(true);

  const syncCart = async (cartToSync) => {
    // Si estamos en medio de una sincronización, no hacemos nada
    if (authLoading || !isAuthenticated || isSyncing) return;

    setIsSyncing(true);
    try {
      const itemsPayload = cartToSync.map((p) => ({
        skuId: p.item.id,
        quantity: p.qty,
      }));
      const response = await axios.post("/cart/sync", itemsPayload);

      if (response.data && Array.isArray(response.data.cartItems)) {
        const updatedCart = response.data.cartItems.map((dbItem) => ({
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

        // Verificamos si realmente hay cambios antes de hacer setCart
        // Esto evita el bucle infinito de re-renderizados
        if (JSON.stringify(updatedCart) !== JSON.stringify(cartToSync)) {
          setCart(updatedCart);
        }
      }
    } catch (error) {
      console.error("🚨 Error de sync:", error);
    } finally {
      setIsSyncing(false);
    }
  };

  const fetchCartFromDb = async () => {
    if (!isAuthenticated) {
      setIsInitialLoading(false);
      return;
    }

    try {
      const response = await axios.get("/cart");

      // Validamos que la respuesta sea un array antes de procesar
      if (response.data?.success && Array.isArray(response.data.cart)) {
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

        // Simplemente sobrescribimos el estado con lo que viene de la BD
        setCart(dbCart);
      }
    } catch (error) {
      console.error("🚨 Error al recuperar carrito:", error);
    } finally {
      setHasMerged(true);
      setIsInitialLoading(false);
      setTimeout(() => {
        isInitialLoad.current = false;
      }, 1000);
    }
  };

  // Persistencia local
  useEffect(() => {
    localStorage.setItem("fraganciasuy_cart", JSON.stringify(cart));
  }, [cart]);

  // Carga inicial al autenticar
  useEffect(() => {
    if (isAuthenticated) fetchCartFromDb();
    else setIsInitialLoading(false);
  }, [isAuthenticated]);

  // Sincronización automática
  useEffect(() => {
    if (
      isInitialLoading ||
      !isAuthenticated ||
      !hasMerged ||
      isInitialLoad.current
    )
      return;
    const delayDebounceFn = setTimeout(() => syncCart(cart), 500);
    return () => clearTimeout(delayDebounceFn);
  }, [cart, isAuthenticated, isInitialLoading, hasMerged]);

  const addToCart = (name, id, brand, stock, price, sizeMl, imageUrl) => {
    const item = { id, name, brand, stock, price, sizeMl, imageUrl };
    setCart((prev) => {
      const i = prev.findIndex((p) => p.item.id === id);
      if (i === -1 && stock > 0) return [...prev, { item, qty: 1 }];
      if (i !== -1 && prev[i].qty < stock) {
        const next = [...prev];
        next[i] = { ...next[i], qty: next[i].qty + 1 };
        return next;
      }
      return prev;
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) =>
      prev
        .map((p) => (p.item.id === id ? { ...p, qty: p.qty - 1 } : p))
        .filter((p) => p.qty > 0),
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((p) => p.item.id !== id));
  };

  const clearCart = async () => {
    setCart([]);
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
