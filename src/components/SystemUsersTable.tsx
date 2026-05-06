import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import Chip from "./Chip";

type UserRole = "pharmacy" | "admin" | "patient";
type UserStatus = "active" | "inactive";

type SystemUser = {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
  pharmacy?: string;
  status: UserStatus;
  lastLogin: string; // YYYY-MM-DD HH:mm
};

const data: SystemUser[] = [
  {
    userId: "USR-1001",
    name: "Nimali Silva",
    email: "nimali.silva@medilink.lk",
    role: "admin",
    status: "active",
    lastLogin: "2026-05-06 09:12",
  },
  {
    userId: "USR-1002",
    name: "Kasun Perera",
    email: "kasun.perera@gmail.com",
    role: "patient",
    status: "active",
    lastLogin: "2026-05-05 18:40",
  },
  {
    userId: "USR-1003",
    name: "CityCare Pharmacy",
    email: "admin@citycarepharmacy.lk",
    role: "pharmacy",
    pharmacy: "CityCare Pharmacy - Colombo 07",
    status: "inactive",
    lastLogin: "2026-04-28 11:05",
  },
  {
    userId: "USR-1004",
    name: "Sithum Jayasinghe",
    email: "sithum.jayasinghe@gmail.com",
    role: "patient",
    status: "inactive",
    lastLogin: "2026-03-12 08:22",
  },
];

const roleChip = (role: UserRole) => {
  switch (role) {
    case "pharmacy":
      return { text: "Pharmacy", color: "bg-blue-100", textColor: "text-blue-700" };
    case "admin":
      return {
        text: "Admin",
        color: "bg-purple-100",
        textColor: "text-purple-700",
      };
    case "patient":
      return { text: "Patient", color: "bg-gray-200", textColor: "text-gray-700" };
  }
};

const statusChip = (status: UserStatus) => {
  switch (status) {
    case "active":
      return { text: "Active", color: "bg-green-100", textColor: "text-green-700" };
    case "inactive":
      return { text: "Inactive", color: "bg-red-100", textColor: "text-red-700" };
  }
};

export default function SystemUsersTable() {
  const [rows, setRows] = useState<SystemUser[]>(data);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"" | UserRole>("");
  const [statusFilter, setStatusFilter] = useState<"" | UserStatus>("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return rows.filter((u) => {
      const matchSearch = q
        ? [u.userId, u.name, u.email, u.role, u.pharmacy ?? "", u.status, u.lastLogin]
            .join(" ")
            .toLowerCase()
            .includes(q)
        : true;

      const matchRole = roleFilter ? u.role === roleFilter : true;
      const matchStatus = statusFilter ? u.status === statusFilter : true;

      return matchSearch && matchRole && matchStatus;
    });
  }, [rows, roleFilter, search, statusFilter]);

  const onEdit = (userId: string) => {
    // Hook up to your edit modal / route when ready
    // Keeping this as a no-op state change placeholder for now.
    // eslint-disable-next-line no-console
    console.log("Edit user:", userId);
  };

  const onDelete = (userId: string) => {
    setRows((prev) => prev.filter((u) => u.userId !== userId));
  };

  const onToggleStatus = (userId: string) => {
    setRows((prev) =>
      prev.map((u) =>
        u.userId === userId
          ? { ...u, status: u.status === "active" ? "inactive" : "active" }
          : u,
      ),
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Toolbar */}
      <div className="p-4 sm:p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            System Users
          </h2>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search */}
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 flex-1 min-w-0">
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none w-full text-sm min-w-0"
            />
          </div>

          {/* Role */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as "" | UserRole)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1"
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="pharmacy">Pharmacy</option>
            <option value="patient">Patient</option>
          </select>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "" | UserStatus)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="px-4 sm:px-5 pb-4 sm:pb-5">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[1200px]">
            <thead className="bg-gray-50 text-gray-600 text-left">
              <tr>
                <th className="p-3">User ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Pharmacy</th>
                <th className="p-3">Status</th>
                <th className="p-3">Last Login</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length > 0 ? (
                filtered.map((u) => {
                  const role = roleChip(u.role);
                  const status = statusChip(u.status);
                  const pharmacyText = u.role === "pharmacy" ? (u.pharmacy ?? "—") : "—";

                  return (
                    <tr
                      key={u.userId}
                      className="border-t border-gray-300 hover:bg-gray-50 transition"
                    >
                      <td className="p-3 font-medium text-gray-800">{u.userId}</td>
                      <td className="p-3 text-gray-700">{u.name}</td>
                      <td className="p-3 text-gray-600">{u.email}</td>
                      <td className="p-3">
                        <Chip
                          text={role.text}
                          bgColor={role.color}
                          textColor={role.textColor}
                        />
                      </td>
                      <td className="p-3 text-gray-700">{pharmacyText}</td>
                      <td className="p-3">
                        <Chip
                          text={status.text}
                          bgColor={status.color}
                          textColor={status.textColor}
                        />
                      </td>
                      <td className="p-3 text-gray-600">{u.lastLogin}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onEdit(u.userId)}
                            className="px-3 py-1.5 rounded-lg text-sm font-medium border border-blue-600 text-blue-700 hover:bg-blue-50 transition"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => onDelete(u.userId)}
                            className="px-3 py-1.5 rounded-lg text-sm font-medium border border-red-600 text-red-700 hover:bg-red-50 transition"
                          >
                            Delete
                          </button>
                          <button
                            type="button"
                            onClick={() => onToggleStatus(u.userId)}
                            className={
                              u.status === "active"
                                ? "px-3 py-1.5 rounded-lg text-sm font-medium border border-yellow-600 text-yellow-700 hover:bg-yellow-50 transition"
                                : "px-3 py-1.5 rounded-lg text-sm font-medium border border-green-600 text-green-700 hover:bg-green-50 transition"
                            }
                          >
                            {u.status === "active" ? "Deactivate" : "Activate"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="text-center p-6 text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

