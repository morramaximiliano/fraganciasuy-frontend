import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  Card,
} from "flowbite-react";
import axios from "../api/axios";
import { useEffect, useState, useContext } from "react";
import { useCart } from "../context/CartState";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const ProductsContainer = () => {
  const notify = () => toast.success("El producto fue agregado al carrito!");
  const { id } = useParams();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [skus, setSkus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSku, setSelectedSku] = useState(null);
  const getProducts = async () => {
    try {
      setLoading(true);
      const res = !id
        ? await axios.get("/products")
        : await axios.get(`/categories/${id}`);
      const data = !id ? res.data.products : res.data.category.products;
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };
  const onViewMore = async (product) => {
    try {
      const res = await axios.get(`/products/${product.id}`);
      const data = await res.data.product;
      setSelectedSku(data.skus[0]);
      setSkus(data.skus);
      setSelectedProduct(data);
      setOpenModal(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, [id]);
  return (
    <div className="min-h-screen w-full bg-gray-950 text-gray-100 selection:bg-purple-500 selection:text-white ">
      <header id="catalogo" className="pt-20 pb-12 text-center scroll-mt-20 ">
        <h2 className="text-4xl p-2 font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
          Nuestras Fragancias
        </h2>
        <p className="mt-3 text-sm text-gray-400 max-w-md mx-auto px-4">
          La mejor selección de perfumes, a un clic de distancia.
        </p>
      </header>
      <div className="p-3 mx-auto grid max-w-7xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => {
          return (
            <Card
              key={product.id}
              className="max-w-sm overflow-hidden border border-gray-700 bg-gray-900 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="h-[300px] w-full overflow-hidden bg-gray-950">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-gray-400">
                  {product.brand.name}
                </p>
                <h5 className="text-xl font-semibold text-white">
                  {product.name}
                </h5>
              </div>
              <Button
                onClick={() => {
                  onViewMore(product);
                }}
              >
                Ver Mas
              </Button>
            </Card>
          );
        })}
        {selectedProduct && (
          <Modal show={openModal}>
            <ModalHeader>
              {selectedSku
                ? `${selectedProduct.name} - ${selectedSku.sizeMl}ml`
                : selectedProduct.name}
            </ModalHeader>
            <ModalBody>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex items-center justify-center rounded-xl bg-gray-100 p-6">
                  <img
                    className="object-cover"
                    src={selectedProduct.imageUrl}
                    alt={selectedProduct.name}
                  />
                </div>
                <div className="space-y-5">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-gray-400">
                      {selectedProduct.brand.name}
                    </p>
                    <h3 className="text-2xl font-bold text-white">
                      {selectedProduct.name}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-400">
                    {selectedProduct.description}
                  </p>
                  {selectedSku && (
                    <p className="text-white">${selectedSku.price}US</p>
                  )}
                  <div>
                    <p className="mb-2 text-sm font-medium text-gray-300">
                      Presentación
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {skus.map((sku) => (
                        <Button
                          key={sku.id}
                          color={selectedSku?.id === sku.id ? "blue" : "gray"}
                          onClick={() => setSelectedSku(sku)}
                        >
                          {sku.sizeMl}ml
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                disabled={!selectedSku || selectedSku.stock <= 0}
                onClick={() => {
                  notify();
                  addToCart(
                    selectedProduct.name,
                    selectedSku.id,
                    selectedProduct.brand.name,
                    selectedSku.stock,
                    selectedSku.price,
                    selectedSku.sizeMl,
                    selectedProduct.imageUrl,
                  );
                  setOpenModal(false);
                }}
              >
                Agregar al carrito
              </Button>
              <Button color="alternative" onClick={() => setOpenModal(false)}>
                Cerrar
              </Button>
            </ModalFooter>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default ProductsContainer;
