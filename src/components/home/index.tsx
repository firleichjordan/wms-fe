import Image from "next/image";
import styles from "./Home.module.scss";

const HomePage = () => {
  return (
    <div className={styles.container}>
      {/* <div className={styles.container__title}>
        <h1>WAREHOUSE MANAGEMENT SYSTEM</h1>
      </div> */}
      <div className={styles.container__content}>
        <div className={styles.container__content__img}>
          <Image
            src="/glob wms.png"
            alt="Vercel Logo"
            width={400}
            height={400}
            priority
          />
        </div>
        <div className={styles.container__content__text}>
          <h1 className={styles.container__content__text__title}>WMS</h1>
          <p className={styles.container__content__text__sentence}>
            Save | Organize | Distribute
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
