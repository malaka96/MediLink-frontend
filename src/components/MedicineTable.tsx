import { useState } from "react";
import { Edit2, Trash2, Plus, Search } from "lucide-react";
import Chip from "./Chip";
import AddMedicine from "./AddMedicineWindow";

type Medicine = {
  name: string;
  category: string;
  batch: string;
  stock: number;
  minStock: number;
  expiry: string;
  price: number;
};

const data: Medicine[] = [
  {
    name: "Paracetamol 500mg",
    category: "Tablet",
    batch: "B-1023",
    stock: 45,
    minStock: 20,
    expiry: "2026-08-10",
    price: 120,
  },
  {
    name: "Amoxicillin",
    category: "Capsule",
    batch: "B-2045",
    stock: 12,
    minStock: 15,
    expiry: "2026-05-30",
    price: 250,
  },
  {
    name: "Cough Syrup",
    category: "Syrup",
    batch: "B-3311",
    stock: 60,
    minStock: 25,
    expiry: "2027-01-15",
    price: 180,
  },
];

const getStatus = (stock: number, min: number) => {
  if (stock <= 0)
    return {
      key: "out",
      text: "Out",
      color: "bg-red-100",
      textColor: "text-red-700",
    };
  if (stock < min)
    return {
      key: "low",
      text: "Low",
      color: "bg-yellow-100",
      textColor: "text-yellow-700",
    };
  return {
    key: "available",
    text: "In Stock",
    color: "bg-green-100",
    textColor: "text-green-700",
  };
};

export default function MedicineTable() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [stockFilter, setStockFilter] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredData = data.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());

    const matchCategory = category ? item.category === category : true;

    const status = getStatus(item.stock, item.minStock);

    const matchStock = stockFilter ? stockFilter === status.key : true;

    return matchSearch && matchCategory && matchStock;
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* 🔹 Toolbar */}
      <div className="p-4 sm:p-5 space-y-4">
        {/* Top Row */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Medicine Inventory
          </h2>

          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            <Plus className="w-4 h-4" />
            Add Medicine
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
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

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1"
          >
            <option value="">All Categories</option>
            <option value="Tablet">Tablet</option>
            <option value="Capsule">Capsule</option>
            <option value="Syrup">Syrup</option>
          </select>

          {/* Stock */}
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1"
          >
            <option value="">All Stock</option>
            <option value="low">Low Stock</option>
            <option value="out">Out of Stock</option>
            <option value="available">Available</option>
          </select>
        </div>
      </div>

      {/* 🔹 Table */}
      <div className="px-4 sm:px-5 pb-4 sm:pb-5">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead className="bg-gray-50 text-gray-600 text-left">
              <tr>
                <th className="p-3">Medicine</th>
                <th className="p-3">Category</th>
                <th className="p-3">Batch No</th>
                <th className="p-3">Stock (Min)</th>
                <th className="p-3">Status</th>
                <th className="p-3">Expiry</th>
                <th className="p-3">Price (LKR)</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => {
                  const status = getStatus(item.stock, item.minStock);

                  return (
                    <tr
                      key={index}
                      className="border-t border-gray-300 hover:bg-gray-50 transition"
                    >
                      <td className="p-3 font-medium text-gray-800">
                        {item.name}
                      </td>

                      <td className="p-3 text-gray-600">{item.category}</td>

                      <td className="p-3 text-gray-600">{item.batch}</td>

                      <td className="p-3 text-gray-700">
                        {item.stock} / {item.minStock}
                      </td>

                      <td className="p-3">
                        <Chip
                          text={status.text}
                          bgColor={status.color}
                          textColor={status.textColor}
                        />
                      </td>

                      <td className="p-3 text-gray-600">{item.expiry}</td>

                      <td className="p-3 text-gray-700 font-medium">
                        {item.price}
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
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="text-center p-6 text-gray-500">
                    No medicines found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <AddMedicine isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
