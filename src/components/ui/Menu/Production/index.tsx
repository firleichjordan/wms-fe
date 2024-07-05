import styles from "./Production.module.scss";
const ProductionMenu = () => {
  return (
    <>
      {/* <div className={styles.container}>
        <ul>
          <li>
            <a href="/production/products">Products</a>
          </li>
          <li>
            <a href="/production/requests">Requests</a>
          </li>
        </ul>
      </div> */}
      <div className={styles.container}>
        <button className={styles.container__btn}>Production</button>
        <div className={styles.container__dropdown}>
          <a href="/production/products">Products</a>
          <a href="/production/requests">Requests</a>
          <a href="/production/profile">Profile</a>
        </div>
      </div>
    </>
  );
};

export default ProductionMenu;
