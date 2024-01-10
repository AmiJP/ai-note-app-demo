import React, { createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAccount } from "@/hooks/user/useAccount";
import { User } from "@/types";
import { Loader } from "@/components/Loader";

interface AuthContextType {
  user: Partial<User> | null;
}

const guestPaths = ["/login", "/register", "/"];

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isGuestPath = guestPaths.includes(location.pathname);

  const accountQuery = useAccount({
    enabled: !isGuestPath,
  });

  if (accountQuery.isLoading) return <Loader />;

  if (accountQuery.isError) {
    navigate("/login");
  }

  const user = accountQuery.data;

  const value = {
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
