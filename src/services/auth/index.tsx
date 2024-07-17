import instance from "@/lib/axios/instance";
import axios from "axios";
import SignUpTypes from "../../../types/userTypes/SignUpTypes";
import SignInTypes from "../../../types/userTypes/SignInTypes";
import UpdateUserTypes from "../../../types/userTypes/UpdateUserTypes";
import UpdatePasswordTypes from "../../../types/userTypes/UpdatePasswordTypes";

export const authServices = {
  registerAccount: (data: SignUpTypes) =>
    instance.post("/api/user/register", data),
  signIn: (data: SignInTypes) => instance.post("/api/user/login", data),
  getAllusers: () => instance.get("/api/user/production"),
};

export const getDetailUser = async (token: string) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const result = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/api/user",
      config
    );

    if (result.data) {
      return result.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (
  token: string,
  data: UpdateUserTypes,
  callback: Function
) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const result = await axios.put(
      process.env.NEXT_PUBLIC_API_URL + "/api/user",
      data,
      config
    );
    callback(true, result.data);
  } catch (error) {
    callback(false, error);
  }
};

export const uploadAvatar = async (
  token: string,
  data: File,
  callback: Function
) => {
  const form = new FormData();
  form.append("image", data);

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const result = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/api/user/avatar",
      form,
      config
    );
    callback(true, result);
  } catch (error) {
    callback(false, error);
  }
};

export const updateAvatar = async (token: string, data: File) => {
  try {
    const form = new FormData();
    form.append("image", data);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
      "Content-Type": "multipart/form-data",
    };

    const result = await axios.put(
      process.env.NEXT_PUBLIC_API_URL + "/api/user/avatar",
      form,
      config
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const updatePassword = async (
  token: string,
  data: UpdatePasswordTypes
) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const result = await axios.put(
      process.env.NEXT_PUBLIC_API_URL + "/api/user/changepassword",
      data,
      config
    );
    return result;
  } catch (error) {
    return error;
  }
};
