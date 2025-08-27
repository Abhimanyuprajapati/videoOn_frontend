import { Link, useLocation } from "react-router";
import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";
import { UseAuth } from "../hooks/UseAuth";
import { ThemeSelector } from "./ThemeSelector";
import { LogoutAPI } from "../lib/api";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const Navbar = () => {
  const { authUser } = UseAuth();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

    const queryClient = useQueryClient();

  const handleLogout = async() => {
    // Implement logout functionality here
     try {
          const response = await LogoutAPI();
          console.log("logout successful:", response);
    
          if (response.status === 200) {
            console.log("logout successful:", response.data);
       queryClient.invalidateQueries({ queryKey: ["authUser"] });
          } else {
            toast.error(response.data.message);
          }
        } catch (err: any) {
          console.error("logout failed:", err);
          if (err.response) {
            toast.error(err.response.data.message || "An error occurred");
          } else {
            toast.error(err.message || "An error occurred");
          }
        }
  };    

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end w-full">
          {isChatPage && (
            <div className="pl-5">
              <Link to="/" className="flex items-center gap-2.5">
                <ShipWheelIcon className="size-9 text-primary" />
                <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
                  videoON
                </span>
              </Link>
            </div>
          )}

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <Link to={"/notifications"}>
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="h-6 w-6 text-base-content opacity-70" />
              </button>
            </Link>
          </div>

          <ThemeSelector />

          <div className="avatar  px-3">
            <div className="w-9 rounded-full">
              <img
                src={authUser?.profilePic}
                alt="User Avatar"
                rel="noreferrer"
              />
            </div>
          </div>

          {/* Logout button */}
          <button className="btn btn-ghost btn-circle" onClick={handleLogout}>
            <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
          </button>
        </div>
      </div>
    </nav>
  );
};
