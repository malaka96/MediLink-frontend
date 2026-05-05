import InfoRow from "./InfoRow";
import { Bell, Package, CalendarCheck } from "lucide-react";

export default function InfoSection() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-5 space-y-4">
      
      {/* Header */}
      <div>
        <h2 className="text-base sm:text-lg font-semibold text-gray-800">
          Recent Activities
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Latest updates and system actions
        </p>
      </div>

      {/* InfoRow List */}
      <div className="space-y-3">
        
        <InfoRow
          icon={Bell}
          text="New notification received from the system regarding updates"
          chipText="New"
          chipBgColor="bg-blue-100"
          chipTextColor="text-blue-700"
        />

        <InfoRow
          icon={Package}
          text="Inventory stock is running low for selected products"
          chipText="Warning"
          chipBgColor="bg-yellow-100"
          chipTextColor="text-yellow-700"
        />

        <InfoRow
          icon={CalendarCheck}
          text="Reservation successfully confirmed for tomorrow"
          chipText="Confirmed"
          chipBgColor="bg-green-100"
          chipTextColor="text-green-700"
        />

      </div>

    </div>
  );
}