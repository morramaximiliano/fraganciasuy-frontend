import React from "react";

const BrandsForm = ({ register, errors }) => {
  return (
    <div className="flex flex-col gap-4">
      <label className="text-xs text-gray-400 uppercase tracking-wider block mb-2">
        Nombre
      </label>
      <input
        type="text"
        {...register("name")}
        className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500"
        placeholder="Ej: Nombre..."
      />
      <label className="text-xs text-gray-400 uppercase tracking-wider block mb-2">
        Descripcion
      </label>
      <input
        type="text"
        {...register("description")}
        className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500"
        placeholder="Ej: slug (en minuscula)..."
      />
      {errors.name && (
        <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>
      )}
    </div>
  );
};

export default BrandsForm;
