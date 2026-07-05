import React from "react";
import { ChevronUp, PencilSquare, Trash } from "react-bootstrap-icons";
import ProductTab from "./tabs/ProductTab";
import SkuTab from "./tabs/SkuTab";
import CategoryTab from "./tabs/CategoryTab";
import BrandTab from "./tabs/BrandTab";
import OrderTab from "./tabs/OrderTab";

const AdminTables = ({
  activeTab,
  onEdit,
  onDelete,
  onViewMore,
  setSelectedOrder,
  data: { products, skus, categories, brands, orders },
}) => {
  if (activeTab === "products") {
    return;
    <ProductTab onDelete={onDelete} onEdit={onEdit} products={products} />;
  }

  if (activeTab === "skus") {
    return <SkuTab onDelete={onDelete} onEdit={onEdit} skus={skus} />;
  }
  if (activeTab === "categories")
    return (
      <CategoryTab
        onDelete={onDelete}
        onEdit={onEdit}
        categories={categories}
      />
    );

  if (activeTab === "brands")
    return <BrandTab onDelete={onDelete} onEdit={onEdit} brands={brands} />;

  if (activeTab === "orders")
    return (
      <OrderTab
        onDelete={onDelete}
        onViewMore={onViewMore}
        orders={orders}
        setSelectedOrder={setSelectedOrder}
      />
    );
};

export default AdminTables;
