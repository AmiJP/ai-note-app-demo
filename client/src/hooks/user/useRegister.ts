import { registerUser } from "@/api/user/registerUser";
import { User } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () => {
  return useMutation({
    mutationFn: (user: Partial<User>) => registerUser(user),
  });
};
