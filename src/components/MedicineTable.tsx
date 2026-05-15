import { useMemo, useState } from "react";
import { Edit2, Trash2, Plus, Search } from "lucide-react";
import AddMedicine from "./AddMedicineWindow";
import type { PharmacyBranch } from "../types/pharmacy";
import type { Medicine } from "../services/apis/MedicineApi";

type Props = {
  branch: PharmacyBranch | null;
  medicines: Medicine[];
  isLoading: boolean;
  loadError: string | null;
};

export default function MedicineTable({ branch, medicines, isLoading, loadError }: Props) {
  const [search, setSearch] = useState("");
  const [form, setForm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredData = useMemo(() => {
    const q = search.trim().toLowerCase();
    return medicines.filter((item) => {
      const matchSearch = q
        ? `${item.brandName} ${item.genericName} ${item.manufacturer}`
            .toLowerCase()
            .includes(q)
        : true;

      const matchForm = form ? item.form === form : true;

      return matchSearch && matchForm;
    });
  }, [form, medicines, search]);

  const formOptions = useMemo(() => {
    const set = new Set<string>();
    medicines.forEach((m) => {
      if (m.form) set.add(m.form);
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [medicines]);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 sm:p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Medicine Inventory
            </h2>
            {branch ? (
              <div className="text-xs text-gray-500 mt-1">Branch: {branch.name}</div>
            ) : (
              <div className="text-xs text-amber-700 mt-1">
                Select a branch to view medicines.
              </div>
            )}
          </div>

          <button
            onClick={() => setIsOpen(true)}
            disabled={!branch}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
            Add Medicine
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 flex-1">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search medicine..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none w-full text-sm"
            />
          </div>

          <select
            value={form}
            onChange={(e) => setForm(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1"
          >
            <option value="">All Forms</option>
            {formOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="px-4 sm:px-5 pb-4 sm:pb-5">
        {loadError ? (
          <div className="mt-4 text-sm text-red-700 border border-red-200 bg-red-50 rounded-xl p-4">
            {loadError}
          </div>
        ) : null}

        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[1100px]">
            <thead className="bg-gray-50 text-gray-600 text-left">
              <tr>
                <th className="p-3">Brand</th>
                <th className="p-3">Generic</th>
                <th className="p-3">Form</th>
                <th className="p-3">Dosage</th>
                <th className="p-3">Manufacturer</th>
                <th className="p-3">Description</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="text-center p-6 text-gray-500">
                    Loading medicines...
                  </td>
                </tr>
              ) : filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-gray-300 hover:bg-gray-50 transition"
                  >
                    <td className="p-3 font-medium text-gray-800">{item.brandName}</td>
                    <td className="p-3 text-gray-600">{item.genericName}</td>
                    <td className="p-3 text-gray-600">{item.form}</td>
                    <td className="p-3 text-gray-600">{item.dosage}</td>
                    <td className="p-3 text-gray-600">{item.manufacturer}</td>
                    <td
                      className="p-3 text-gray-600 max-w-[420px] truncate"
                      title={item.description}
                    >
                      {item.description}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <button className="text-blue-600 hover:text-blue-800 transition">
                          <Edit2 className="w-4 h-4" />
                        </button>

                        <button className="text-red-600 hover:text-red-800 transition">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center p-6 text-gray-500">
                    {branch
                      ? "No medicines found for this branch"
                      : "Select a branch to view medicines"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddMedicine branch={branch} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

