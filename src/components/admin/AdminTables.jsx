import React from "react";
import { PencilSquare, Trash } from "react-bootstrap-icons";

const AdminTables = ({
  activeTab,
  onEdit,
  onDelete,
  data: { products, skus, categories, brands },
}) => {
  if (activeTab === "products") {
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
  }

  if (activeTab === "skus") {
    return (
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-900 text-xs text-gray-500 uppercase font-light">
            <th className="p-4 pl-6">Variante (SKU)</th>
            <th className="p-4">Stock</th>
            <th className="p-4">Precio</th>
            <th className="p-4 pr-6 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-900/50">
          {skus.map((s) => (
            <tr key={s.id} className="text-gray-300 hover:bg-gray-900/10">
              <td className="p-4 pl-6 font-medium text-white">
                {s.product.name}
              </td>
              <td className="p-4">
                <span
                  className={s.stock <= 5 ? "text-amber-400" : "text-gray-300"}
                >
                  {s.stock} u.
                </span>
              </td>
              <td className="p-4 text-purple-400 font-medium">${s.price}</td>
              <td className="p-4 pr-6 text-right flex gap-2 justify-end">
                <button
                  onClick={() => onEdit(s)}
                  className="p-2 text-gray-400 hover:text-red-400 bg-gray-900 rounded-lg border border-gray-800"
                >
                  <PencilSquare />
                </button>
                <button
                  onClick={() => onDelete(s.id)}
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
  }

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
        {(activeTab === "categories" ? categories : brands).map((item) => (
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

export default AdminTables;
