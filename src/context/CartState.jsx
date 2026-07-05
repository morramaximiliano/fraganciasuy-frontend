import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "./AuthContext.jsx";
import axios from "../api/axios.js";

const CartContext = createContext();
const CART_STORAGE_KEY = "fraganciasuy_cart";

const mapDbItemToCartItem = (dbItem) => ({
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

const mergeCartItems = (primaryCart, secondaryCart) => {
  const itemsById = new Map();

  [...primaryCart, ...secondaryCart].forEach((entry) => {
    if (!entry?.item?.id || !entry.qty) return;

    const currentEntry = itemsById.get(entry.item.id);
    const mergedItem = currentEntry
      ? { ...currentEntry.item, ...entry.item }
      : entry.item;
    const stock =
      typeof mergedItem.stock === "number" ? mergedItem.stock : undefined;
    const mergedQty = (currentEntry?.qty ?? 0) + entry.qty;

    itemsById.set(entry.item.id, {
      item: mergedItem,
      qty: stock ? Math.min(mergedQty, stock) : mergedQty,
    });
  });

  return Array.from(itemsById.values());
};

const sameCart = (firstCart, secondCart) =>
  JSON.stringify(firstCart) === JSON.stringify(secondCart);

const CartState = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const localData = localStorage.getItem(CART_STORAGE_KEY);
      const parsedData = localData ? JSON.parse(localData) : [];
      return Array.isArray(parsedData) ? parsedData : [];
    } catch (error) {
      console.error("🚨 Error al leer el carrito local:", error);
      return [];
    }
  });

  const { isAuthenticated, loading: authLoading } = useAuth();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const itemCount = cart.reduce((acc, curr) => acc + curr.qty, 0);
  const hasHydratedRef = useRef(false);
  const skipNextSyncRef = useRef(false);
  const syncTimeoutRef = useRef(null);

  const syncCart = async (cartToSync) => {
    if (authLoading || !isAuthenticated) return;

    try {
      const itemsPayload = cartToSync.map((p) => ({
        skuId: p.item.id,
        quantity: p.qty,
      }));
      await axios.post("/cart/sync", itemsPayload);
    } catch (error) {
      console.error("🚨 Error de sync:", error);
    }
  };

  const fetchCartFromDb = async () => {
    if (!isAuthenticated) {
      hasHydratedRef.current = true;
      setIsInitialLoading(false);
      return;
    }

    try {
      const response = await axios.get("/cart");

      if (response.data?.success && Array.isArray(response.data.cart)) {
        const dbCart = response.data.cart.map(mapDbItemToCartItem);

        setCart((currentCart) => {
          const mergedCart = mergeCartItems(currentCart, dbCart);
          return sameCart(currentCart, mergedCart) ? currentCart : mergedCart;
        });
      }
    } catch (error) {
      console.error("🚨 Error al recuperar carrito:", error);
    } finally {
      hasHydratedRef.current = true;
      setIsInitialLoading(false);
    }
  };

  // Persistencia local
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("🚨 Error al guardar el carrito local:", error);
    }
  }, [cart]);

  // Carga inicial al autenticar
  useEffect(() => {
    if (authLoading) return;

    fetchCartFromDb();
  }, [authLoading, isAuthenticated]);

  // Sincronización automática
  useEffect(() => {
    if (!hasHydratedRef.current || isInitialLoading || !isAuthenticated) {
      return;
    }

    if (skipNextSyncRef.current) {
      skipNextSyncRef.current = false;
      return;
    }

    if (syncTimeoutRef.current) {
      clearTimeout(syncTimeoutRef.current);
    }

    syncTimeoutRef.current = setTimeout(() => {
      syncCart(cart);
    }, 400);

    return () => {
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
      }
    };
  }, [cart, isAuthenticated, isInitialLoading, authLoading]);

  const addToCart = (name, id, brand, stock, price, sizeMl, imageUrl) => {
    if (stock <= 0) return;

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
    skipNextSyncRef.current = true;
    setCart([]);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (error) {
      console.error("🚨 Error al limpiar el carrito local:", error);
    }

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
