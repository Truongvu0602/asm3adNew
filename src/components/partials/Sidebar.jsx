import { HiViewBoards } from "react-icons/hi";
import { HiChatBubbleLeft, HiMiniInboxStack } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../../store/UserContext";

const Sidebar = () => {
  const { user } = useUserContext();

  // return (
  //   <div className="">
  //     <ul className="flex flex-col gap-2 px-4 py-2 bg-slate-300 mt-5 rounded-md shadow-md ">
  //       { (user &&  user.role === "admin") && (
  //         <li className="hover:bg-slate-500 hover:cursor-pointer hover:text-slate-900 px-2 transition-all rounded-sm flex gap-3 items-center">
  //           <HiViewBoards />
  //           <NavLink
  //             to="/dashboard"
  //             className={({ isActive }) =>
  //               isActive
  //                 ? "border-b-2 border-black"
  //                 : "border-b-2 border-transparent"
  //             }
  //           >
  //             <span>Dashboard</span>
  //           </NavLink>
  //         </li>
  //       )}
  //       {
  //         (user && user.role === "admin") && <li className="hover:bg-slate-500 hover:cursor-pointer hover:text-slate-900 px-2 transition-all rounded-sm flex gap-3 items-center ">
  //         <HiMiniInboxStack />
  //         <NavLink
  //           end
  //           to="/products"
  //           className={({ isActive }) =>
  //             isActive
  //               ? "border-b-2 border-black"
  //               : "border-b-2 border-transparent"
  //           }
  //         >
  //           <span>Products</span>
  //         </NavLink>
  //       </li>
  //       }
  //       <li className="hover:bg-slate-500 hover:cursor-pointer hover:text-slate-900 px-2 transition-all rounded-sm flex gap-3 items-center">
  //         <HiChatBubbleLeft />
  //         <NavLink
  //           to="/chat"
  //           className={({ isActive }) =>
  //             isActive
  //               ? "border-b-2 border-black"
  //               : "border-b-2 border-transparent"
  //           }
  //         >
  //           <span>Chat</span>
  //         </NavLink>
  //       </li>
  //     </ul>
  //   </div>
  // );
  return (
    <div>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#cbd5e1", // bg-slate-300
          marginTop: "1.25rem",
          borderRadius: "0.375rem",
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        }}
      >
        {user && user.role === "admin" && (
          <li
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0 0.5rem",
              borderRadius: "0.125rem",
              transition: "all 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#64748b"; // hover:bg-slate-500
              e.currentTarget.style.color = "#1e293b"; // hover:text-slate-900
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "inherit";
            }}
          >
            <HiViewBoards />
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-black"
                  : "border-b-2 border-transparent"
              }
            >
              <span>Dashboard</span>
            </NavLink>
          </li>
        )}
        {user && user.role === "admin" && (
          <li
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0 0.5rem",
              borderRadius: "0.125rem",
              transition: "all 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#64748b";
              e.currentTarget.style.color = "#1e293b";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "inherit";
            }}
          >
            <HiMiniInboxStack />
            <NavLink
              end
              to="/products"
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-black"
                  : "border-b-2 border-transparent"
              }
            >
              <span>Products</span>
            </NavLink>
          </li>
        )}
        <li
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0 0.5rem",
            borderRadius: "0.125rem",
            transition: "all 0.2s",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#64748b";
            e.currentTarget.style.color = "#1e293b";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "inherit";
          }}
        >
          <HiChatBubbleLeft />
          <NavLink
            to="/chat"
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-black"
                : "border-b-2 border-transparent"
            }
          >
            <span>Chat</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
