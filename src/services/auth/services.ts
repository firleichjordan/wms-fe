// import instance from "@/lib/axios/instance";

import axios from "axios";

// export async function signIn(email: any) {
//   const res = await instance.post("/api/user/login", email);

//   console.log(res);
// }

export const signIn = async (email: string, password: string) => {
  try {
    const result = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/api/user/login",
      email
    );
    console.log(result);
    return result;
  } catch (error) {
    return error;
    console.log(error);
  }
};
