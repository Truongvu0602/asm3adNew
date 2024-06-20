import { useUserContext } from "../../store/UserContext";
import { Dropdown } from "flowbite-react";
import { HiDotsVertical } from "react-icons/hi";
import axios from "axios";

const Header = () => {
  const { user, setUser, setIsLoggedIn } = useUserContext();

  // const navigate = useNavigate();

  const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;

  const logOutHandler = async () => {
    try {
      const response = await axios.get(`${SERVER_HOST}/admin/logout`, {
        withCredentials: true,
      });
      if(response.status === 200) {
        setUser(null);
        setIsLoggedIn(false);
        window.location.reload();
        
      }
    } catch (error) {
      if (error.response.data.message) {
        alert(error.response.data.message);
        console.log(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };

  if (user) {
    return (
      <div className="z-10 fixed top-0 min-w-full transition-all text-black min-w-100 bg-slate-300/80 min-h-[70px] flex justify-between items-center px-5 backdrop-blur-md">
        <div>
          <h1 className="text-3xl font-bold text-black">
            Shop Admin Dashboard
          </h1>
        </div>
        <div className="userInfo flex items-center bg-slate-500/40 px-1 py-1 rounded-md">
          <p>
            Welcome, <strong>{user.email}</strong>
          </p>
          <Dropdown
            className="text-slate-500"
            label=""
            renderTrigger={() => (
              <span className=" transition-all text-slate-500 hover:text-white hover:cursor-pointer p-[1px] mx-[5px] bg-slate-600/10 rounded-sm">
                <HiDotsVertical />
              </span>
            )}
          >
            <Dropdown.Item onClick={logOutHandler} className="text-rose-600">
              Logout
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    );
  }
};

export default Header;
