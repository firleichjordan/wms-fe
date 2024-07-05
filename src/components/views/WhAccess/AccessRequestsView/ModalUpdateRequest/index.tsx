import Modal from "@/components/ui/Modal";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import styles from "./ModalUpdateRequest.module.scss";
import { sessionContext } from "@/context/AuthContext";
import requestServices, { updateStatusRequest } from "@/services/request";
import Button from "@/components/ui/Button";

type PropTypes = {
  updateRequest: any;
  setUpdateRequest: Dispatch<SetStateAction<boolean>>;
  setRequestsData: Dispatch<SetStateAction<any>>;
};

const ModalUpdateRequest = (props: PropTypes) => {
  const { setUpdateRequest, updateRequest, setRequestsData } = props;
  const [isLoading, setIsLoading] = useState(false);

  const { data } = sessionContext();
  const token = data.userToken?.accessToken;

  // console.log(updateRequest);

  const handleUpdateStatusRequest = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const from: any = e.target as HTMLFormElement;
    const data = {
      id: updateRequest.request_id,
      status: from.status.value,
    };

    updateStatusRequest(token, data, async (status: any, res: any) => {
      if (status) {
        setUpdateRequest(false);
        setIsLoading(false);
        const { data } = await requestServices.getAllRequests();
        setRequestsData(data.data);
      } else {
        setIsLoading(false);
        alert("Update Failed");
      }
    });
  };

  return (
    <>
      <Modal onClose={() => setUpdateRequest(false)}>
        <h2>Update Request Status</h2>
        <form onSubmit={handleUpdateStatusRequest} className={styles.form}>
          <select
            name="status"
            id="status"
            className={styles.form__input}
            defaultValue={updateRequest.status}
          >
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
          <Button type="submit" className={styles.form__btn}>
            Update
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default ModalUpdateRequest;
