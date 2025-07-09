import { useAppContext } from "../context/AppContext";
import { NavLink, useNavigate } from "react-router-dom";
import { CircleUserRound, LogOutIcon, Mail, Settings } from "lucide-react";
import toast from "react-hot-toast";

const DashboradSidebar = () => {
  const { setUser } = useAppContext();
  const navigate = useNavigate();

  const sidebarLinks = [
    {
      name: "My Profile",
      path: "/dashboard/my-profile",
      icon: CircleUserRound,
    },
    {
      name: "My Inbox",
      path: "/dashboard/inbox",
      icon: Mail,
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="w-full sm:w-60 flex flex-col border-r border-gray-200 bg-white h-full px-4 py-6">
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">Dashboard</h2>

      <nav className="flex flex-col gap-2">
        {sidebarLinks.map(({ name, path, icon: Icon }, index) => (
          <NavLink
            to={path}
            key={index}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-200 ${
                isActive
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <Icon className="w-5 h-5" />
            <span className="text-sm sm:text-base">{name}</span>
          </NavLink>
        ))}
      </nav>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          setUser(null);
          toast.success("Logout successfully!");
          navigate("/");
          scrollTo(0, 0);
        }}
        className="mt-10 flex items-center gap-3 text-red-600 hover:text-red-700 transition-all duration-200 px-4 py-2 rounded-md hover:bg-red-50"
      >
        <LogOutIcon className="w-5 h-5" />
        <span className="text-sm sm:text-base cursor-pointer">Log out</span>
      </button>
    </aside>
  );
};

export default DashboradSidebar;
