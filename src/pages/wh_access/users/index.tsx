import { AccessUsersView } from "@/components/views/WhAccess/AccessUsersView";
import { authServices } from "@/services/auth";
import requestServices from "@/services/request";
import { useEffect, useState } from "react";

const AccessUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState<any>([]);

  const dataAllUsers = async () => {
    const { data } = await authServices.getAllusers();
    setUsers(data.data);
  };

  // const getRequestsDataUser = async () => {
  //   const { dataRequests }: any = await requestServices.getAllRequestByUser(

  //   );
  //   setRequests(dataRequests.data);
  // };

  // useEffect(() => {
  //   getRequestsDataUser();
  // }, []);

  useEffect(() => {
    dataAllUsers();
  }, []);

  // console.log(users);

  return (
    <>
      <div>
        <AccessUsersView users={users} requests={requests} />
      </div>
    </>
  );
};

export default AccessUsersPage;
