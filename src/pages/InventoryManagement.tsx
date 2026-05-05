import { DollarSign, Package, Users } from "lucide-react";
import InfoCard from "../components/InfoCard";
import MedicineTable from "../components/MedicineTable";

const InventoryManagement = () => {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Inventory Management
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage and track your inventory items
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
      </div>

      {/* Medicine Table (Combined Component) */}
      <MedicineTable />

    </div>
  );
};

export default InventoryManagement;