import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useEditNote } from "@/hooks/note/useEditNote";
import { useNoteDetails } from "@/hooks/note/useNoteDetails";
import { Textarea } from "@/components/ui/textarea";
import { MoveLeft } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1).max(50),
  note: z.string().min(1),
});

interface Note {
  id: number;
  title: string;
  note: string;
}

export const EditNotePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const editNoteMutation = useEditNote();
  const noteId = params.noteId ? parseInt(params.noteId) : 0;

  if (noteId === 0 || isNaN(noteId)) {
    toast({
      title: "Note could not be found.",
      description: "Please try again",
      variant: "destructive",
    });
    navigate("/dashboard");
  }

  const noteQuery = useNoteDetails(noteId);
  const note: Note = noteQuery.data;

  const editNoteForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      title: note.title,
      note: note.note,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { title, note } = values;
    editNoteMutation.mutate(
      { id: noteId, title, note },
      {
        onSuccess: () => {
          toast({
            title: "Note updated successfully.",
            description: "Your note has been edited.",
            variant: "success",
          });
          navigate("/dashboard");
        },
        onError: (error) => {
          toast({
            title: "Note could not be edited.",
            description: error.message,
            variant: "destructive",
          });
        },
      }
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex justify-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-xl">Edit a note</CardTitle>
            <CardDescription>
              Edit a note by filling out the form below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...editNoteForm}>
              <form
                onSubmit={editNoteForm.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={editNoteForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Note title" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter your note title. Max 50 characters.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editNoteForm.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Note</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={6}
                          placeholder="Add your Note"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Enter your note.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigate("/dashboard");
                    }}
                  >
                    <MoveLeft size={20} className="mr-2" />
                    Back
                  </Button>
                  <Button type="submit">Save</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
