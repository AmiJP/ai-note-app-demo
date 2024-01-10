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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import { useRegister } from "@/hooks/user/useRegister";

const formSchema = z.object({
  name: z.string().min(4).max(50),
  email: z.string().email(),
  password: z.string().min(4).max(50),
});

export const RegisterPage = () => {
  const { toast } = useToast();
  const registerMutation = useRegister();
  const navigate = useNavigate();

  const registerForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, email, password } = values;
    registerMutation.mutate(
      { name, email, password },
      {
        onSuccess: (result) => {
          if (result.data) {
            toast({
              title: "Registration successful",
              description: "User has been registered.",
              variant: "success",
            });
            navigate("/login");
          }
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            const { data } = error.response!;
            if (!data.success) {
              toast({
                title: "User already registered",
                description: data.message,
                variant: "destructive",
              });
            } else {
              toast({
                title: "Registration failed",
                description: "Error while registering user.",
                variant: "destructive",
              });
            }
          }
        },
      }
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex justify-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-xl">Register Here</CardTitle>
            <CardDescription>
              Register a new account to get started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...registerForm}>
              <form
                onSubmit={registerForm.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={registerForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter a name between 2 and 50 characters long.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Your email"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter a valid email address.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="password"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter a password between 2 and 50 characters long.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Register</Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-between">
            Already have an account?
            <Link to="/login">
              <Button variant="link">Login</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
