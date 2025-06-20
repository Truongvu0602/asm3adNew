import { HiCurrencyDollar } from "react-icons/hi";
import { HiMiniFolderPlus, HiUserPlus } from "react-icons/hi2";
import InfoItem from "./InfoItem";
import { useEffect, useState } from "react";
import axios from "axios";

const InfoBoard = () => {
  const [infoValues, setInfoValues] = useState({});

  const serverHost = import.meta.env.VITE_SERVER_HOST;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${serverHost}admin/info`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          const data = await response.data;
          setInfoValues(data);
        }
      } catch (error) {
        if(error.response && error.response.status === 401) {
          window.location.reload();
        }
        if (error.response.data.message) {
          console.log(error.response.data.message);
        } else {
          console.log(error);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-0 mt-5">
      <InfoItem value={infoValues.totalUsers} desc="Clients" icon={<HiUserPlus />} />
      <InfoItem value={infoValues.totalEarned} desc="Earnings of Month" icon={<HiCurrencyDollar />} />
      <InfoItem value={infoValues.totalOrders} desc="Orders" icon={<HiMiniFolderPlus />} />
    </div>
  );
};

export default InfoBoard;
