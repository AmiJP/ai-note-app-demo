import { AuthContext } from "@/providers/AuthProvider";
import { useContext } from "react";

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};
