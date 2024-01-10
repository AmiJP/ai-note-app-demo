import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { CircleUserIcon, User, Mail, LogOut } from "lucide-react";
import { DropdownMenuShortcut } from "./ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useLogout } from "@/hooks/user/useLogout";
import { AxiosError } from "axios";
import { toast } from "./ui/use-toast";

export const Profile = () => {
  const navigate = useNavigate();
  const logoutMutation = useLogout();
  const { user } = useAuth();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        navigate("/login");
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          const { data } = error.response!;

          if (!data.success) {
            toast({
              title: "Error occurred while logging out",
              description: data.message,
              variant: "destructive",
            });
          }
        }
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <CircleUserIcon size={30} className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem disabled>
            {user?.name}
            <DropdownMenuShortcut>
              <User size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            {user?.email}
            <DropdownMenuShortcut>
              <Mail size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
          Log out
          <DropdownMenuShortcut>
            <LogOut size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
