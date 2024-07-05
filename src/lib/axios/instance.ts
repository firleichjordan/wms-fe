import axios from "axios";
import { sessionContext } from "@/context/AuthContext";

const data = JSON.parse(
  typeof window !== "undefined"
    ? window.localStorage.getItem("user") || "{}"
    : "{}"
);

// const { data } = sessionContext();

// const accessTkn = data.userToken?.accessToken;

// console.log(accessTkn);

// const headers = {
//   Accept: "application/json",
//   "Content-Type": "application/json",
//   "Cache-Control": "no-cache",
//   Expires: 0,
// };

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 60 * 1000,
  headers: {
    Authorization: `Bearer ${data.userToken?.accessToken}`,
  },
});

// instance.interceptors.request.use(
//   (config) => config,
//   (error) => Promise.reject(error)
// );

instance.interceptors.request.use(
  async (request) => {
    // const data = await sessionContext();

    if (!data) return request;
    const token = `Bearer ${data.userToken?.accessToken}`;
    request.headers.Authorization = token;
    console.log(token);
    return request;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default instance;
