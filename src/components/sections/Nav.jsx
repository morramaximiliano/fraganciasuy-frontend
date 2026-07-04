import React, { useEffect, useState, useContext } from "react";
import { CartPlus, List, X } from "react-bootstrap-icons";
import { NavLink } from "react-router-dom";
import { useCart } from "../../context/CartState";
import axios from "../../api/axios";
import { motion, AnimatePresence } from "framer-motion";
import { UserProfileBadge } from "../UserProfileBadge";
import { useAuth } from "../../context/AuthContext";

const Nav = () => {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const { itemCount } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get("/categories");
        if (res.data?.categories) setCategories(res.data.categories);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };
    getCategories();
  }, []);

  const linkStyle = ({ isActive }) =>
    `font-sans text-sm tracking-widest uppercase transition-colors duration-200 relative py-2 ${
      isActive ? "text-purple-400 font-semibold" : "text-gray-300 font-light"
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full bg-gray-950/80 backdrop-blur-md border-b border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <NavLink
            to="/"
            className="font-display text-2xl md:text-3xl tracking-wider text-white hover:opacity-90 transition-opacity"
          >
            Fragancias
            <span className="text-purple-400 italic font-medium">UY</span>
          </NavLink>

          <div
            className="hidden md:flex items-center gap-8"
            onMouseLeave={() => setHoveredCategory(null)}
          >
            {categories.map((category) => {
              const categoryId = category.id;
              return (
                <NavLink
                  key={categoryId}
                  to={`/products/${categoryId}`}
                  className={linkStyle}
                  onMouseEnter={() => setHoveredCategory(categoryId)}
                >
                  <span className="relative z-10">{category.name}</span>

                  {hoveredCategory === categoryId && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-purple-500"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </NavLink>
              );
            })}

            {user && user.role === "admin" && (
              <NavLink
                to="/dashboard"
                className={linkStyle}
                onMouseEnter={() => setHoveredCategory("dashboard")}
              >
                <span className="relative z-10">Dashboard</span>
                {hoveredCategory === "dashboard" && (
                  <motion.div
                    layoutId="navUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-purple-500"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </NavLink>
            )}

            {!user && (
              <NavLink
                to="/login"
                className={linkStyle}
                onMouseEnter={() => setHoveredCategory("login")}
              >
                <span className="relative z-10">Ingresar</span>
                {hoveredCategory === "login" && (
                  <motion.div
                    layoutId="navUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-purple-500"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </NavLink>
            )}

            {!user && (
              <NavLink
                to="/register"
                className={linkStyle}
                onMouseEnter={() => setHoveredCategory("register")}
              >
                <span className="relative z-10">Registrarse</span>
                {hoveredCategory === "register" && (
                  <motion.div
                    layoutId="navUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-purple-500"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </NavLink>
            )}
          </div>

          <div className="flex items-center gap-4">
            <NavLink
              to="/cart"
              className="relative p-2 text-gray-300 hover:text-purple-400 transition-colors"
            >
              <CartPlus className="text-xl" />

              <AnimatePresence mode="popLayout">
                {itemCount > 0 && (
                  <motion.span
                    key={itemCount}
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    className="absolute -top-1 -right-1 bg-purple-600 text-white text-[10px] font-sans font-bold rounded-full w-4 h-4 flex items-center justify-center"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-300 hover:text-white p-2 relative w-10 h-10 flex items-center justify-center"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? "close" : "open"}
                  initial={{ opacity: 0, rotate: isOpen ? -45 : 45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: isOpen ? 45 : -45 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? (
                    <X className="text-2xl" />
                  ) : (
                    <List className="text-2xl" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
          <UserProfileBadge />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-gray-950 border-b border-gray-900 px-4 pt-2 pb-6 space-y-2 overflow-hidden"
          >
            {categories.map((category) => {
              const categoryId = category.id;
              return (
                <NavLink
                  key={categoryId}
                  to={`/products/${categoryId}`}
                  onClick={() => setIsOpen(false)}
                  className="block"
                >
                  <motion.span
                    whileTap={{ x: 5 }}
                    className="block font-sans text-xs tracking-widest uppercase text-purple-400 hover:text-purple-300 py-3 border-b border-gray-900/50 transition-colors"
                  >
                    {category.name}
                  </motion.span>
                </NavLink>
              );
            })}

            {!user && (
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block"
              >
                <motion.span
                  whileTap={{ x: 5 }}
                  className="block font-sans text-xs tracking-widest uppercase text-purple-400 hover:text-purple-300 py-3 border-b border-gray-900/50 transition-colors"
                >
                  Ingresar
                </motion.span>
              </NavLink>
            )}
            {!user && (
              <NavLink
                to="/register"
                onClick={() => setIsOpen(false)}
                className="block"
              >
                <motion.span
                  whileTap={{ x: 5 }}
                  className="block font-sans text-xs tracking-widest uppercase text-purple-400 hover:text-purple-300 py-3 font-medium transition-colors"
                >
                  Registrarse
                </motion.span>
              </NavLink>
            )}
            {user && user.role === "admin" && (
              <NavLink
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="block"
              >
                <motion.span
                  whileTap={{ x: 5 }}
                  className="block font-sans text-xs tracking-widest uppercase text-purple-400 hover:text-purple-300 py-3 border-b border-gray-900/50 transition-colors"
                >
                  Dashboard
                </motion.span>
              </NavLink>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Nav;
