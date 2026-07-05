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

  const orderItems = order?.details ?? [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-gray-800 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 shadow-2xl shadow-black/50"
      >
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

        <div className="flex items-start justify-between gap-4 border-b border-gray-800/80 px-6 py-5 sm:px-7">
          <div className="space-y-2">
            <div className="inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-purple-300">
              Orden #{order?.id ?? "--"}
            </div>
            <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
              Detalles de la orden
            </h3>
            <p className="text-sm text-gray-400">
              Usuario #{order?.userId ?? "--"} · {order?.status ?? "Sin estado"}
            </p>
          </div>

          <button
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-800 bg-gray-950/60 text-gray-400 transition-colors hover:border-gray-700 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-6 px-6 py-6 sm:px-7">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-gray-800 bg-gray-950/60 p-4">
              <span className="block text-[11px] uppercase tracking-[0.22em] text-gray-500">
                Método de pago
              </span>
              <p className="mt-2 text-sm font-medium text-white">
                {order?.paymentMethod ?? "No informado"}
              </p>
            </div>
            <div className="rounded-2xl border border-gray-800 bg-gray-950/60 p-4">
              <span className="block text-[11px] uppercase tracking-[0.22em] text-gray-500">
                Estado
              </span>
              <p className="mt-2 text-sm font-medium text-purple-300">
                {order?.status ?? "Sin estado"}
              </p>
            </div>
            <div className="rounded-2xl border border-gray-800 bg-gray-950/60 p-4">
              <span className="block text-[11px] uppercase tracking-[0.22em] text-gray-500">
                Total
              </span>
              <p className="mt-2 text-sm font-medium text-white">
                ${order?.totalAmount ?? "0"} UYU
              </p>
            </div>
            <div className="rounded-2xl border border-gray-800 bg-gray-950/60 p-4">
              <span className="block text-[11px] uppercase tracking-[0.22em] text-gray-500">
                Cantidad
              </span>
              <p className="mt-2 text-sm font-medium text-white">
                {order?.quantity ?? orderItems.length ?? "0"}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-950/50 p-5">
            <div className="flex items-center justify-between gap-4 border-b border-gray-800 pb-4">
              <h4 className="text-sm font-semibold uppercase tracking-[0.22em] text-gray-400">
                Productos
              </h4>
              <span className="text-xs text-gray-500">
                {orderItems.length} item{orderItems.length === 1 ? "" : "s"}
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {orderItems.length > 0 ? (
                orderItems.map((item, index) => (
                  <div
                    key={item.id ?? `${item.sku?.id ?? index}-${index}`}
                    className="flex items-start justify-between gap-4 rounded-2xl border border-gray-800/80 bg-gray-900/70 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-white">
                        {item?.sku?.product?.name ?? "Producto sin nombre"}
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-gray-500">
                        {item?.sku?.sizeMl
                          ? `${item.sku.sizeMl}ml`
                          : "Tamaño no informado"}
                      </p>
                    </div>
                    <div className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-purple-300">
                      x{item?.quantity ?? 1}
                    </div>
                  </div>
                ))
              ) : (
                <p className="rounded-2xl border border-dashed border-gray-800 px-4 py-6 text-sm text-gray-500">
                  No hay productos cargados para esta orden.
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-800 bg-gray-950/60 p-4">
              <span className="block text-[11px] uppercase tracking-[0.22em] text-gray-500">
                Dirección de envío
              </span>
              <p className="mt-2 text-sm leading-6 text-gray-200">
                {order?.shippingAddress ?? "No informada"}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminOrdersModal;
