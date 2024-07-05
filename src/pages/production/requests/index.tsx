import RequestListView from "@/components/views/ProductionView/RequestListView";
import requestServices from "@/services/request";
import { useEffect, useState } from "react";

const RequestsListPage = () => {
  const [requests, setRequests] = useState<any>([]);

  const getAllRequestByUser = async () => {
    const { data }: any = await requestServices.getAllRequestByUser();
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
