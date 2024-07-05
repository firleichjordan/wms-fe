import { sessionContext } from "@/context/AuthContext";
import instance from "@/lib/axios/instance";
import axios from "axios";

// const { data } = sessionContext();
// const token = data.userToken?.accessToken;

// const config = {
//   headers: { Authorization: `Bearer ${token}` },
// };

const productServices = {
  getAllProducts: () => instance.get("/api/product"),
  // addProduct: (data: any) => instance.post("/api/product/add", data),
};

export default productServices;

export const addProduct = async (token: string, data: any, callback: any) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const result = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/api/product/add",
      data,
      config
    );
    callback(true, result.data);
  } catch (error) {
    callback(false, error);
  }
};

export const updateProduct = async (
  token: string,
  data: any,
  callback: Function
) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const result = await axios.put(
      process.env.NEXT_PUBLIC_API_URL + "/api/product",
      data,
      config
    );
    callback(true, result.data);
  } catch (error) {
    callback(false, error);
  }
};

export const deleteProductData = async (token: string, id: string) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const result = await axios.delete(
      process.env.NEXT_PUBLIC_API_URL + `/api/product/${id}`,
      config
    );
    return result.data;
  } catch (error) {
    return error;
  }
};
