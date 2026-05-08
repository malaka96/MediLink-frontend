import API from "./Api";

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
  phone: string;
  roleId: number;
};

export async function login(email: string, password: string) {
  const response = await API.post("/api/auth/login", {
    email,
    password,
  });

  return response.data;
}

export async function register(payload: RegisterRequest) {
  const response = await API.post("/api/users", payload);
  return response.data;
}

export async function logout() {
  await API.post("/api/auth/logout");
}
