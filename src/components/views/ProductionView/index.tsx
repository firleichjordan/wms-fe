import { Fragment, useEffect, useState } from "react";
import styles from "./ProductionView.module.scss";
import Button from "@/components/ui/Button";
import ModalRequestProduct from "./ModalRequestProduct";

type ProductsType = {
  products: any;
};

const ProductView = (props: ProductsType) => {
  const { products } = props;

  const [productsData, setProductsData] = useState<any>([]);
  const [requestProduct, setRequestProduct] = useState<any | {}>({});

  useEffect(() => {
    setProductsData(products);
  }, [products]);

  return (
    <>
      <div className={styles.products}>
        <h2>Products List</h2>

        <table className={styles.products__table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Stock Quantity</th>
              <th>Request</th>
            </tr>
          </thead>
          <tbody>
            {productsData.map((product: any, index: any) => (
              <Fragment key={product._id}>
                <tr>
                  <td>{index + 1}</td>
                  <td>Image</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <div className={styles.products__table__request}>
                      <Button
                        type="button"
                        className={styles.products__table__request__button}
                        onClick={() => setRequestProduct(product)}
                      >
                        <i className="bx bxs-widget"></i>
                      </Button>
                    </div>
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {Object.keys(requestProduct).length > 0 && (
        <ModalRequestProduct
          requestProduct={requestProduct}
          setRequestProduct={setRequestProduct}
          setProductsData={setProductsData}
        />
      )}
    </>
  );
};

export default ProductView;
