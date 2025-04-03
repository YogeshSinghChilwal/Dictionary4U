import { useAuth0 } from "@auth0/auth0-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarImage } from "./ui/avatar";
const UserDetail = () => {
  const { user, logout } = useAuth0();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user?.picture} alt="Profile" />
        </Avatar>
        <h2 className="ml-2 md:block hidden">{user?.name?.split(" ")[0]}</h2>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
            {user?.email}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex justify-center"
          onClick={() => logout()}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDetail;
