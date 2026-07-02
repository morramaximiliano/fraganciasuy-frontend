import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "../../api/axios.js";
import { PlusLg } from "react-bootstrap-icons";
import AdminSidebar from "./AdminSidebar";
import AdminTables from "./AdminTables";
import AdminModalForm from "./AdminModalForm";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingElement, setEditingElement] = useState(null);
  const [products, setProducts] = useState([]);
  const [skus, setSkus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const handleEditClick = (element) => {
    setEditingElement(element);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#a855f7",
      cancelButtonColor: "#1f2937",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      background: "#111827",
      color: "#fff",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/${activeTab}/${id}`);

        toast.success("Eliminado correctamente");
        fetchData();
      } catch (error) {
        console.error(`🚨 Error al eliminar en ${activeTab}:`, error);
        toast.error(
          error.response?.data?.message || "No se pudo eliminar el recurso",
        );
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingElement(null);
  };

  const fetchData = async () => {
    try {
      const [resProd, resSku, resCat, resBrand] = await Promise.all([
        axios.get(`/products`),
        axios.get(`/skus`),
        axios.get(`/categories`),
        axios.get(`/brands`),
      ]);
      setProducts(resProd.data.products || resProd.data);
      setSkus(resSku.data.skus || resSku.data);
      setCategories(resCat.data.categories || resCat.data);
      setBrands(resBrand.data.brands || resBrand.data);
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    try {
      if (editingElement) {
        console.log(activeTab);
        await axios.patch(`/${activeTab}/${editingElement.id}`, data);
        toast.success("Actualizado correctamente!");
      } else {
        await axios.post(`/${activeTab}`, data);
        toast.success("Creado correctamente!");
      }
      setIsModalOpen(false);
      setEditingElement(null);
      fetchData();
    } catch (error) {
      console.error(`Error al procesar la solicitud en ${activeTab}:`, error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-950 text-gray-100 flex font-sans">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full overflow-hidden">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <h1 className="font-display text-3xl text-white tracking-wide">
              Dashboard de Control
            </h1>
            <p className="text-sm text-gray-500 font-light mt-1">
              Arquitectura modular limpia.
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm rounded-xl transition-colors shadow-lg shadow-purple-950/20"
          >
            <PlusLg /> Agregar {activeTab.toUpperCase()}
          </motion.button>
        </header>

        <section className="bg-gray-900/20 border border-gray-900 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-gray-900 bg-gray-900/40">
            <h2 className="font-display text-xl text-white tracking-wide">
              Listado de {activeTab}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <AdminTables
              activeTab={activeTab}
              onEdit={handleEditClick}
              data={{ products, skus, categories, brands }}
              onDelete={handleDeleteClick}
            />
          </div>
        </section>
      </main>

      <AnimatePresence>
        <AdminModalForm
          activeTab={activeTab}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={onSubmit}
          editData={editingElement}
          selectData={{ products, categories, brands }}
        />
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
