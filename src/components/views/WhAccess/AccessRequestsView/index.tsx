import { Fragment, useEffect, useState } from "react";
import styles from "./AccessRequestsView.module.scss";
import Button from "@/components/ui/Button";
import ModalUpdateRequest from "./ModalUpdateRequest";

type PropTypes = {
  requests: any;
};

export const AccessRequestsView = (props: PropTypes) => {
  const { requests } = props;

  const [requestsData, setRequestsData] = useState<any>([]);
  const [updateRequest, setUpdateRequest] = useState<any | {}>({});

  useEffect(() => {
    setRequestsData(requests);
  }, [requests]);

  //   console.log(requestsData);

  return (
    <>
      <div className={styles.requests}>
        <h2>Request List</h2>

        {/* <Button type="button" className={styles.requests__add}>
          <i className="bx bx-plus" /> Add Product
        </Button> */}

        <table className={styles.requests__table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {requestsData.map((request: any, index: any) => (
              <Fragment key={request._id}>
                <tr>
                  <td>{index + 1}</td>
                  <td>{request.username}</td>
                  <td className={styles.requests__table__name}>
                    {request.name}
                  </td>
                  <td>{request.quantity}</td>
                  <td>
                    {request.status == "Accepted" ? (
                      <button
                        type="button"
                        onClick={() => setUpdateRequest(request)}
                        className={styles.requests__table__status__accepted}
                      >
                        {request.status}
                      </button>
                    ) : request.status == "Rejected" ? (
                      <button
                        type="button"
                        onClick={() => setUpdateRequest(request)}
                        className={styles.requests__table__status__rejected}
                      >
                        {request.status}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setUpdateRequest(request)}
                        className={styles.requests__table__status__pending}
                      >
                        {request.status}
                      </button>
                    )}
                  </td>
                  {/* <td>
                    <div className={styles.requests__table__action}>
                      <Button type="button" className={styles.requests__edit}>
                        <i className="bx bxs-edit"></i>
                      </Button>
                      <Button type="button" className={styles.requests__delete}>
                        <i className="bx bxs-trash"></i>
                      </Button>
                    </div>
                  </td> */}
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {Object.keys(updateRequest).length > 0 && (
        <ModalUpdateRequest
          updateRequest={updateRequest}
          setUpdateRequest={setUpdateRequest}
          setRequestsData={setRequestsData}
        />
      )}
    </>
  );
};
