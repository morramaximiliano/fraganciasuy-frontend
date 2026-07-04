import React from "react";
import { motion } from "framer-motion";

const AdminOrdersModal = ({ activeTab, isOpen, handleCloseModal, order }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
      />
      <div className="p-6 border-b border-gray-800 flex justify-between items-center">
        <h3 className="text-lg font-medium text-white">
          Detalles de la Orden #{order.id}
        </h3>
        <div className="flex flex-col gap-4">
          <h3 className="text-xs text-gray-400 uppercase tracking-wider block mb-2">
            Productos: {order.sku.product.name}
          </h3>
          <h3 className="text-xs text-gray-400 uppercase tracking-wider block mb-2">
            Cantidad: {order.quantity}
          </h3>
          <h3 className="text-xs text-gray-400 uppercase tracking-wider block mb-2">
            Monto: {order.totalAmount}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white text-xl"
        >
          <X />
        </button>
      </div>
    </div>
  );
};

export default AdminOrdersModal;
