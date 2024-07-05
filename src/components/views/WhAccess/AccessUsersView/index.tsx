import { FormEvent, useEffect, useState } from "react";
import styles from "./AccessUsersView.module.scss";
import Button from "@/components/ui/Button";
import requestServices from "@/services/request";
import ModalGetRequestsUser from "./ModalRequestsUser";
import Link from "next/link";
import Image from "next/image";

type PropTypes = {
  users: any;
  requests: any;
};

export const AccessUsersView = (props: PropTypes) => {
  const { users, requests } = props;

  const [userData, setUserData] = useState<any>([]);
  const [updateRole, setUpdateRole] = useState<any | {}>({});
  const [idUser, setIdUser] = useState<any>("");

  // const handleGetRequestsByUserId = async () => {
  //   const data = {
  //     id: iduser,
  //   };

  //   const dataRequest = await requestServices.getAllRequestByUser(data);

  // console.log(dataRequest);

  // const { data }: any = await requestServices.getAllRequestByUser(iduser);
  // console.log(data.data);
  // };

  // console.log(iduser);

  // console.log(userData);

  // console.log(requests);

  useEffect(() => {
    setUserData(users);
  }, [users]);

  return (
    <>
      <div className={styles.users}>
        <h2>Data User Production</h2>

        <div className={styles.users__table}>
          {userData?.map((user: any) => (
            <div key={user._id}>
              <Link href={`/wh_access/${user.user_id}`}>
                <button
                  type="button"
                  className={styles.users__table__card}
                  // onClick={() => setIdUser(user.user_id)}
                >
                  <div className={styles.users__table__card__data}>
                    <img
                      className={styles.users__table__card__data__img}
                      src={user.image}
                      alt=""
                      width={75}
                      height={75}
                    />
                    <div className={styles.users__table__card__data__text}>
                      <p>{user.username}</p>
                      <p>{user.email}</p>
                      <p>{user.role}</p>
                    </div>
                  </div>
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
      {/* {Object.keys(idUser).length > 0 && (
        <ModalGetRequestsUser setIdUser={setIdUser} idUser={idUser} />
      )} */}
    </>
  );
};
