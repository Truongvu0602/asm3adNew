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
    <div style={{ position: "relative", fontFamily: "Poppins, sans-serif" }}>
      {isLoggedIn && <Header />}

      <div
        style={
          isLoggedIn
            ? {
                maxWidth: "1280px",
                margin: "5rem auto 0 auto", // mt-20
                padding: "0 1rem", // px-4
                display: "grid",
                gridTemplateColumns: "repeat(12, 1fr)",
                position: "relative",
              }
            : {}
        }
      >
        {isLoggedIn && (
          <div
            style={{
              gridColumn: "span 2",
              position: "fixed",
            }}
          >
            <Sidebar />
          </div>
        )}

        <div
          style={
            isLoggedIn
              ? {
                  gridColumnStart: 3,
                  gridColumnEnd: 13,
                  margin: "1.25rem 0", // my-5
                  padding: "1.25rem 0", // py-5
                  borderRadius: "0.375rem", // rounded-md
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)", // shadow-md
                  height: "fit-content",
                }
              : {}
          }
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Root;
