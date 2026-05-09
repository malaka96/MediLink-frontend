import { useEffect, useMemo, useState, type FormEvent } from "react";
import axios from "axios";
import { createPharmacy, getUserPharmacy } from "../services/apis/PharmacyApi";

type PharmacyDetails = {
  pharmacyId: number;
  name: string;
};

type PharmacyBranch = {
  pharmacyId: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  contactNumber: string;
};

function generatePharmacyId(): number {
  const now = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return Number(String(now).slice(-7)) * 1000 + random;
}

const SAMPLE_BRANCH: PharmacyBranch = {
  pharmacyId: 1,
  name: "Main Branch",
  address: "123 Main St",
  latitude: 6.9271,
  longitude: 79.8612,
  contactNumber: "0112345678",
};

export default function PharmacyManagement() {
  const [savedPharmacy, setSavedPharmacy] = useState<PharmacyDetails | null>(null);
  const [pharmacyName, setPharmacyName] = useState("");
  const [branches, setBranches] = useState<PharmacyBranch[]>([]);

  const [isLoadingPharmacy, setIsLoadingPharmacy] = useState(true);
  const [isSavingPharmacy, setIsSavingPharmacy] = useState(false);
  const [pharmacySaveError, setPharmacySaveError] = useState<string | null>(null);

  const [branchDraft, setBranchDraft] = useState<Omit<PharmacyBranch, "pharmacyId">>({
    name: "",
    address: "",
    latitude: SAMPLE_BRANCH.latitude,
    longitude: SAMPLE_BRANCH.longitude,
    contactNumber: "",
  });

  const canSavePharmacy = useMemo(() => pharmacyName.trim().length > 1, [pharmacyName]);
  const canAddBranch = useMemo(() => {
    if (!savedPharmacy) return false;
    if (!branchDraft.name.trim()) return false;
    if (!branchDraft.address.trim()) return false;
    if (!Number.isFinite(branchDraft.latitude)) return false;
    if (!Number.isFinite(branchDraft.longitude)) return false;
    if (!branchDraft.contactNumber.trim()) return false;
    return true;
  }, [branchDraft, savedPharmacy]);

  useEffect(() => {
    let isMounted = true;

    async function loadMyPharmacy() {
      setPharmacySaveError(null);
      setIsLoadingPharmacy(true);

      try {
        const data: unknown = await getUserPharmacy();
        if (!isMounted) return;

        const maybeObj = data as { pharmacyId?: number; id?: number; name?: string } | null;
        const idFromApi = maybeObj?.pharmacyId ?? maybeObj?.id;

        const loadedPharmacy: PharmacyDetails = {
          pharmacyId: typeof idFromApi === "number" ? idFromApi : generatePharmacyId(),
          name: maybeObj?.name ?? "",
        };

        setSavedPharmacy(loadedPharmacy);
        if (loadedPharmacy.name) setPharmacyName(loadedPharmacy.name);
      } catch (err) {
        if (!isMounted) return;

        if (axios.isAxiosError(err) && err.response?.status === 404) {
          setSavedPharmacy(null);
          return;
        }

        setPharmacySaveError("Failed to load your pharmacy. Please refresh and try again.");
      } finally {
        if (isMounted) setIsLoadingPharmacy(false);
      }
    }

    loadMyPharmacy();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleSavePharmacy() {
    if (!canSavePharmacy) return;
    if (savedPharmacy) return;
    if (isLoadingPharmacy) return;
    if (isSavingPharmacy) return;

    setPharmacySaveError(null);
    setIsSavingPharmacy(true);

    try {
      const data: unknown = await createPharmacy({ name: pharmacyName.trim() });

      const maybeObj = data as { pharmacyId?: number; id?: number; name?: string } | null;
      const idFromApi = maybeObj?.pharmacyId ?? maybeObj?.id;

      setSavedPharmacy({
        pharmacyId: typeof idFromApi === "number" ? idFromApi : generatePharmacyId(),
        name: maybeObj?.name ?? pharmacyName.trim(),
      });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        setPharmacySaveError("Pharmacy already saved.");
        return;
      }

      setPharmacySaveError("Failed to save pharmacy. Please try again.");
    } finally {
      setIsSavingPharmacy(false);
    }
  }

  function handleAddBranch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!savedPharmacy) return;
    if (!canAddBranch) return;

    const newBranch: PharmacyBranch = {
      pharmacyId: savedPharmacy.pharmacyId,
      name: branchDraft.name.trim(),
      address: branchDraft.address.trim(),
      latitude: Number(branchDraft.latitude),
      longitude: Number(branchDraft.longitude),
      contactNumber: branchDraft.contactNumber.trim(),
    };

    setBranches((prev) => [newBranch, ...prev]);
    setBranchDraft((prev) => ({
      ...prev,
      name: "",
      address: "",
      contactNumber: "",
    }));
  }

  function handleUseSample() {
    setBranchDraft({
      name: SAMPLE_BRANCH.name,
      address: SAMPLE_BRANCH.address,
      latitude: SAMPLE_BRANCH.latitude,
      longitude: SAMPLE_BRANCH.longitude,
      contactNumber: SAMPLE_BRANCH.contactNumber,
    });
  }

  function handleDeleteBranch(index: number) {
    setBranches((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Pharmacy Management</h1>
          <p className="text-sm text-gray-600 mt-1">
            Save your pharmacy name first. After that, you can add branches.
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-gray-900">Pharmacy Details</h2>
          {isLoadingPharmacy ? (
            <span className="text-xs px-2 py-1 rounded-full bg-gray-50 text-gray-700 border border-gray-200">
              Loading...
            </span>
          ) : savedPharmacy ? (
            <span className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">
              Saved (ID: {savedPharmacy.pharmacyId})
            </span>
          ) : (
            <span className="text-xs px-2 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              Not saved
            </span>
          )}
        </div>

        {pharmacySaveError ? (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {pharmacySaveError}
          </div>
        ) : null}

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Pharmacy name</label>
              <input
                value={pharmacyName}
                onChange={(e) => setPharmacyName(e.target.value)}
                placeholder="e.g. MediLink Pharmacy"
                disabled={isLoadingPharmacy || !!savedPharmacy || isSavingPharmacy}
                className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            <p className="text-xs text-gray-500 mt-1">Minimum 2 characters.</p>
          </div>

          <button
            type="button"
            onClick={handleSavePharmacy}
            disabled={isLoadingPharmacy || !canSavePharmacy || !!savedPharmacy || isSavingPharmacy}
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
          >
            {isSavingPharmacy ? "Saving..." : savedPharmacy ? "Saved" : "Save details"}
          </button>
        </div>
      </div>

      <div
        className={`bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-6 ${
          savedPharmacy ? "" : "opacity-60"
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Pharmacy Branches</h2>
            <p className="text-sm text-gray-600 mt-1">
              {savedPharmacy
                ? "Add branches under your saved pharmacy."
                : "Save pharmacy details to add branches."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleUseSample}
            disabled={!savedPharmacy}
            className="shrink-0 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Use sample
          </button>
        </div>

        <form onSubmit={handleAddBranch} className="mt-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Branch name</label>
              <input
                value={branchDraft.name}
                onChange={(e) => setBranchDraft((p) => ({ ...p, name: e.target.value }))}
                placeholder={SAMPLE_BRANCH.name}
                disabled={!savedPharmacy}
                className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Contact number</label>
              <input
                value={branchDraft.contactNumber}
                onChange={(e) => setBranchDraft((p) => ({ ...p, contactNumber: e.target.value }))}
                placeholder={SAMPLE_BRANCH.contactNumber}
                disabled={!savedPharmacy}
                className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                value={branchDraft.address}
                onChange={(e) => setBranchDraft((p) => ({ ...p, address: e.target.value }))}
                placeholder={SAMPLE_BRANCH.address}
                disabled={!savedPharmacy}
                className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Latitude</label>
              <input
                type="number"
                step="any"
                value={branchDraft.latitude}
                onChange={(e) =>
                  setBranchDraft((p) => ({ ...p, latitude: e.target.valueAsNumber }))
                }
                placeholder={String(SAMPLE_BRANCH.latitude)}
                disabled={!savedPharmacy}
                className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Longitude</label>
              <input
                type="number"
                step="any"
                value={branchDraft.longitude}
                onChange={(e) =>
                  setBranchDraft((p) => ({ ...p, longitude: e.target.valueAsNumber }))
                }
                placeholder={String(SAMPLE_BRANCH.longitude)}
                disabled={!savedPharmacy}
                className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2">
            <button
              type="submit"
              disabled={!canAddBranch}
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
            >
              Add branch
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">Saved branches</h3>
            <span className="text-xs text-gray-600">{branches.length} total</span>
          </div>

          {branches.length === 0 ? (
            <div className="mt-3 text-sm text-gray-600 border border-dashed border-gray-300 rounded-xl p-4">
              No branches yet.
            </div>
          ) : (
            <div className="mt-3 space-y-3">
              {branches.map((b, index) => (
                <div
                  key={`${b.name}-${index}`}
                  className="border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold text-gray-900 truncate">{b.name}</div>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-50 border border-gray-200 text-gray-700">
                        Pharmacy ID: {b.pharmacyId}
                      </span>
                    </div>
                    <div className="text-sm text-gray-700 mt-1">{b.address}</div>
                    <div className="text-xs text-gray-600 mt-2">
                      Lat/Lng: {b.latitude}, {b.longitude} • Contact: {b.contactNumber}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteBranch(index)}
                    className="self-start rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
