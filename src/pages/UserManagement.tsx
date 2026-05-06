import { Apple, DollarSign, Package, Users } from "lucide-react";
import InfoCard from "../components/InfoCard";
import SystemUsersTable from "../components/SystemUsersTable";

const UserManagement = () => {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          User Management
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage system users and pharmacy accounts
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <InfoCard
          title="Revenue"
          value="$12,500"
          description=""
          icon={DollarSign}
          color="text-green-600"
        />

        <InfoCard
          title="Users"
          value="1,240"
          description=""
          icon={Users}
          color="text-blue-600"
        />

        <InfoCard
          title="Inventory Items"
          value="320"
          description=""
          icon={Package}
          color="text-purple-600"
        />

        <InfoCard
          title="Phone Items"
          value="320"
          description=""
          icon={Apple}
          color="text-black-600"
        />
      </div>

      {/* System Users Table */}
      <SystemUsersTable />

    </div>
  );
};

export default UserManagement;
