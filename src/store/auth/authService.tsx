import axios from "axios";
import { LoginPayloadProps, RegisterPayloadProps } from "./authTypes";

const login = async (loginPayload: LoginPayloadProps) => {
  const response = await axios.post("/auth/login", loginPayload);
  if (response.data.user) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("token", JSON.stringify(response.data.user.token));
  }
  return response.data;
};

const register = async (registerPayload: RegisterPayloadProps) => {
  const response = await axios.post("/auth/register", registerPayload);
  if (response.data.user) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("token", response.data.user.token);
  }
  return response.data;
};
const authService = {
  login,
  register,
};
export default authService;
