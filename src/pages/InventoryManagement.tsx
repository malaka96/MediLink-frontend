import { useEffect, useMemo, useState } from "react";
import { DollarSign, Package, Users } from "lucide-react";
import InfoCard from "../components/InfoCard";
import MedicineTable from "../components/MedicineTable";
import { useMyPharmacyBranches } from "../hooks/useMyPharmacyBranches";
import { getMedicineByBranch, type Medicine } from "../services/apis/MedicineApi";

const InventoryManagement = () => {
  const { branches, isLoadingBranches, branchesLoadError } = useMyPharmacyBranches();
  const [selectedBranchId, setSelectedBranchId] = useState<number | "">("");
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [isLoadingMedicines, setIsLoadingMedicines] = useState(false);
  const [medicinesLoadError, setMedicinesLoadError] = useState<string | null>(null);

  const selectedBranch = useMemo(() => {
    if (selectedBranchId === "") return null;
    return branches.find((b) => b.id === selectedBranchId) ?? null;
  }, [branches, selectedBranchId]);

  useEffect(() => {
    let isMounted = true;

    async function loadMedicines() {
      if (selectedBranchId === "") {
        setMedicines([]);
        setMedicinesLoadError(null);
        setIsLoadingMedicines(false);
        return;
      }

      setMedicinesLoadError(null);
      setIsLoadingMedicines(true);

      try {
        const data = await getMedicineByBranch(selectedBranchId);
        if (!isMounted) return;
        setMedicines(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Error loading medicines:", e);
        if (!isMounted) return;
        setMedicines([]);
        setMedicinesLoadError("Failed to load medicines for this branch.");
      } finally {
        if (isMounted) setIsLoadingMedicines(false);
      }
    }

    void loadMedicines();

    return () => {
      isMounted = false;
    };
  }, [selectedBranchId]);

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
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
          <div>
            <div className="text-sm font-semibold text-gray-900">Branch</div>
            <div className="text-xs text-gray-600">
              Select which branch this inventory belongs to.
            </div>
          </div>

          <div className="min-w-[240px]">
            <select
              value={selectedBranchId}
              onChange={(e) =>
                setSelectedBranchId(e.target.value ? Number(e.target.value) : "")
              }
              disabled={isLoadingBranches || branches.length === 0}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="">
                {isLoadingBranches
                  ? "Loading branches..."
                  : branches.length === 0
                    ? "No branches found"
                    : "Select a branch"}
              </option>
              {branches.map((b) => (
                <option key={typeof b.id === "number" ? b.id : b.name} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
            {branchesLoadError ? (
              <div className="mt-2 text-xs text-red-700">{branchesLoadError}</div>
            ) : null}
          </div>
        </div>
      </div>

      <MedicineTable
        branch={selectedBranch}
        medicines={medicines}
        isLoading={isLoadingMedicines}
        loadError={medicinesLoadError}
      />

    </div>
  );
};

export default InventoryManagement;
