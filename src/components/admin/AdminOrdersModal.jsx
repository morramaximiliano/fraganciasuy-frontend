import React from "react";
import { motion } from "framer-motion";
import { X } from "react-bootstrap-icons";

const AdminOrdersModal = ({
  activeTab,
  isOpen,
  handleCloseModal,
  order,
  onClose,
}) => {
  if (!isOpen) return null;
  console.log(order);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
      >
        <div className="p-6 border-b border-gray-800 flex flex-col justify-between items-center gap-4">
          <div className="w-full flex items-start justify-between gap-4">
            <h3 className="text-lg font-medium text-white">
              Detalles de la Orden #{order?.id}, usuario con id #{order?.userId}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-xl"
            >
              <X />
            </button>
          </div>
          <div className="flex w-full flex-col gap-4">
            {order?.details?.map((item) => (
              <div key={item.id}>
                <h3 className="text-xs text-gray-400 uppercase tracking-wider block mb-2">
                  Productos: - {item.sku.product.name} {item.sku.sizeMl}ml
                </h3>
                <h3 className="text-xs text-gray-400 uppercase tracking-wider block mb-2">
                  Cantidad: {item?.quantity}
                </h3>
              </div>
            ))}
            <h3 className="text-xs text-gray-400 uppercase tracking-wider block mb-2">
              Monto: {order?.totalAmount}
            </h3>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminOrdersModal;
