"use client";
import { LogOut } from "lucide-react";
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
      className="sm:hidden flex justify-between fixed bottom-0 left-0 w-full nav-padding border-t-border border-t-[1px] bg-background h-fit
    "
    >
      <Button
        onClick={logOut}
        variant={"ghost"}
        className="flex flex-col justify-center gap-1 h-fit w-fit p-3"
      >
        <LogOut className="size-5" />
        <p className="text-xs text-muted-foreground">Log Out</p>
      </Button>
      <ModeToggle />
    </header>
  );
}
