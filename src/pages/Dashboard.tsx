import InfoCard from "../components/InfoCard";
import { DollarSign, Users, Package, CalendarCheck } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Overview of your system performance and activities
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <InfoCard
          title="Revenue"
          value="$12,500"
          description="Compared to last month"
          icon={DollarSign}
          color="text-green-600"
        />

        <InfoCard
          title="Users"
          value="1,240"
          description="Active this week"
          icon={Users}
          color="text-blue-600"
        />

        <InfoCard
          title="Inventory Items"
          value="320"
          description="Total products available"
          icon={Package}
          color="text-purple-600"
        />

        <InfoCard
          title="Reservations"
          value="86"
          description="This month bookings"
          icon={CalendarCheck}
          color="text-orange-600"
        />

      </div>

    </div>
  );
};

export default Dashboard;