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
  const [isSyncing, setIsSyncing] = useState(false);

  const itemCount = cart.reduce((acc, curr) => acc + curr.qty, 0);

  // Mapeo unificado para asegurar consistencia en todo el archivo
  const mapDbToLocal = (dbItem) => ({
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
  });

  const syncCart = async (cartToSync) => {
    if (authLoading || !isAuthenticated || isSyncing) return;

    setIsSyncing(true);
    try {
      const itemsPayload = cartToSync.map((p) => ({
        skuId: p.item.id,
        quantity: p.qty,
      }));
      const response = await axios.post("/cart/sync", itemsPayload);

      if (response.data.cartItems) {
        setCart(response.data.cartItems.map(mapDbToLocal));
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
      if (response.data?.success && response.data.cart) {
        // REEMPLAZAMOS totalmente el carrito local con el de la BD.
        // No hacemos merge manual para evitar duplicados.
        setCart(response.data.cart.map(mapDbToLocal));
      }
    } catch (error) {
      console.error("🚨 Error fetch:", error);
    } finally {
      setIsInitialLoading(false);
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
    if (isInitialLoading || !isAuthenticated) return;
    const delayDebounceFn = setTimeout(() => syncCart(cart), 500);
    return () => clearTimeout(delayDebounceFn);
  }, [cart, isAuthenticated]);

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
