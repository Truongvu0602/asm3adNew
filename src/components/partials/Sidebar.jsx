import { HiViewBoards } from "react-icons/hi";
import { HiChatBubbleLeft, HiMiniInboxStack } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../../store/UserContext";

const Sidebar = () => {
  const { user } = useUserContext();

  return (
    <div className="">
      <ul className="flex flex-col gap-2 px-4 py-2 bg-slate-300 mt-5 rounded-md shadow-md ">
        { (user &&  user.role === "admin") && (
          <li className="hover:bg-slate-500 hover:cursor-pointer hover:text-slate-900 px-2 transition-all rounded-sm flex gap-3 items-center">
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
        {
          (user && user.role === "admin") && <li className="hover:bg-slate-500 hover:cursor-pointer hover:text-slate-900 px-2 transition-all rounded-sm flex gap-3 items-center ">
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
        }
        <li className="hover:bg-slate-500 hover:cursor-pointer hover:text-slate-900 px-2 transition-all rounded-sm flex gap-3 items-center">
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
