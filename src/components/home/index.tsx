import Image from "next/image";
import styles from "./Home.module.scss";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.container__title}>
        <h1>WAREHOUSE MANAGEMENT SYSTEM</h1>
      </div>
      <div className={styles.container__content}>
        <div className={styles.container__content__img}>
          <Image
            src="/glob wms.png"
            alt="Vercel Logo"
            width={400}
            height={400}
          />
        </div>
        <div className={styles.container__content__text}>
          <h2 className={styles.container__content__text__title}>
            Welcome to Warehouse Management System
          </h2>
          {/* <h2 className={styles.container__content__text__subtitle}>We</h2>
          <p className={styles.container__content__text__sentence}>Save</p>
          <p className={styles.container__content__text__sentence}>Organize</p>
          <p className={styles.container__content__text__sentence}>
            Distribute
          </p>
          <p className={styles.container__content__text__sentence}>
            For smooth systematic warehouse management
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
