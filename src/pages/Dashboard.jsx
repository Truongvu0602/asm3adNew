import { useNavigate } from "react-router-dom";
import InfoBoard from "../components/dashboard/InfoBoard/InfoBoard"
import Orderlist from "../components/dashboard/Orderlist/Orderlist"
import { useUserContext } from "../store/UserContext";
import { useEffect } from "react";


const Dashboard = () => {


  const {user} = useUserContext();

  const navigate = useNavigate();


  useEffect(() => {
    if(user && user.role !== "admin") {
      navigate("/chat");
    }
  }, [user, navigate])

  return (
    <div className=''>
      <p className='text-slate-500 m-2 font-bold'>Dashboard</p>
      <div className="infoBoard-wrapper">
        <InfoBoard/>
      </div>
      <div className="orderList-wrapper">
        <Orderlist/>
      </div>
    </div>
  )
}

export default Dashboard