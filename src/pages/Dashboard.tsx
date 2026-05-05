import InfoCard from "../components/InfoCard";
import { DollarSign, Users, Package, CalendarCheck } from "lucide-react";

import InfoSection from "../components/InfoSection";
import HeaderCardSection from "../components/HeaderCardData";

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

      {/* Info Cards */}
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

      {/* Info Section */}
      <InfoSection />

      {/* Header Card Sections Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        <HeaderCardSection
          title="Inventory Summary"
          subtitle="Quick status of stock items"
          items={[
            {
              title: "Paracetamol",
              subtitle: "Pain relief stock",
              chipText: "Active",
              chipBgColor: "bg-green-100",
              chipTextColor: "text-green-700",
            },
            {
              title: "Syringe Pack",
              subtitle: "Medical supplies",
              chipText: "Low",
              chipBgColor: "bg-yellow-100",
              chipTextColor: "text-yellow-700",
            },
            {
              title: "Bandages",
              subtitle: "First aid items",
              chipText: "Available",
              chipBgColor: "bg-blue-100",
              chipTextColor: "text-blue-700",
            },
          ]}
        />

        <HeaderCardSection
          title="Reservation Status"
          subtitle="Latest booking updates"
          items={[
            {
              title: "Room A101",
              subtitle: "Patient admitted",
              chipText: "Confirmed",
              chipBgColor: "bg-green-100",
              chipTextColor: "text-green-700",
            },
            {
              title: "Room B202",
              subtitle: "Pending approval",
              chipText: "Pending",
              chipBgColor: "bg-yellow-100",
              chipTextColor: "text-yellow-700",
            },
            {
              title: "Room C303",
              subtitle: "Checkout completed",
              chipText: "Done",
              chipBgColor: "bg-gray-200",
              chipTextColor: "text-gray-700",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Dashboard;
