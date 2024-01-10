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
import { useLogin } from "@/hooks/user/useLogin";
import { AxiosError } from "axios";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(50),
});

export const LoginPage = () => {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const loginForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password } = values;
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          toast({
            title: "Login successful",
            description: "You have been logged in.",
            variant: "success",
          });
          navigate("/dashboard");
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            const { data } = error.response!;

            if (!data.success) {
              toast({
                title: "Invalid credentials",
                description: data.message,
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
            <CardTitle className="text-xl">Login Here</CardTitle>
            <CardDescription>
              Login to your account to access your notes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...loginForm}>
              <form
                onSubmit={loginForm.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={loginForm.control}
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
                  control={loginForm.control}
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
                <Button type="submit">Login</Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-between">
            New user?
            <Link to="/register">
              <Button variant="link">Register</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
