import { useState } from "react";
import {
  LayoutDashboard,
  Boxes,
  CalendarCheck
} from "lucide-react";

type Page = "dashboard" | "inventory" | "reservation";

export default function DashboardLayout() {
  const [activePage, setActivePage] = useState<Page>("dashboard");

  const navItems = [
    {
      key: "dashboard" as Page,
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      key: "inventory" as Page,
      label: "Inventory Management",
      icon: Boxes,
    },
    {
      key: "reservation" as Page,
      label: "Reservation",
      icon: CalendarCheck,
    },
  ];

  const getPageTitle = () => {
    switch (activePage) {
      case "dashboard":
        return "Dashboard";
      case "inventory":
        return "Inventory Management";
      case "reservation":
        return "Reservation";
    }
  };

  return (
    <div className="h-screen flex bg-gray-100">
      
      {/* SIDEBAR */}
      <div className="w-64 bg-white border-r p-3 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.key;

          return (
            <button
              key={item.key}
              onClick={() => setActivePage(item.key)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition
                ${
                  isActive
                    ? "bg-blue-100 text-blue-600 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* CONTENT AREA */}
      <div className="flex-1 flex flex-col">
        
        {/* PAGE CONTENT */}
        <div className="p-6">
          <h1 className="text-xl font-semibold text-gray-800">
            {getPageTitle()}
          </h1>
        </div>

      </div>
    </div>
  );
}