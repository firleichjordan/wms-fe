import ProductView from "@/components/views/ProductionView";
import productServices from "@/services/product";
import { useEffect, useState } from "react";

const ProductsPage = () => {
  const [products, setProducts] = useState<any>([]);

  const getAllProducts = async () => {
    const { data }: any = await productServices.getAllProducts();
    setProducts(data.data);
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <ProductView products={products} />
    </>
  );
};

export default ProductsPage;
