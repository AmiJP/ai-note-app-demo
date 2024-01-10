import { editNote } from "@/api/note/editNote";
import { Note } from "@/types";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useEditNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (note: Note) => editNote(note),
    onSuccess: (result, { id }) => {
      if (result.data) {
        // Update cache to update note
        queryClient.setQueryData(["notes"], (oldNote: Note[]) => {
          return oldNote.map((note) => {
            if (note.id === id) {
              return result.data;
            }
            return note;
          });
        });
      }
    },
    onError: (error) => {
      console.error("Failed to update note", error);
    },
  });
};
