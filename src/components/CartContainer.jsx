import React from "react";
import { Button, Card } from "flowbite-react";
import { useCart } from "../context/CartState";
import { motion, AnimatePresence } from "framer-motion";
import CheckoutSection from "./CheckoutSection";
import { Spinner } from "flowbite-react";

const CartContainer = () => {
  const { cart, addToCart, removeFromCart, removeItem, clearCart } = useCart();
  const total = cart.reduce((acc, product) => {
    return acc + (product.item.price || 0) * product.qty;
  }, 0);

  const fadeIn = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  if (cart.length === 0) {
    return (
      <div className="bg-gray-950">
        <div className="max-w-4xl min-h-screen mx-auto p-6">
          <motion.div {...fadeIn}>
            <Card className="bg-gray-950 border-gray-900 py-12">
              <p className="text-center font-sans font-light tracking-wide text-gray-400 text-lg">
                Tu carrito está vacío.
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  {
    isInitialLoading && <Spinner />;
  }

  return (
    <div className="bg-gray-950">
      <div className="max-w-4xl mx-auto p-6 min-h-screen bg-gray-950">
        <motion.div {...fadeIn}>
          <Card className="relative bg-gray-950 border-gray-900 p-2 sm:p-4">
            <button
              onClick={clearCart}
              className="absolute right-6 top-6 text-sm font-sans tracking-widest text-gray-400 hover:text-red-400 transition-colors uppercase font-light"
            >
              Vaciar
            </button>

            <h2 className="mb-8 font-display text-3xl tracking-wide text-white">
              Tu Carrito
            </h2>

            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {cart.map((product) => (
                  <motion.div
                    key={product.item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30, filter: "blur(4px)" }}
                    transition={{
                      type: "tween",
                      ease: "easeInOut",
                      duration: 0.3,
                    }}
                    className="relative flex flex-col sm:flex-row items-center justify-between rounded-xl border border-gray-900 bg-gray-900/40 p-5 pr-12 gap-4"
                  >
                    <button
                      onClick={() => removeItem(product.item.id)}
                      className="absolute right-4 top-4 text-gray-500 hover:text-red-400 transition-colors text-xl font-light"
                      aria-label="Eliminar producto"
                    >
                      ×
                    </button>

                    {product.item.imageUrl && (
                      <img
                        src={product.item.imageUrl}
                        alt={product.item.name}
                        className="h-24 w-24 rounded-lg object-cover bg-gray-950 border border-gray-800"
                      />
                    )}

                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="font-display text-xl text-white tracking-wide">
                        {product.item.name}
                      </h3>
                      {product.item.brand && (
                        <p className="font-sans text-xs tracking-widest uppercase text-purple-400/80 mt-1">
                          {product.item.brand}
                        </p>
                      )}
                      {product.item.sizeMl && (
                        <p className="font-sans text-sm text-gray-400 font-light mt-0.5">
                          Contenido: {product.item.sizeMl}ml
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-white font-sans">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeFromCart(product.item.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-800 bg-gray-950 text-gray-400 hover:text-white hover:border-gray-700 transition-colors"
                      >
                        -
                      </motion.button>

                      <span className="w-6 text-center font-medium">
                        {product.qty}
                      </span>

                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          addToCart(
                            product.item.name,
                            product.item.id,
                            product.item.brand,
                            product.item.stock,
                            product.item.price,
                            product.item.sizeMl,
                            product.item.imageUrl,
                          );
                        }}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-800 bg-gray-950 text-gray-400 hover:text-white hover:border-gray-700 transition-colors"
                      >
                        +
                      </motion.button>
                    </div>

                    <div className="text-center sm:text-right font-sans min-w-[100px]">
                      <p className="text-lg font-semibold text-white tracking-wide">
                        ${product.item.price * product.qty} UYU
                      </p>
                      {product.qty > 1 && (
                        <p className="text-xs text-gray-500 font-light mt-0.5">
                          ${product.item.price} UYU c/u
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="flex flex-col gap-3">
              <div className="mt-8 flex items-center justify-between border-t border-gray-900 pt-6 px-2">
                <h3 className="font-display text-2xl text-white">
                  Total estimado
                </h3>
                <p className="font-sans text-3xl font-bold tracking-tight text-white">
                  ${total} UYU
                </p>
              </div>
              <div>
                <CheckoutSection />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CartContainer;
