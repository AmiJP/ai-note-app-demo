import { addNote } from "@/api/note/addNote";
import { Note } from "@/types";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useAddNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (note: Partial<Note>) => addNote(note),
    onSuccess: (result) => {
      if (result.data) {
        // Update cache to add note
        queryClient.setQueryData(["notes"], (oldNote: Note[]) => {
          if (oldNote) {
            return [...oldNote, result.data];
          }
          queryClient.invalidateQueries({ queryKey: ["notes"] });
        });
      }
    },
    onError: (error) => {
      console.error("Failed to add note", error);
    },
  });
};
