import { sessionContext } from "@/context/AuthContext";
import styles from "./Navbar.module.scss";
import { useRouter } from "next/router";
import WarehouseMenu from "@/components/ui/Menu/Warehouse";
import ProductionMenu from "@/components/ui/Menu/Production";

const Navbar = () => {
  const { isAuthenticated, loginContext, logoutContext, data, dataRole } =
    sessionContext();
  const { push } = useRouter();

  // console.log(isAuthenticated);

  return (
    <>
      <div className={styles.navbar}>
        <h1 className={styles.navbar__logo}>
          <i className="bx bxl-squarespace"></i>
        </h1>
        <div>
          {isAuthenticated ? (
            dataRole === "warehouse" ? (
              <WarehouseMenu />
            ) : (
              <ProductionMenu />
            )
          ) : (
            ""
          )}
          {/* {dataRole === "warehouse" ? <WarehouseMenu /> : <ProductionMenu />} */}
          <button
            type="button"
            className={styles.navbar__btn}
            onClick={
              isAuthenticated ? logoutContext : () => push("/auth/login")
            }
          >
            {isAuthenticated ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
