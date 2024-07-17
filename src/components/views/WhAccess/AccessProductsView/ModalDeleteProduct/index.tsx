import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { sessionContext } from "@/context/AuthContext";
import productServices, { deleteProductData } from "@/services/product";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import styles from "./ModalDeleteProduct.module.scss";
import ProductsType from "../../../../../../types/productTypes/ProductsType";

type PropType = {
  deleteProduct:
    | {
        product_id: string;
      }
    | ProductsType;
  setDeleteProduct: Dispatch<SetStateAction<{}>>;
  setProductsData: Dispatch<SetStateAction<any>>;
};

const ModalDeleteProduct = (props: PropType) => {
  const { deleteProduct, setDeleteProduct, setProductsData } = props;
  const [isLoading, setIsLoading] = useState(false);

  const { data } = sessionContext();
  const token = data.userToken?.accessToken;

  // console.log(deleteProduct.product_id);

  const handleDelete = async () => {
    const result = await deleteProductData(token, deleteProduct.product_id);
    if (result) {
      setDeleteProduct(false);
      setIsLoading(false);
      const data = await productServices.getAllProducts();
      setProductsData(data.data);
    } else {
      setIsLoading(false);
      alert("Delete Failed");
    }
  };

  return (
    <Modal onClose={() => setDeleteProduct(false)}>
      <h2 className={styles.title}>
        Are you sure you want to delete this product?
      </h2>
      <Button type="button" onClick={handleDelete} className={styles.form__btn}>
        {isLoading ? "Loading..." : "Delete Product"}
      </Button>
    </Modal>
  );
};

export default ModalDeleteProduct;
