import React from "react";
import { motion } from "framer-motion";
import {
  BoxSeam,
  Tags,
  PlusLg,
  ArrowRight,
  BookmarkStar,
} from "react-bootstrap-icons";

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: "products", label: "Productos Base", icon: <BoxSeam /> },
    { id: "skus", label: "Variantes (SKUs)", icon: <PlusLg /> },
    { id: "categories", label: "Categorías", icon: <Tags /> },
    { id: "brands", label: "Marcas", icon: <BookmarkStar /> },
  ];

  return (
    <aside className="w-64 border-r border-gray-900 bg-gray-950 p-6 flex flex-col justify-between hidden md:flex">
      <div>
        <div className="font-display text-2xl tracking-wider text-white mb-10 px-2">
          Gestión
          <span className="text-purple-400 italic font-medium">Panel</span>
        </div>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm tracking-wide transition-all relative ${
                activeTab === item.id
                  ? "text-purple-400 font-semibold"
                  : "text-gray-400 hover:text-gray-200 font-light"
              }`}
            >
              <span className="text-lg relative z-10">{item.icon}</span>
              <span className="relative z-10">{item.label}</span>
              {activeTab === item.id && (
                <motion.div
                  layoutId="activeAdminTab"
                  className="absolute inset-0 bg-purple-950/20 border border-purple-900/40 rounded-xl"
                  transition={{
                    type: "tween",
                    ease: "easeInOut",
                    duration: 0.25,
                  }}
                />
              )}
            </button>
          ))}
        </nav>
      </div>
      <div className="pt-6 border-t border-gray-900">
        <a
          href="/"
          className="flex items-center gap-2 text-xs tracking-widest uppercase text-gray-500 hover:text-purple-400 transition-colors px-2"
        >
          Volver a la tienda <ArrowRight />
        </a>
      </div>
    </aside>
  );
};

export default AdminSidebar;
