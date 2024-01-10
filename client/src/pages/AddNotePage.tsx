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
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useAddNote } from "@/hooks/note/useAddNote";
import { Textarea } from "@/components/ui/textarea";
import { MoveLeft } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1).max(50),
  note: z.string().min(1),
});

export const AddNotePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const addNoteMutation = useAddNote();

  const addNoteForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      note: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { title, note } = values;
    addNoteMutation.mutate(
      { title, note },
      {
        onSuccess: () => {
          toast({
            title: "Note added successfully.",
            description: "You can now add a new note.",
            variant: "success",
          });
          navigate("/dashboard");
        },
        onError: (error) => {
          toast({
            title: "Note could not be added.",
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
            <CardTitle className="text-xl">Add a new note</CardTitle>
            <CardDescription>Add your note here.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...addNoteForm}>
              <form
                onSubmit={addNoteForm.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={addNoteForm.control}
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
                  control={addNoteForm.control}
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
                  <Button disabled={addNoteMutation.isPending} type="submit">
                    {addNoteMutation.isPending ? "Adding..." : "Add"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
