import { loginUser } from "@/api/user/loginUser";
import { User } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: (user: Partial<User>) => loginUser(user),
  });
};
