import { jwtDecode } from "jwt-decode";

export function getUser() {
  const token = localStorage.getItem("access");
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}
