import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<any>({});

export const AuthProvider = ({ children }: any) => {
  const [dataToken, setDataToken] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dataRole, setDataRole] = useState("");
  const data = JSON.parse(
    typeof window !== "undefined"
      ? window.localStorage.getItem("user") || "{}"
      : "{}"
  );
  const { push } = useRouter();

  const loginContext = (newToken: any, newData: any) => {
    localStorage.setItem(
      "user",
      JSON.stringify({ userToken: newToken, userData: newData })
    );

    // useEffect(() => {
    //   console.log("isAuthenticated");
    // }, [isAuthenticated]);

    setIsAuthenticated(true);
    setDataToken(data);
  };

  // const value = Object {  };

  useEffect(() => {
    if (data && data.userToken) {
      setIsAuthenticated(true);
      setDataRole(data.userData.role);
    } else {
      setIsAuthenticated(false);
    }
  }, [data]);

  const logoutContext = () => {
    localStorage.removeItem("user");
    push("/auth/login");
    setIsAuthenticated(false);
  };

  // console.log(isAuthenticated);
  // console.log(data);

  return (
    <AuthContext.Provider
      value={{
        loginContext,
        logoutContext,
        isAuthenticated,
        data,
        dataToken,
        dataRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const sessionContext = () => useContext(AuthContext);
