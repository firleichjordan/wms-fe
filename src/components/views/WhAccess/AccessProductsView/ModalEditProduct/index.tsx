import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { sessionContext } from "@/context/AuthContext";
import productServices, { updateProduct } from "@/services/product";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import styles from "./ModalEditProduct.module.scss";
import ProductsType from "../../../../../../types/productTypes/ProductsType";

type PropType = {
  editProduct: any;
  setEditProduct: Dispatch<SetStateAction<boolean>>;
  setProductsData: Dispatch<SetStateAction<any>>;
};

const ModalEditProduct = (props: PropType) => {
  const { editProduct, setEditProduct, setProductsData } = props;
  const [isLoading, setIsLoading] = useState(false);

  const { data } = sessionContext();
  const token = data.userToken?.accessToken;

  const handleEditProduct = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target as HTMLFormElement | any;
    const data = {
      id: editProduct.product_id,
      name: form.name.value,
      category: form.category.value,
      spesification: form.spesification.value,
      quantity: form.quantity.value,
    };

    updateProduct(token, data, async (status: boolean, res: string) => {
      if (status) {
        setEditProduct(false);
        setIsLoading(false);

        const { data } = await productServices.getAllProducts();
        setProductsData(data.data);
      } else {
        setIsLoading(false);
        alert("Edit Failed");
      }
    });
  };

  return (
    <Modal onClose={() => setEditProduct(false)}>
      <h2 className={styles.title}>Edit Product</h2>
      <form className={styles.form} onSubmit={handleEditProduct}>
        <Input
          label="Name"
          name="name"
          type="text"
          placeholder="Product Name"
          defaultValue={editProduct.name}
          className={styles.form__input}
        />
        <Input
          label="Category"
          name="category"
          type="text"
          placeholder="Product Category"
          defaultValue={editProduct.category}
          className={styles.form__input}
        />
        <Input
          label="Spesification"
          name="spesification"
          type="text"
          placeholder="Product Spesification"
          defaultValue={editProduct.spesification}
          className={styles.form__input}
        />
        <Input
          label="Quantity"
          name="quantity"
          type="number"
          placeholder="Product Quantity"
          defaultValue={editProduct.quantity}
          className={styles.form__input}
        />
        <Button type="submit" className={styles.form__btn}>
          {isLoading ? "Loading..." : "Add Product"}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalEditProduct;
