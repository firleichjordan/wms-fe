import Modal from "@/components/ui/Modal";
import { sessionContext } from "@/context/AuthContext";
import requestServices, { getAllRequestByUserId } from "@/services/request";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import styles from "./ModalRequestsUser.module.scss";

type PropTypes = {
  id: string;
};

const ModalGetRequestsUser = (props: PropTypes) => {
  const { id } = props;

  const [requests, setRequests] = useState<any>([]);

  // const [data, setData] = useState<any>([]);

  // const requestsData = requests.data;

  // useEffect(() => {
  //   setData(requestsData);
  // }, [requestsData]);

  // console.log(data);

  const { data } = sessionContext();
  const token = data.userToken?.accessToken;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllRequestByUserId(token, id);
      setRequests(data);
    };

    fetchData();
  }, [id]);

  const requestsData = requests.data;

  return (
    <>
      <div className={styles.requests}>
        <h2>Requests Data </h2>
        <div>
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
              {requestsData?.map((request: any, index: any) => (
                <Fragment key={request._id}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{request.username}</td>
                    <td>{request.name}</td>
                    <td>{request.quantity}</td>
                    <td className={styles.requests__table__status}>
                      {request.status == "Accepted" ? (
                        <p className={styles.requests__table__status__accepted}>
                          {request.status}
                        </p>
                      ) : request.status == "Rejected" ? (
                        <p className={styles.requests__table__status__rejected}>
                          {request.status}
                        </p>
                      ) : (
                        <p className={styles.requests__table__status__pending}>
                          {request.status}
                        </p>
                      )}
                    </td>
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ModalGetRequestsUser;
