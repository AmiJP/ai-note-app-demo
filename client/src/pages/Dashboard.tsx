import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { useDeleteNote } from "@/hooks/note/useDeleteNote";
import { useNotes } from "@/hooks/note/useNotes";
import { Note } from "@/types";
import { Link, useNavigate } from "react-router-dom";
import { cx } from "class-variance-authority";
import { Loader } from "@/components/Loader";
import NoImage from "../assets/no_image.png";

export const Dashboard = () => {
  const navigate = useNavigate();
  const noteQuery = useNotes();
  const deleteNoteMutation = useDeleteNote();

  if (noteQuery.isLoading) return <Loader />;

  if (noteQuery.isError) {
    return <div>Something went wrong...</div>;
  }

  const notes: Note[] = noteQuery.data;

  const handleDelete = async (id: number) => {
    deleteNoteMutation.mutate(id, {
      onSuccess: () => {
        toast({
          title: "Note deleted successfully.",
          description: "You can now add a new note.",
          variant: "success",
        });
      },
      onError: () => {
        toast({
          title: "Something went wrong.",
          description: "Please try again later.",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="flex justify-center h-screen">
      <div
        className={cx(
          "flex flex-col gap-6 p-4 mx-8",
          notes.length < 1 && "items-center"
        )}
      >
        <div className="flex flex-end">
          <Link to="/add">
            <Button>Add a note</Button>
          </Link>
        </div>
        {notes.length > 0 ? (
          <h1 className="text-xl font-bold">Your Notes ({notes.length})</h1>
        ) : (
          <h1 className="text-md">
            You have no notes. Click on the button above to add a note.
          </h1>
        )}

        <div className="flex flex-wrap gap-6">
          {notes.map((note) => {
            return (
              <Card key={note.id} className="w-[350px]">
                <CardHeader>
                  <img
                    src={note.image ? note.image : NoImage}
                    alt={note.title + " image"}
                    className="w-full h-48 object-cover"
                  />
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  <CardTitle className="break-words leading-normal truncate">
                    {note.title}
                  </CardTitle>
                  <CardDescription className="break-words truncate">
                    {note.note}
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="destructive"
                    onClick={() => {
                      handleDelete(note.id);
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() => {
                      navigate(`/edit/${note.id}`);
                    }}
                  >
                    Edit
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
