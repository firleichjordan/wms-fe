import Modal from "@/components/ui/Modal";
import ModalGetRequestsUser from "@/components/views/WhAccess/AccessUsersView/ModalRequestsUser";
import { sessionContext } from "@/context/AuthContext";
import { authServices } from "@/services/auth";
import { getAllRequestByUserId } from "@/services/request";
import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AllRequestsByUserId = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };

  // const [requests, setRequests] = useState<any>([]);
  // const { data } = sessionContext();
  // const token = data.userToken?.accessToken;

  // useEffect(() => {
  //   getAllRequestByUserId(token, id, (status: any, res: any) => {
  //     if (status) {
  //       console.log(status);
  //       console.log(res);
  //       setRequests(res.data);
  //     }
  //   });
  // }, [id]);

  // console.log(requests);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await getAllRequestByUserId(token, id);
  //     setRequests(data);
  //   };

  //   fetchData();
  // }, []);

  // console.log(requests);

  return (
    <>
      <div>
        <Modal onClose={router.back}>
          <ModalGetRequestsUser id={id} />
        </Modal>
      </div>
    </>
  );
};

export default AllRequestsByUserId;
