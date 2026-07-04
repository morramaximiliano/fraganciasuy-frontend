import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "react-bootstrap-icons";
import {
  brandSchema,
  categorySchema,
  productSchema,
  skuSchema,
} from "./adminPanelschemas.js";

const AdminModalForm = ({
  activeTab,
  isOpen,
  onClose,
  onSubmit,
  selectData: { products, categories, brands },
}) => {
  const getResolver = () => {
    if (activeTab === "brands") return zodResolver(brandSchema);
    if (activeTab === "categories") return zodResolver(categorySchema);
    if (activeTab === "products") return zodResolver(productSchema);
    return zodResolver(skuSchema);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: getResolver(),
    mode: "onTouch",
  });

  useEffect(() => {
    reset();
  }, [activeTab, isOpen, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
      >
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <h3 className="text-lg font-medium text-white">
            Agregar a {activeTab}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl"
          >
            <X />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(
            (data) => onSubmit(data),
            (errors) =>
              console.log("🚨 ZOD RECHAZÓ EL FORMULARIO. Errores:", errors),
          )}
          className="p-6 space-y-4"
        >
          {activeTab === "brands" && (
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
                <p className="text-xs text-red-400 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
          )}
          {activeTab === "categories" && (
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
                Slug
              </label>
              <input
                type="text"
                {...register("slug")}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500"
                placeholder="Ej: slug (en minuscula)..."
              />
              {errors.name && (
                <p className="text-xs text-red-400 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
          )}
          {activeTab === "products" && (
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
                  <p className="text-xs text-red-400 mt-1">
                    {errors.name.message}
                  </p>
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
                  <p className="text-xs text-red-400 mt-1">
                    {errors.image.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 block mb-2">
                    Categoría
                  </label>
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
                  <label className="text-xs text-gray-400 block mb-2">
                    Marca
                  </label>
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
          )}
          {activeTab === "skus" && (
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
                <label className="text-xs text-gray-400 block mb-2">
                  Tamaño (ml)
                </label>
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
                  <label className="text-xs text-gray-400 block mb-2">
                    Stock
                  </label>
                  <input
                    type="number"
                    {...register("stock")}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white"
                  />
                </div>
              </div>
            </>
          )}
          <div className="pt-4 border-t border-gray-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-sm text-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 rounded-xl text-sm font-medium text-white"
            >
              Guardar
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminModalForm;
