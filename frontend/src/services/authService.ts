import axios from "axios";

export const login = async (email: string, password: string) => {
  const response = await axios.post("/api/auth/login", { email, password });
  return response.data;
};

export const logout = async () => {
  await axios.post("/api/auth/logout");
};
