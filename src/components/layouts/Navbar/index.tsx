import { sessionContext } from "@/context/AuthContext";
import styles from "./Navbar.module.scss";
import { useRouter } from "next/router";
import WarehouseMenu from "@/components/ui/Menu/Warehouse";
import ProductionMenu from "@/components/ui/Menu/Production";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const { isAuthenticated, loginContext, logoutContext, data, dataRole } =
    sessionContext();
  const { push } = useRouter();

  // console.log(isAuthenticated);

  return (
    <>
      <div className={styles.navbar}>
        <h1 className={styles.navbar__logo}>
          <Link href="/" className={styles.navbar__logo__link}>
            <Image
              src="/wmsicon.png"
              alt="Vercel Logo"
              width={60}
              height={60}
              priority
            />
          </Link>
          {/* <i className="bx bxl-squarespace"></i> */}
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
