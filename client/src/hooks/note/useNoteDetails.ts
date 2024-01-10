import { getNoteDetails } from "@/api/note/getNoteDetails";
import { useQuery } from "@tanstack/react-query";

export const useNoteDetails = (id: number) => {
  return useQuery({
    queryKey: ["note", id],
    queryFn: () => getNoteDetails(id),
    placeholderData: { id, title: "", note: "" },
  });
};
