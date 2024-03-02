import { LogOut, Plus, User, User2 } from "lucide-react";
import ModeToggle from "./theme-btn";
import { Button } from "./ui/button";
import { logout } from "@/app/actions/auth/log-out";
import { useRouter } from "next/navigation";

export default function Nav() {
  const route = useRouter();
  const logOut = async () => {
    const { error } = await logout();
    if (error) return;
    route.push("/log-in");
  };
  return (
    <header
      className="w-full flex justify-between screen-padding border-b-border border-b-[1px]
    "
    >
      <Button onClick={logOut} size="icon" variant={"ghost"}>
        <LogOut className="size-5" />
      </Button>
      <ModeToggle />
    </header>
  );
}
