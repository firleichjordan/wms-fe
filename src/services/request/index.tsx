import instance from "@/lib/axios/instance";
import axios from "axios";
import RequestsType from "../../../types/requestTypes/RequestsType";
import StatusrequestTypes from "../../../types/requestTypes/StatusRequestTypes";
import UserRequestType from "../../../types/requestTypes/UserRequestType";

const requestServices = {
  getAllRequests: () => instance.get("/api/request"),
  getAllRequestByUser: (data?: RequestsType) =>
    instance.get("/api/request/user/id", { data }),
};

export default requestServices;

export const updateStatusRequest = async (
  token: string,
  data: StatusrequestTypes,
  callback: Function
) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const result = await axios.put(
      process.env.NEXT_PUBLIC_API_URL + "/api/request",
      data,
      config
    );
    callback(true, result.data);
  } catch (error) {
    callback(false, error);
  }
};

export const createRequest = async (
  token: string,
  data: UserRequestType,
  callback: Function
) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const result = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/api/request",
      data,
      config
    );
    callback(true, result.data);
  } catch (error) {
    callback(false, error);
  }
};

export const getAllRequestByUserId = async (token: string, id: string) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const result = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + `/api/request/wh_access/${id}`,
      config
    );
    // console.log(result.data);
    return result.data;
  } catch (error) {
    return error;
  }
};

// export const getRequestByUserId = async (token: string, id: string) => {
//   const config = {
//     headers: { Authorization: `Bearer ${token}` },
//   };

//   await axios
//     .get(
//       process.env.NEXT_PUBLIC_API_URL + `/api/request/wh_access/${id}`,
//       config
//     )
//     .then((res: any) => {
//       console.log(res.data);
//       return res.data;
//     })
//     .catch((error: any) => {
//       return error;
//     });
// };
