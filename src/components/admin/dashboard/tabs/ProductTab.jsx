import React from "react";
import { Trash } from "react-bootstrap-icons";
import { PencilSquare } from "react-bootstrap-icons";

const ProductTab = ({ products, onEdit, onDelete }) => {
  return (
    <table className="w-full text-left text-sm">
      <thead>
        <tr className="border-b border-gray-900 text-xs text-gray-500 uppercase font-light">
          <th className="p-4 pl-6">Producto</th>
          <th className="p-4">Descripción</th>
          <th className="p-4 pr-6 text-right">Acciones</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-900/50">
        {products.map((p) => (
          <tr key={p.id} className="text-gray-300 hover:bg-gray-900/10">
            <td className="p-4 pl-6 font-medium text-white">{p.name}</td>
            <td className="p-4 text-gray-400 font-light truncate max-w-xs">
              {p.description}
            </td>
            <td className="p-4 pr-6 text-right flex gap-2 justify-end">
              <button
                onClick={() => onEdit(p)}
                className="p-2 text-gray-400 hover:text-red-400 bg-gray-900 rounded-lg border border-gray-800"
              >
                <PencilSquare />
              </button>
              <button
                onClick={() => onDelete(p.id)}
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

export default ProductTab;
