import { Bell, LogOut, Package } from "lucide-react";
import { useContext, useState } from "react";
import { logout } from "../services/apis/AuthApi";
import { AuthContext } from "../context/AuthContext";

export default function Topbar() {
  const { setUser, setIsLoading } = useContext(AuthContext)!;
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    setIsLoading(true);

    try {
      await logout();
    } catch {
      // ignore
    } finally {
      setUser(null);
      setIsLoading(false);
      setIsLoggingOut(false);
      window.location.replace("/login");
    }
  };

  return (
    <div className="w-full bg-white px-3 sm:px-20 py-3 sm:py-3 flex items-center justify-between border-b-2 border-gray-200">
      
      {/* LEFT: Branding */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        
        {/* Logo */}
        <div className="w-10 h-10 bg-blue-600 rounded-md flex items-center justify-center shrink-0">
          <Package className="w-5 h-5 text-white" />
        </div>

        {/* Title + Subtitle */}
        <div className="leading-tight truncate">
          <p className="font-semibold text-sm sm:text-base text-gray-800">
            MediLink
          </p>
          <p className="text-[10px] sm:text-xs text-gray-500 truncate">
            Smart Healthcare Management
          </p>
        </div>
      </div>

      {/* RIGHT: Actions */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        
        {/* Notification Button */}
        <button className="p-2 rounded-full hover:bg-gray-100 transition">
          <Bell className="w-5 h-5 text-gray-600" />
        </button>

        {/* Logout Button */}
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-md hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <LogOut className="w-5 h-5 text-gray-600" />
          <span className="text-xs sm:text-sm text-gray-700">
            {isLoggingOut ? "Logging out..." : "Logout"}
          </span>
        </button>

      </div>
    </div>
  );
}
