import { Fragment, useEffect, useState } from "react";
import styles from "./ModalRequestListView.module.scss";
import RequestsType from "../../../../../types/requestTypes/RequestsType";

type PropTypes = {
  requests: RequestsType[];
};

const RequestListView = (props: PropTypes) => {
  const { requests } = props;

  const [requestData, setRequestData] = useState<RequestsType[]>([]);

  useEffect(() => {
    setRequestData(requests);
  });

  //   console.log(requestData);

  return (
    <>
      <div className={styles.request}>
        <h2>Your Request List</h2>

        <table className={styles.request__table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Request Status</th>
            </tr>
          </thead>
          <tbody>
            {requestData.map((request: RequestsType, index: number) => (
              <Fragment key={request._id}>
                <tr>
                  <td>{index + 1}</td>
                  <td>{request.name}</td>
                  <td>{request.category}</td>
                  <td>{request.quantity}</td>
                  <td>
                    {request.status == "Accepted" ? (
                      <button
                        type="button"
                        className={styles.request__table__status__accepted}
                      >
                        {request.status}
                      </button>
                    ) : request.status == "Rejected" ? (
                      <button
                        type="button"
                        className={styles.request__table__status__rejected}
                      >
                        {request.status}
                      </button>
                    ) : (
                      <button
                        type="button"
                        className={styles.request__table__status__pending}
                      >
                        {request.status}
                      </button>
                    )}
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RequestListView;
