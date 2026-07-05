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
import SkusForms from "../../forms/SkusForms.jsx";
import ProductsForm from "../../forms/ProductsForm.jsx";
import CategoryForms from "../../forms/CategoryForms.jsx";
import BrandsForm from "../../forms/BrandsForm.jsx";

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
            <BrandsForm register={register} errors={errors} />
          )}
          {activeTab === "categories" && (
            <CategoryForms register={register} errors={errors} />
          )}
          {activeTab === "products" && (
            <ProductsForm
              register={register}
              errors={errors}
              products={products}
              categories={categories}
              brands={brands}
            />
          )}
          {activeTab === "skus" && (
            <SkusForms
              register={register}
              errors={errors}
              products={products}
            />
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
