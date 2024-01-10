import { logoutUser } from "@/api/user/logoutUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ["notes"],
        exact: true,
      });
      queryClient.removeQueries({
        queryKey: ["account"],
        exact: true,
      });
    },
  });
};
