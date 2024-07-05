import { sessionContext } from "@/context/AuthContext";
import { useRouter } from "next/router";

const DashboardPage = () => {
  const { logoutContext, data } = sessionContext();
  const { push } = useRouter();
  const handleLogout = async () => {
    // localStorage.removeItem("user");
    // push("/auth/login");

    await logoutContext();
    push("/auth/login");

    // typeof window !== "undefined"
    //   ? window.localStorage.removeItem("user")
    //   : null;
    // await push("/auth/login");
  };

  // console.log(data);

  return (
    <>
      <div className="margin-buttom: 100px;">
        <h1>Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
};

export default DashboardPage;
