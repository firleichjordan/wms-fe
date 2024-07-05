import { AccessRequestsView } from "@/components/views/WhAccess/AccessRequestsView";
import requestServices from "@/services/request";
import { useEffect, useState } from "react";

const AccessRequestsPage = () => {
  const [requests, setRequests] = useState<any>([]);

  const getRequestsData = async () => {
    const { data } = await requestServices.getAllRequests();
    // console.log(data.data);
    setRequests(data.data);
  };

  useEffect(() => {
    getRequestsData();
  }, []);

  return (
    <>
      <div>
        <AccessRequestsView requests={requests} />
      </div>
    </>
  );
};

export default AccessRequestsPage;
