"use client";
import { logout } from "@/app/actions/auth/log-out";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import ModeToggle from "./theme-btn";

export default function SideNav() {
  return (
    <aside className="p-4 hidden sm:flex flex-col w-fit border-r-border border-r-[1px]">
      <Button
        onClick={() => logout()}
        variant={"ghost"}
        className="flex flex-col justify-center gap-1 h-fit w-fit p-3"
      >
        <LogOut className="size-5" />
        <p className="text-xs text-muted-foreground">Log Out</p>
      </Button>
      <ModeToggle />
    </aside>
  );
}
