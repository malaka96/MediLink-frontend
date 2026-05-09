import API from "./Api";

export type CreatePharmacyRequest = {
  name: string;
};

export async function createPharmacy(payload: CreatePharmacyRequest) {
  const response = await API.post("/api/pharmacies", payload);
  return response.data;
}

export async function getUserPharmacy() {
  const response = await API.get("/api/pharmacies/my");
  return response.data;
}
