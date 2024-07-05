import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { sessionContext } from "@/context/AuthContext";
import productServices, { addProduct } from "@/services/product";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import styles from "./ModalAddProduct.module.scss";

type PropType = {
  setModalAddProduct: Dispatch<SetStateAction<boolean>>;
  setProductsData: Dispatch<SetStateAction<any>>;
};

const ModalAddProduct = (props: PropType) => {
  const { setModalAddProduct, setProductsData } = props;
  const [isLoading, setIsLoading] = useState(false);

  const { data } = sessionContext();
  const token = data.userToken?.accessToken;

  // console.log(token);

  const handleAddProduct = async (data: any) => {
    addProduct(token, data, async (status: any, res: any) => {
      if (status) {
        setModalAddProduct(false);
        setIsLoading(false);
        // window.location.reload();
        const { data }: any = await productServices.getAllProducts();
        setProductsData(data.data);
      } else {
        setIsLoading(false);
        console.log(res);
        alert("Added Failed");
      }
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const form: any = e.target as HTMLFormElement;

    const data = {
      name: form.name.value,
      category: form.category.value,
      spesification: form.spesification.value,
      quantity: form.quantity.value,
    };
    handleAddProduct(data);

    // console.log(data);

    // const result = await productServices.addProduct(data);

    // console.log(result);

    // if (result.status === 200) {
    //   setModalAddProduct(false);
    // }
  };

  return (
    <Modal onClose={() => setModalAddProduct(false)}>
      <h2 className={styles.title}>Insert Product</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="Name"
          name="name"
          type="text"
          placeholder="Product Name"
          className={styles.form__input}
        />
        <Input
          label="Category"
          name="category"
          type="text"
          placeholder="Product Category"
          className={styles.form__input}
        />
        <Input
          label="Spesification"
          name="spesification"
          type="text"
          placeholder="Product Spesification"
          className={styles.form__input}
        />
        <Input
          label="Quantity"
          name="quantity"
          type="number"
          placeholder="Product Quantity"
          className={styles.form__input}
        />
        <Button type="submit" className={styles.form__btn}>
          {isLoading ? "Loading..." : "Add Product"}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalAddProduct;
