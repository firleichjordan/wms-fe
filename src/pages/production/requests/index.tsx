import RequestListView from "@/components/views/ProductionView/RequestListView";
import requestServices from "@/services/request";
import { useEffect, useState } from "react";
import RequestsType from "../../../../types/requestTypes/RequestsType";

const RequestsListPage = () => {
  const [requests, setRequests] = useState<RequestsType[]>([]);

  const getAllRequestByUser = async () => {
    const { data } = await requestServices.getAllRequestByUser();
    setRequests(data.data);
  };

  useEffect(() => {
    getAllRequestByUser();
  }, []);

  return (
    <>
      <RequestListView requests={requests} />
    </>
  );
};

export default RequestsListPage;
