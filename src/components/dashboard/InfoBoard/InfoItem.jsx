// /* eslint-disable react/prop-types */

// const InfoItem = ({ value, desc, icon }) => {
//   if (!value) {
//     return (
//       <div className="animate-pulse bg-slate-100 border-l-slate-200 border-l-2 first:border-l-0 py-3 px-2 h-[100px]">
//         <div className="h-5 w-70 bg-slate-200 rounded my-1"></div>
//         <div className="h-5 w-60 bg-slate-200 rounded my-1"></div>
//         <div className="h-5 w-40 bg-slate-200 rounded my-1"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-slate-100 border-l-slate-200 border-l-2 first:border-l-0 py-3 px-2 flex items-center justify-between">
//       <div>
//         <h1 className="text-3xl font-bold">{value}</h1>
//         <p className="capitalize text-slate-400">{desc}</p>
//       </div>
//       <div className="text-3xl text-slate-300">{icon}</div>
//     </div>
//   );
// };

// export default InfoItem;

/* eslint-disable react/prop-types */

const InfoItem = ({ value, desc, icon }) => {
  if (!value) {
    return (
      <div
        style={{
          animation: "pulse 1.5s ease-in-out infinite",
          backgroundColor: "#f1f5f9", // slate-100
          borderLeft: "2px solid #e2e8f0", // slate-200
          padding: "0.75rem 0.5rem",
          height: "100px",
        }}
      >
        <div
          style={{
            height: "20px",
            width: "280px",
            backgroundColor: "#e2e8f0", // slate-200
            borderRadius: "0.25rem",
            margin: "0.25rem 0",
          }}
        ></div>
        <div
          style={{
            height: "20px",
            width: "240px",
            backgroundColor: "#e2e8f0",
            borderRadius: "0.25rem",
            margin: "0.25rem 0",
          }}
        ></div>
        <div
          style={{
            height: "20px",
            width: "160px",
            backgroundColor: "#e2e8f0",
            borderRadius: "0.25rem",
            margin: "0.25rem 0",
          }}
        ></div>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#f1f5f9",
        borderLeft: "2px solid #e2e8f0",
        padding: "0.75rem 0.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h1 style={{ fontSize: "1.875rem", fontWeight: "bold" }}>{value}</h1>
        <p style={{ textTransform: "capitalize", color: "#94a3b8" }}>{desc}</p>
      </div>
      <div style={{ fontSize: "1.875rem", color: "#cbd5e1" }}>{icon}</div>
    </div>
  );
};

export default InfoItem;
