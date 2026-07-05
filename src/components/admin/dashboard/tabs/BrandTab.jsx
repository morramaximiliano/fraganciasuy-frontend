import React from "react";
import { PencilSquare } from "react-bootstrap-icons";
import { Trash } from "react-bootstrap-icons";

const BrandTab = ({ brands, onEdit, onDelete }) => {
  return (
    <table className="w-full text-left text-sm">
      <thead>
        <tr className="border-b border-gray-900 text-xs text-gray-500 uppercase font-light">
          <th className="p-4 pl-6">ID</th>
          <th className="p-4">Nombre</th>
          <th className="p-4 pr-6 text-right">Acciones</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-900/50">
        {brands.map((item) => (
          <tr key={item.id} className="text-gray-300 hover:bg-gray-900/10">
            <td className="p-4 pl-6 text-gray-500 font-mono">{item.id}</td>
            <td className="p-4 font-medium text-white">{item.name}</td>
            <td className="p-4 pr-6 text-right flex gap-2 justify-end">
              <button
                onClick={() => onEdit(item)}
                className="p-2 text-gray-400 hover:text-red-400 bg-gray-900 rounded-lg border border-gray-800"
              >
                <PencilSquare />
              </button>
              <button
                onClick={() => onDelete(item.id)}
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

export default BrandTab;
