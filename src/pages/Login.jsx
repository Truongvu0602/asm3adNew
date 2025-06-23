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
        backgroundColor: "#3f3f46", // bg-zinc-700
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
        <Link to="/dashboard" style={{ fontWeight: "bold" }}>
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
        style={{ opacity: error ? 1 : 0, transition: "opacity 0.3s" }}
        color="failure"
        onDismiss={() => setError(null)}
        icon={FaCircleExclamation}
      >
        {error}
      </Alert>

      <Card
        style={{
          width: "350px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          padding: "1rem",
        }}
      >
        <h1
          style={{
            textTransform: "uppercase",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          Shop admin login
        </h1>

        <form onSubmit={handleLogin}>
          <div style={{ margin: "0.75rem 0" }}>
            <Label htmlFor="email" value="Email :" />
            <TextInput
              id="email"
              value={form.email}
              onChange={handleFieldsChange}
              placeholder="Admin email"
              type="email"
              name="email"
            />
          </div>

          <div style={{ margin: "0.75rem 0" }}>
            <Label htmlFor="password" value="Password :" />
            <TextInput
              id="password"
              value={form.password}
              onChange={handleFieldsChange}
              placeholder="Admin password"
              type="password"
              name="password"
            />
          </div>

          <Button type="submit" disabled={loading} style={{ width: "100%" }}>
            {loading ? (
              <span style={{ display: "flex", alignItems: "center" }}>
                <Spinner size="sm" style={{ marginRight: "0.5rem" }} />
                Logging in ...
              </span>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
