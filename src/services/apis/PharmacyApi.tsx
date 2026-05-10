import API from "./Api";

export type CreatePharmacyRequest = {
  name: string;
};

export async function createPharmacy(payload: CreatePharmacyRequest) {
  const response = await API.post("/api/pharmacies", payload);
  return response.data;
}

export type CreatePharmacyBranchRequest = {
  pharmacyId: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  contactNumber: string;
};

export async function createPharmacyBranch(payload: CreatePharmacyBranchRequest) {
  const response = await API.post("/api/pharmacy-branches", payload);
  return response.data;
}

export async function getAllPharmacyBranches() {
  const response = await API.get("/api/pharmacy-branches/my");
  return response.data;
}

export async function getUserPharmacy() {
  const response = await API.get("/api/pharmacies/my");
  return response.data;
}

