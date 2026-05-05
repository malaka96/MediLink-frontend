import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, Boxes, CalendarCheck } from "lucide-react";

export default function Layout() {
  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/inventory", label: "Inventory Management", icon: Boxes },
    { to: "/reservation", label: "Reservation", icon: CalendarCheck },
  ];

  return (
    <div className="min-h-screen sm:px-16 bg-gray-100 flex flex-col sm:flex-row">
      
      {/* SIDEBAR WRAPPER */}
      <div className="p-3 sm:p-4">
        <div className="w-full sm:w-64 bg-white border border-gray-200 rounded-2xl shadow-md p-3 space-y-2">
          
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-3 rounded-xl transition
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-4 sm:p-6">
        <Outlet />
      </div>

    </div>
  );
}