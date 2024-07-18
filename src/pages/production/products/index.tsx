import ProductView from "@/components/views/ProductionView";
import productServices from "@/services/product";
import { useEffect, useState } from "react";
import ProductsType from "../../../../types/productTypes/ProductsType";

const ProductsPage = () => {
  const [products, setProducts] = useState<ProductsType[]>([]);

  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
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
