import { AccessProductsView } from "@/components/views/WhAccess/AccessProductsView";
import productServices from "@/services/product";
import { useEffect, useState } from "react";

const AccessProductsPage = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <div>
        <AccessProductsView products={products} />
      </div>
    </>
  );
};

export default AccessProductsPage;
