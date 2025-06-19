import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUserContext } from "../store/UserContext";
import axios from "axios";
import Header from "../components/partials/Header";
import Sidebar from "../components/partials/Sidebar";

const Root = () => {
  const { isLoggedIn, setIsLoggedIn, setUser } = useUserContext();

  const navigate = useNavigate();

  const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;

  // Re-check authentication everytime the app is rendered
  // useEffect(() => {
  //   const checkAuthen = async () => {
  //     try {
  //       const response = await axios.get(`${SERVER_HOST}/admin/authen`, {
  //         withCredentials: true,
  //       });

  //       if (response.status === 200) {
  //         const data = await response.data;
  //         if (data.user) {
  //           setUser(data.user);
  //           setIsLoggedIn(true);
  //         }
  //       }
  //     } catch (error) {
  //       // console.log(error);
  //       const newError = new Error(
  //         "Something went wrong, authentication failed!"
  //       );
  //       error.status = 500;
  //       navigate("/login");
  //       throw newError;
  //     }
  //   };
  //   checkAuthen();
  // }, []);
  useEffect(() => {
    const checkAuthen = async () => {
      try {
        const response = await axios.get(`${SERVER_HOST}/admin/authen`, {
          withCredentials: true,
        });

        if (response.status === 200 && response.data.user) {
          setUser(response.data.user);
          setIsLoggedIn(true);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error(
          "Authentication failed:",
          error?.response?.data || error.message
        );
        navigate("/login");
      }
    };

    checkAuthen();
  }, []);

  return (
    <div className="relative font-poppins">
      {isLoggedIn && <Header />}
      <div
        className={`${
          isLoggedIn
            ? "container mx-auto px-4 grid grid-cols-12 mt-20 relative"
            : ""
        }}`}
      >
        {isLoggedIn && (
          <div className="col-span-2 fixed">
            <Sidebar />
          </div>
        )}
        <div
          className={`${
            isLoggedIn
              ? "col-start-3 col-span-10 my-5 py-5 rounded-md shadow-md h-fit"
              : ""
          }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Root;
