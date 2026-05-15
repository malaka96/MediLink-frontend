import API from "./Api";

export type Medicine = {
  id: number;
  branchId: number;
  brandName: string;
  genericName: string;
  form: string;
  dosage: string;
  manufacturer: string;
  description: string;
};

export async function getMedicineByBranch(id: number): Promise<Medicine[]> {
  const response = await API.get(`/api/medicines/branch/${id}`);
  return response.data;
}
