export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: "ADMIN" | "USER" | "MODERATOR"; // restrict to known roles
  status: string | null;                // can be null or a string like "active"
  createdAt: string;                    // ISO date string from backend
}
