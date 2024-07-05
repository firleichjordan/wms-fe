import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { sessionContext } from "@/context/AuthContext";
import productServices from "@/services/product";
import { createRequest } from "@/services/request";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

type PropTypes = {
  requestProduct: any;
  setRequestProduct: Dispatch<SetStateAction<boolean>>;
  setProductsData: Dispatch<SetStateAction<any>>;
};

const ModalRequestProduct = (props: PropTypes) => {
  const { requestProduct, setRequestProduct, setProductsData } = props;
  const [isLoading, setIsLoading] = useState(false);

  const { data } = sessionContext();
  const token = data.userToken?.accessToken;

  //   console.log(data.userData.user_id);
  //   console.log(requestProduct);

  const handleRequestProduct = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const form: any = e.target as HTMLFormElement;
    const data = {
      id: requestProduct.product_id,
      quantity: form.quantity.value,
    };

    // console.log(data);
    createRequest(token, data, async (status: any, res: any) => {
      if (status) {
        setRequestProduct(false);
        setIsLoading(false);
        const { data } = await productServices.getAllProducts();
        setProductsData(data.data);
      } else {
        setIsLoading(false);
        alert("Update Failed");
      }
    });
  };

  return (
    <>
      <Modal
        onClose={() => {
          setRequestProduct(false);
        }}
      >
        <h2>You will request : {requestProduct.name}</h2>
        <form onSubmit={handleRequestProduct}>
          <Input
            type="text"
            label="Product Name"
            name="name"
            placeholder={requestProduct.name}
            disable={true}
          />
          <Input
            type="text"
            label="Product Category"
            name="category"
            placeholder={requestProduct.category}
            disable={true}
          />
          <Input
            type="text"
            label="Product Spesicfication"
            name="spesification"
            placeholder={requestProduct.spesification}
            disable={true}
          />
          <Input type="number" label="Product Quantity" name="quantity" />
          <Button type="submit">Request</Button>
        </form>
      </Modal>
    </>
  );
};

export default ModalRequestProduct;
