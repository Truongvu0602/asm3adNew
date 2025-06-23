import { useUserContext } from "../../store/UserContext";
import { Dropdown } from "flowbite-react";
import { HiDotsVertical } from "react-icons/hi";
import axios from "axios";

const Header = () => {
  const { user, setUser, setIsLoggedIn } = useUserContext();

  // const navigate = useNavigate();

  const SERVER_HOST = import.meta.env.VITE_SERVER_HOST?.replace(/\/+$/, "");

  const logOutHandler = async () => {
    try {
      const response = await axios.get(`${SERVER_HOST}/admin/logout`, {
        withCredentials: true,
      });
      if (response.status === 200) {
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

  // if (user) {
  //   return (
  //     <div className="z-10 fixed top-0 min-w-full transition-all text-black min-w-100 bg-slate-300/80 min-h-[70px] flex justify-between items-center px-5 backdrop-blur-md">
  //       <div>
  //         <h1 className="text-3xl font-bold text-black">
  //           Shop Admin Dashboard
  //         </h1>
  //       </div>
  //       <div className="userInfo flex items-center bg-slate-500/40 px-1 py-1 rounded-md">
  //         <p>
  //           Welcome, <strong>{user.email}</strong>
  //         </p>
  //         <Dropdown
  //           className="text-slate-500"
  //           label=""
  //           renderTrigger={() => (
  //             <span className=" transition-all text-slate-500 hover:text-white hover:cursor-pointer p-[1px] mx-[5px] bg-slate-600/10 rounded-sm">
  //               <HiDotsVertical />
  //             </span>
  //           )}
  //         >
  //           <Dropdown.Item onClick={logOutHandler} className="text-rose-600">
  //             Logout
  //           </Dropdown.Item>
  //         </Dropdown>
  //       </div>
  //     </div>
  //   );
  // }
  if (user) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          zIndex: 10,
          width: "100%",
          minHeight: "70px",
          backgroundColor: "rgba(203, 213, 225, 0.8)", // bg-slate-300/80
          color: "black",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 1.25rem",
          backdropFilter: "blur(8px)",
          transition: "all 0.3s ease",
        }}
      >
        <div>
          <h1
            style={{ fontSize: "1.875rem", fontWeight: "bold", color: "black" }}
          >
            Shop Admin Dashboard
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "rgba(107, 114, 128, 0.4)", // bg-slate-500/40
            padding: "0.25rem",
            borderRadius: "0.375rem",
          }}
        >
          <p style={{ margin: 0 }}>
            Welcome, <strong>{user.email}</strong>
          </p>

          <Dropdown
            style={{ color: "#64748b" }} // text-slate-500
            label=""
            renderTrigger={() => (
              <span
                style={{
                  transition: "all 0.2s",
                  color: "#64748b",
                  padding: "1px",
                  margin: "0 5px",
                  backgroundColor: "rgba(71, 85, 105, 0.1)", // bg-slate-600/10
                  borderRadius: "0.125rem",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = "white")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#64748b")}
              >
                <HiDotsVertical />
              </span>
            )}
          >
            <Dropdown.Item onClick={logOutHandler} style={{ color: "#dc2626" }}>
              Logout
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    );
  }
};

export default Header;
