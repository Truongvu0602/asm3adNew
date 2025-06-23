import { useNavigate } from "react-router-dom";
import InfoBoard from "../components/dashboard/InfoBoard/InfoBoard";
import Orderlist from "../components/dashboard/Orderlist/Orderlist";
import { useUserContext } from "../store/UserContext";
import { useEffect } from "react";

const Dashboard = () => {
  const { user } = useUserContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/chat");
    }
  }, [user, navigate]);

  // return (
  //   <div className=''>
  //     <p className='text-slate-500 m-2 font-bold'>Dashboard</p>
  //     <div className="infoBoard-wrapper">
  //       <InfoBoard/>
  //     </div>
  //     <div className="orderList-wrapper">
  //       <Orderlist/>
  //     </div>
  //   </div>
  // )
  return (
    <div>
      <p
        style={{
          color: "#64748b", // text-slate-500
          margin: "0.5rem", // m-2
          fontWeight: "bold", // font-bold
        }}
      >
        Dashboard
      </p>

      <div>
        <InfoBoard />
      </div>

      <div>
        <Orderlist />
      </div>
    </div>
  );
};

export default Dashboard;
