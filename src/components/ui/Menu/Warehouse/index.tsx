import styles from "./Warehouse.module.scss";
const WarehouseMenu = () => {
  return (
    <>
      <div className={styles.container}>
        {/* <ul>
          <li>
            <a href="/wh_access">Dashboard</a>
          </li>
          <li>
            <a href="/wh_access/products">Products</a>
          </li>
          <li>
            <a href="/wh_access/requests">Request</a>
          </li>
          <li>
            <a href="/wh_access/users">Users</a>
          </li>
        </ul> */}
        <button className={styles.container__btn}>Warehouse</button>
        <div className={styles.container__dropdown}>
          <a href="/wh_access">Dashboard</a>
          <a href="/wh_access/products">Products</a>
          <a href="/wh_access/requests">Requests</a>
          <a href="/wh_access/users">Users</a>
          <a href="/wh_access/profile">Profile</a>
        </div>
      </div>
    </>
  );
};

export default WarehouseMenu;
