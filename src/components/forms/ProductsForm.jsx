import React from "react";

const ProductsForm = ({ register, errors, categories, brands }) => {
  return (
    <>
      <div>
        <label className="text-xs text-gray-400 uppercase tracking-wider block mb-2">
          Nombre
        </label>
        <input
          type="text"
          {...register("name")}
          className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
        />
        {errors.name && (
          <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>
        )}
      </div>
      <div>
        <label className="text-xs text-gray-400 uppercase tracking-wider block mb-2">
          Descripción
        </label>
        <textarea
          {...register("description")}
          className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white h-20 resize-none"
        />
        {errors.description && (
          <p className="text-xs text-red-400 mt-1">
            {errors.description.message}
          </p>
        )}
      </div>
      <div>
        <label className="text-xs text-gray-400 uppercase tracking-wider block mb-2">
          URL Imagen
        </label>
        <input
          type="text"
          {...register("imageUrl")}
          className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white"
        />
        {errors.image && (
          <p className="text-xs text-red-400 mt-1">{errors.image.message}</p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-gray-400 block mb-2">Categoría</label>
          <select
            {...register("categoryId")}
            className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white"
          >
            <option value="">Seleccionar</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-400 block mb-2">Marca</label>
          <select
            {...register("brandId")}
            className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white"
          >
            <option value="">Seleccionar</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default ProductsForm;
