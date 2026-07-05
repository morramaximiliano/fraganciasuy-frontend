import React from "react";
import { ChevronUp } from "react-bootstrap-icons";
import { Trash } from "react-bootstrap-icons";

const OrderTab = ({ orders, onDelete, onViewMore, setSelectedOrder }) => {
  const selectOrder = (orders, id) => {
    const i = orders.findIndex((o) => o.id === id);
    return orders[i];
  };
  return (
    <table className="w-full text-left text-sm">
      <thead>
        <tr className="border-b border-gray-900 text-xs text-gray-500 uppercase font-light">
          <th className="p-4 pl-6">ID</th>
          <th className="p-4">Metodo de pago</th>
          <th className="p-4">Monto</th>
          <th className="p-4">Estado</th>
          <th className="p-4">Direccion de envio</th>
          <th className="p-4 pr-6 text-right">Acciones</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-900/50">
        {orders.map((order) => (
          <tr key={order.id} className="text-gray-300 hover:bg-gray-900/10">
            <td className="p-4 pl-6 text-gray-500 font-mono">{order.id}</td>
            <td className="p-4 font-medium text-white">
              {order.paymentMethod}
            </td>
            <td className="p-4 font-medium text-white">
              {order.totalAmount} UYU
            </td>
            <td className="p-4 font-medium text-white">{order.status}</td>
            <td className="p-4 font-medium text-white">
              {order.shippingAddress}
            </td>
            <td className="p-4 pr-6 text-right flex gap-2 justify-end">
              <button
                onClick={() => {
                  setSelectedOrder(selectOrder(orders, order.id));
                  onViewMore(order);
                }}
                className="p-2 text-gray-400 hover:text-red-400 bg-gray-900 rounded-lg border border-gray-800"
              >
                <ChevronUp />
              </button>
              <button
                onClick={() => onDelete(order.id)}
                className="p-2 text-gray-400 hover:text-red-400 bg-gray-900 rounded-lg border border-gray-800"
              >
                <Trash />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTab;
