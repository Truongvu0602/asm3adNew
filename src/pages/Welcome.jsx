import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    // <div className="min-h-screen min-w-screen bg-zinc-700 flex flex-col gap-10 items-center justify-center">
    //   <h1 className="text-3xl font-bold text-slate-200"> Shop admin </h1>
    //   <div>

    //   </div>
    // </div>
    <div
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        backgroundColor: "#3f3f46", // Tailwind bg-zinc-700
        display: "flex",
        flexDirection: "column",
        gap: "2.5rem", // Tailwind gap-10
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1
        style={{
          fontSize: "1.875rem", // text-3xl
          fontWeight: "bold",
          color: "#e2e8f0", // text-slate-200
        }}
      >
        Shop admin
      </h1>
    </div>
  );
};

export default Welcome;
