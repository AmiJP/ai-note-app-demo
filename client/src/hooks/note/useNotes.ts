import { getNotes } from "@/api/note/getNotes";
import { useQuery } from "@tanstack/react-query";

export const useNotes = () => {
  return useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
