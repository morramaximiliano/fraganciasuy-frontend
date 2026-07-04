import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "../../api/axios.js";
import { PlusLg, List, X, ArrowRight } from "react-bootstrap-icons";
import AdminSidebar from "./AdminSidebar";
import AdminTables from "./AdminTables";
import AdminModalForm from "./AdminModalForm";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import AdminOrdersModal from "./AdminOrdersModal.jsx";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingElement, setEditingElement] = useState(null);
  const [products, setProducts] = useState([]);
  const [skus, setSkus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const menuItems = [
    { id: "products", label: "Productos Base" },
    { id: "skus", label: "Variantes (SKUs)" },
    { id: "categories", label: "Categorías" },
    { id: "brands", label: "Marcas" },
    { id: "orders", label: "Ordenes" },
  ];

  const handleViewMoreClick = (order) => {
    setIsModalOpen(true);
  };

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
    setSelectedOrder(null);
  };

  const fetchData = async () => {
    try {
      const [resProd, resSku, resCat, resBrand, resOrders] = await Promise.all([
        axios.get(`/products`),
        axios.get(`/skus`),
        axios.get(`/categories`),
        axios.get(`/brands`),
        axios.get(`/orders/all`),
      ]);
      setProducts(resProd.data.products);
      setSkus(resSku.data.skus);
      setCategories(resCat.data.categories);
      setBrands(resBrand.data.brands);
      setOrders(resOrders.data.orders);
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
        <div className="md:hidden mb-6 flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-gray-800 bg-gray-900/60 text-white transition-colors hover:border-purple-500 hover:text-purple-300"
            aria-label="Abrir menú"
          >
            <List size={22} />
          </motion.button>
          <div className="min-w-0 flex-1">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
              Panel
            </p>
            <p className="truncate text-sm text-gray-300">
              {menuItems.find((item) => item.id === activeTab)?.label}
            </p>
          </div>
        </div>

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
              data={{ products, skus, categories, brands, orders }}
              onDelete={handleDeleteClick}
              onViewMore={handleViewMoreClick}
              setSelectedOrder={setSelectedOrder}
            />
          </div>
        </section>
      </main>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Cerrar menú"
              className="fixed inset-0 z-40 bg-black/60 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.aside
              className="fixed left-0 top-0 z-50 h-full w-80 max-w-[85vw] border-r border-gray-900 bg-gray-950 p-6 md:hidden"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.22 }}
            >
              <div className="mb-8 flex items-center justify-between">
                <div className="font-display text-2xl tracking-wider text-white">
                  Gestión
                  <span className="text-purple-400 italic font-medium">
                    Panel
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-800 text-gray-300 transition-colors hover:border-gray-700 hover:text-white"
                  aria-label="Cerrar menú"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const isActive = activeTab === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                        isActive
                          ? "border-purple-500 bg-purple-950/40 text-purple-300"
                          : "border-gray-800 bg-gray-900/40 text-gray-300 hover:border-gray-700 hover:text-white"
                      }`}
                    >
                      <span className="block font-medium leading-tight">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </nav>

              <div className="mt-6 border-t border-gray-900 pt-6">
                <a
                  href="/"
                  className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-gray-500 transition-colors hover:text-purple-400"
                >
                  Volver a la tienda <ArrowRight />
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        <AdminModalForm
          activeTab={activeTab}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={onSubmit}
          editData={editingElement}
          selectData={{ products, categories, brands }}
        />
        <AdminOrdersModal
          activeTab={activeTab}
          isOpen={isModalOpen}
          order={selectedOrder}
          onClose={handleCloseModal}
        />
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
