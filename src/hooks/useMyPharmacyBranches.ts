import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { getAllPharmacyBranches } from "../services/apis/PharmacyApi";
import type { PharmacyBranch } from "../types/pharmacy";

function normalizeBranches(data: unknown): PharmacyBranch[] {
  const list = Array.isArray(data) ? (data as unknown[]) : [];
  return list
    .map((item) => item as Partial<PharmacyBranch> | null)
    .filter((item): item is Partial<PharmacyBranch> => !!item)
    .map((item) => ({
      id: typeof item.id === "number" ? item.id : undefined,
      pharmacyId: typeof item.pharmacyId === "number" ? item.pharmacyId : 0,
      name: typeof item.name === "string" ? item.name : "",
      address: typeof item.address === "string" ? item.address : "",
      latitude: typeof item.latitude === "number" ? item.latitude : 0,
      longitude: typeof item.longitude === "number" ? item.longitude : 0,
      contactNumber: typeof item.contactNumber === "string" ? item.contactNumber : "",
    }))
    .filter(
      (item) => typeof item.id === "number" && item.pharmacyId !== 0 && item.name && item.address,
    );
}

export function useMyPharmacyBranches() {
  const [branches, setBranches] = useState<PharmacyBranch[]>([]);
  const [isLoadingBranches, setIsLoadingBranches] = useState(false);
  const [branchesLoadError, setBranchesLoadError] = useState<string | null>(null);

  const refreshBranches = useCallback(async () => {
    setBranchesLoadError(null);
    setIsLoadingBranches(true);

    try {
      const data: unknown = await getAllPharmacyBranches();
      setBranches(normalizeBranches(data));
    } catch (e) {
      console.error("Error loading branches:", e);
      if (axios.isAxiosError(e) && e.response?.status === 401) {
        setBranchesLoadError("Please login again.");
      } else {
        setBranchesLoadError("Failed to load branches. Please refresh and try again.");
      }
    } finally {
      setIsLoadingBranches(false);
    }
  }, []);

  useEffect(() => {
    void refreshBranches();
  }, [refreshBranches]);

  return {
    branches,
    setBranches,
    isLoadingBranches,
    branchesLoadError,
    refreshBranches,
  };
}
