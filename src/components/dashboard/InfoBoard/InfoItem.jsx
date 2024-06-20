/* eslint-disable react/prop-types */

const InfoItem = ({ value, desc, icon }) => {
  if (!value) {
    return (
      <div className="animate-pulse bg-slate-100 border-l-slate-200 border-l-2 first:border-l-0 py-3 px-2 h-[100px]">
        <div className="h-5 w-70 bg-slate-200 rounded my-1"></div>
        <div className="h-5 w-60 bg-slate-200 rounded my-1"></div>
        <div className="h-5 w-40 bg-slate-200 rounded my-1"></div>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 border-l-slate-200 border-l-2 first:border-l-0 py-3 px-2 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">{value}</h1>
        <p className="capitalize text-slate-400">{desc}</p>
      </div>
      <div className="text-3xl text-slate-300">{icon}</div>
    </div>
  );
};


export default InfoItem;
