import React from "react";

const SkusForms = ({ register, errors, products }) => {
  return (
    <>
      <div>
        <label className="text-xs text-gray-400 block mb-2">
          Producto Padre
        </label>
        <select
          {...register("productId")}
          className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white"
        >
          <option value="">Seleccionar Producto</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-xs text-gray-400 block mb-2">Tamaño (ml)</label>
        <input
          type="number"
          {...register("sizeMl")}
          className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white"
        />
      </div>
      <div>
        <label className="text-xs text-gray-400 block mb-2">
          Variante (SKU)
        </label>
        <input
          type="number"
          {...register("skuCode")}
          className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-gray-400 block mb-2">
            Precio (UYU)
          </label>
          <input
            type="number"
            step="0.01"
            {...register("price")}
            className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white"
          />
        </div>
        <div>
          <label className="text-xs text-gray-400 block mb-2">Stock</label>
          <input
            type="number"
            {...register("stock")}
            className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white"
          />
        </div>
      </div>
    </>
  );
};

export default SkusForms;
