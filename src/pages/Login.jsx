import axios from "axios";
import { Alert, Button, Card, Label, Spinner, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaCircleExclamation } from "react-icons/fa6";
import { useUserContext } from "../store/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { HiExclamationCircle } from "react-icons/hi";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const SERVER_HOST = import.meta.env.VITE_SERVER_HOST?.replace(/\/+$/, "");

  const navigate = useNavigate();

  const { setUser, setIsLoggedIn, isLoggedIn } = useUserContext();

  const handleFieldsChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post(`${SERVER_HOST}/admin/login`, form, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setLoading(false);
        const data = await response.data;
        setUser(data.user);
        setIsLoggedIn(true);
        navigate("/dashboard");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (error.response.status === 401) {
        window.location.reload();
      }
      if (error && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  useEffect(() => {
    if (isLoggedIn) navigate("/dashboard");
  }, []);

  // if (isLoggedIn) {
  //   return (
  //     <div className="bg-zinc-700 min-h-screen min-w-screen flex flex-col gap-5 items-center justify-center">
  //       <Alert color="info" icon={HiExclamationCircle}>
  //         You&apos;re already logged in.{" "}
  //         <Link className="font-bold" to="/dashboard">
  //           Go to dashboard
  //         </Link>
  //       </Alert>
  //     </div>
  //   );
  // }

  // return (
  //   <div className="bg-zinc-700 min-h-screen min-w-screen flex flex-col gap-5 items-center justify-center">
  //     <Alert
  //       className={`${error ? "opacity-100" : "opacity-0"}`}
  //       color="failure"
  //       onDismiss={() => setError(null)}
  //       icon={FaCircleExclamation}
  //     >
  //       {error}
  //     </Alert>
  //     <Card className="w-[350px] shadow-md">
  //       <h1 className="uppercase font-bold">Shop admin login</h1>
  //       <form onSubmit={handleLogin}>
  //         <div className="my-3">
  //           <Label htmlFor="email" value="Email :" />
  //           <TextInput
  //             id="email"
  //             value={form.email}
  //             onChange={handleFieldsChange}
  //             placeholder="Admin email"
  //             type="email"
  //             name="email"
  //           ></TextInput>
  //         </div>
  //         <div className="my-3">
  //           <Label htmlFor="password" value="Password :" />
  //           <TextInput
  //             id="password"
  //             value={form.password}
  //             onChange={handleFieldsChange}
  //             placeholder="Admin password"
  //             type="password"
  //             name="password"
  //           ></TextInput>
  //         </div>
  //         <Button type="submit" className="w-full" disabled={loading}>
  //           {loading ? (
  //             <span className="flex items-center">
  //               <Spinner size="sm" className="mr-2" />
  //               Loging in ...
  //             </span>
  //           ) : (
  //             "Login"
  //           )}
  //         </Button>
  //       </form>
  //     </Card>
  //   </div>
  // );
  return isLoggedIn ? (
    <div
      style={{
        backgroundColor: "#3f3f46",
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Alert color="info" icon={HiExclamationCircle}>
        You're already logged in.{" "}
        <Link
          to="/dashboard"
          style={{
            fontWeight: "bold",
            textDecoration: "underline",
            color: "#93c5fd",
          }}
        >
          Go to dashboard
        </Link>
      </Alert>
    </div>
  ) : (
    <div
      style={{
        backgroundColor: "#3f3f46",
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Alert
        style={{
          opacity: error ? 1 : 0,
          transition: "opacity 0.3s",
        }}
        color="failure"
        onDismiss={() => setError(null)}
        icon={FaCircleExclamation}
      >
        {error}
      </Alert>

      <div
        style={{
          width: "350px",
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "1.5rem",
          boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
        }}
      >
        <h1
          style={{
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: "1.2rem",
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          Shop admin login
        </h1>

        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <div>
            <Label htmlFor="email" value="Email :" />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Admin email"
              value={form.email}
              onChange={handleFieldsChange}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "1rem",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
              onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
            />
          </div>

          <div>
            <Label htmlFor="password" value="Password :" />
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Admin password"
              value={form.password}
              onChange={handleFieldsChange}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "1rem",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
              onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: loading ? "#60a5fa" : "#3b82f6",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "8px",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              transition: "background-color 0.3s, transform 0.2s",
            }}
            onMouseEnter={(e) =>
              !loading && (e.target.style.backgroundColor = "#2563eb")
            }
            onMouseLeave={(e) =>
              !loading && (e.target.style.backgroundColor = "#3b82f6")
            }
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
