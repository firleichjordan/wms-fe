import { AccessProductsView } from "@/components/views/WhAccess/AccessProductsView";
import productServices from "@/services/product";
import { useEffect, useState } from "react";
import ProductsType from "../../../../types/productTypes/ProductsType";

const AccessProductsPage = () => {
  const [products, setProducts] = useState<ProductsType[] | any>([]);

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
