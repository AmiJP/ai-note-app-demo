import { deleteNote } from "@/api/note/deleteNote";
import { Note } from "@/types";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteNote(id),
    onSuccess: (result, id) => {
      if (result.success) {
        // Update cache to remove note
        queryClient.setQueryData(["notes"], (oldNote: Note[]) => {
          return oldNote.filter((note) => note.id !== id);
        });
      }
    },
    onError: (error) => {
      console.error("Failed to delete note", error);
    },
  });
};
