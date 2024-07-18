import { Fragment, useEffect, useState } from "react";
import styles from "./AccessProducts.module.scss";
import Button from "@/components/ui/Button";
import ModalAddProduct from "./ModalAddProduct";
import ModalEditProduct from "./ModalEditProduct";
import ModalDeleteProduct from "./ModalDeleteProduct";
import ProductsType from "../../../../../types/productTypes/ProductsType";

type PropTypes = {
  products: ProductsType;
};
export const AccessProductsView = (props: PropTypes) => {
  const { products } = props;

  const [productsData, setProductsData] = useState<ProductsType | {}>([]);
  const [modalAddProduct, setModalAddProduct] = useState(false);
  const [editProduct, setEditProduct] = useState<ProductsType | {}>({});
  const [deleteProduct, setDeleteProduct] = useState<ProductsType | any>({});

  // console.log(productsData);

  useEffect(() => {
    setProductsData(products);
  }, [products]);

  return (
    <>
      <div className={styles.products}>
        <h2>Products Management</h2>

        <Button
          type="button"
          className={styles.products__add}
          onClick={() => setModalAddProduct(true)}
        >
          <i className="bx bx-plus" /> Add Product
        </Button>

        <table className={styles.products__table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(productsData) &&
              productsData.map((product: ProductsType, index: number) => (
                <Fragment key={product._id}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>Image</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.quantity}</td>
                    <td>
                      <div className={styles.products__table__action}>
                        <Button
                          type="button"
                          className={styles.products__edit}
                          onClick={() => setEditProduct(product)}
                        >
                          <i className="bx bxs-edit"></i>
                        </Button>
                        <Button
                          type="button"
                          className={styles.products__delete}
                          onClick={() => setDeleteProduct(product)}
                        >
                          <i className="bx bxs-trash"></i>
                        </Button>
                      </div>
                    </td>
                  </tr>
                </Fragment>
              ))}
          </tbody>
        </table>
      </div>
      {modalAddProduct && (
        <ModalAddProduct
          setModalAddProduct={setModalAddProduct}
          setProductsData={setProductsData}
        />
      )}
      {Object.keys(editProduct).length > 0 && (
        <ModalEditProduct
          setEditProduct={setEditProduct}
          editProduct={editProduct as ProductsType}
          setProductsData={setProductsData}
        />
      )}
      {Object.keys(deleteProduct).length > 0 && (
        <ModalDeleteProduct
          deleteProduct={deleteProduct}
          setDeleteProduct={setDeleteProduct}
          setProductsData={setProductsData}
        />
      )}
    </>
  );
};
