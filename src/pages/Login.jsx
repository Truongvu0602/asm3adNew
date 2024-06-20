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

  const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;

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
      const response = await axios.post(
        `${SERVER_HOST}/admin/login`,
        form,
        {
          withCredentials: true,
        }
      );

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
      if(error.response.status === 401){
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
    if(isLoggedIn) navigate('/dashboard');
  },[])

  if(isLoggedIn){
    return (
      <div className="bg-zinc-700 min-h-screen min-w-screen flex flex-col gap-5 items-center justify-center">
        <Alert color="info" icon={HiExclamationCircle}>
          You&apos;re already logged in. <Link className="font-bold" to="/dashboard">Go to dashboard</Link>
        </Alert>
      </div>
    )
  }

  return (
    <div className="bg-zinc-700 min-h-screen min-w-screen flex flex-col gap-5 items-center justify-center">
      <Alert
        className={`${error ? "opacity-100" : "opacity-0"}`}
        color="failure"
        onDismiss={() => setError(null)}
        icon={FaCircleExclamation}
      >
        {error}
      </Alert>
      <Card className="w-[350px] shadow-md">
        <h1 className="uppercase font-bold">Shop admin login</h1>
        <form onSubmit={handleLogin}>
          <div className="my-3">
            <Label htmlFor="email" value="Email :" />
            <TextInput
              id="email"
              value={form.email}
              onChange={handleFieldsChange}
              placeholder="Admin email"
              type="email"
              name="email"
            ></TextInput>
          </div>
          <div className="my-3">
            <Label htmlFor="password" value="Password :" />
            <TextInput
              id="password"
              value={form.password}
              onChange={handleFieldsChange}
              placeholder="Admin password"
              type="password"
              name="password"
            ></TextInput>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {
              loading ? <span className="flex items-center"><Spinner size="sm" className="mr-2"/>Loging in ...</span> : "Login"
            }
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
