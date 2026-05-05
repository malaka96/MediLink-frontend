import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import Chip from "./Chip";

type ReservationStatus = "pending" | "confirmed" | "expired" | "completed";

type Reservation = {
  reservationId: string;
  patientName: string;
  contact: string;
  medicine: string;
  quantity: number;
  reservationDate: string; // YYYY-MM-DD
  expiryDate: string; // YYYY-MM-DD
  status: Exclude<ReservationStatus, "expired">; // "expired" can be derived from date
};

const data: Reservation[] = [
  {
    reservationId: "RES-1001",
    patientName: "Kasun Perera",
    contact: "+94 77 123 4567",
    medicine: "Paracetamol 500mg",
    quantity: 2,
    reservationDate: "2026-05-03",
    expiryDate: "2026-05-10",
    status: "pending",
  },
  {
    reservationId: "RES-1002",
    patientName: "Nimali Silva",
    contact: "+94 71 234 9876",
    medicine: "Amoxicillin",
    quantity: 1,
    reservationDate: "2026-05-01",
    expiryDate: "2026-05-02",
    status: "confirmed",
  },
  {
    reservationId: "RES-1003",
    patientName: "Arun Fernando",
    contact: "+94 76 555 0000",
    medicine: "Cough Syrup",
    quantity: 1,
    reservationDate: "2026-04-25",
    expiryDate: "2026-06-01",
    status: "completed",
  },
];

const statusChip = (status: ReservationStatus) => {
  switch (status) {
    case "pending":
      return {
        text: "Pending",
        color: "bg-yellow-100",
        textColor: "text-yellow-700",
      };
    case "confirmed":
      return {
        text: "Confirmed",
        color: "bg-green-100",
        textColor: "text-green-700",
      };
    case "expired":
      return {
        text: "Expired",
        color: "bg-red-100",
        textColor: "text-red-700",
      };
    case "completed":
      return {
        text: "Completed",
        color: "bg-gray-200",
        textColor: "text-gray-700",
      };
  }
};

const isExpired = (expiryDate: string) => {
  const today = new Date();
  const expiry = new Date(`${expiryDate}T23:59:59`);
  return expiry.getTime() < today.getTime();
};

export default function ReservationTable() {
  const [rows, setRows] = useState<Reservation[]>(data);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"" | ReservationStatus>("");

  const withDerivedStatus = useMemo(() => {
    return rows.map((r) => {
      const derived: ReservationStatus =
        r.status !== "completed" && isExpired(r.expiryDate) ? "expired" : r.status;
      return { row: r, status: derived };
    });
  }, [rows]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return withDerivedStatus.filter(({ row, status }) => {
      const matchSearch = q
        ? [
            row.reservationId,
            row.patientName,
            row.contact,
            row.medicine,
            String(row.quantity),
          ]
            .join(" ")
            .toLowerCase()
            .includes(q)
        : true;

      const matchStatus = statusFilter ? status === statusFilter : true;

      return matchSearch && matchStatus;
    });
  }, [search, statusFilter, withDerivedStatus]);

  const onConfirm = (reservationId: string) => {
    setRows((prev) =>
      prev.map((r) =>
        r.reservationId === reservationId && r.status === "pending"
          ? { ...r, status: "confirmed" }
          : r,
      ),
    );
  };

  const onCancel = (reservationId: string) => {
    setRows((prev) => prev.filter((r) => r.reservationId !== reservationId));
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Toolbar */}
      <div className="p-4 sm:p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Reservations
          </h2>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 flex-1 min-w-0">
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search reservations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none w-full text-sm min-w-0"
            />
          </div>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "" | ReservationStatus)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="expired">Expired</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="px-4 sm:px-5 pb-4 sm:pb-5">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[1100px]">
            <thead className="bg-gray-50 text-gray-600 text-left">
              <tr>
                <th className="p-3">Reservation ID</th>
                <th className="p-3">Patient Name</th>
                <th className="p-3">Contact</th>
                <th className="p-3">Medicine</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Reservation Date</th>
                <th className="p-3">Expiry Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length > 0 ? (
                filtered.map(({ row, status }) => {
                  const chip = statusChip(status);
                  const canConfirm = status === "pending";
                  const actionsDisabled = status === "expired" || status === "completed";

                  return (
                    <tr
                      key={row.reservationId}
                      className="border-t border-gray-300 hover:bg-gray-50 transition"
                    >
                      <td className="p-3 font-medium text-gray-800">
                        {row.reservationId}
                      </td>
                      <td className="p-3 text-gray-700">{row.patientName}</td>
                      <td className="p-3 text-gray-600">{row.contact}</td>
                      <td className="p-3 text-gray-700">{row.medicine}</td>
                      <td className="p-3 text-gray-700">{row.quantity}</td>
                      <td className="p-3 text-gray-600">{row.reservationDate}</td>
                      <td className="p-3 text-gray-600">{row.expiryDate}</td>
                      <td className="p-3">
                        <Chip
                          text={chip.text}
                          bgColor={chip.color}
                          textColor={chip.textColor}
                        />
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onConfirm(row.reservationId)}
                            disabled={!canConfirm || actionsDisabled}
                            className="px-3 py-1.5 rounded-lg text-sm font-medium border border-green-600 text-green-700 hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                          >
                            Confirm
                          </button>
                          <button
                            type="button"
                            onClick={() => onCancel(row.reservationId)}
                            disabled={actionsDisabled}
                            className="px-3 py-1.5 rounded-lg text-sm font-medium border border-red-600 text-red-700 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9} className="text-center p-6 text-gray-500">
                    No reservations found
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

