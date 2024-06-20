import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="min-h-screen min-w-screen bg-zinc-700 flex flex-col gap-10 items-center justify-center">
      <h1 className="text-3xl font-bold text-slate-200"> Shop admin </h1> 
      <div>
        <Link to={"/login"}>
          <Button>Login</Button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
