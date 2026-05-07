import API from "./Api";

export async function login(email: string, password: string) {
  const response = await API.post("/api/auth/login", {
    email,
    password,
  });

  return response.data;
}

export async function logout() {
  await API.post("/api/auth/logout");
}
