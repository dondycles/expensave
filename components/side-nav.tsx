"use client";
import { logout } from "@/app/actions/auth/log-out";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { FileClock, List, LogOut } from "lucide-react";
import ModeToggle from "./theme-btn";
import Link from "next/link";

export default function SideNav() {
  return (
    <aside className="p-4 hidden sm:flex flex-col w-fit border-r-border border-r-[1px]">
      <Link href={"/dashboard"}>
        <Button
          variant={"ghost"}
          className="flex flex-col justify-center gap-1 size-16"
        >
          <List className="size-5" />
          <span className="text-xs text-muted-foreground">Dashboard</span>
        </Button>
      </Link>
      <Link href={"/logs"}>
        <Button
          variant={"ghost"}
          className="flex flex-col justify-center gap-1 size-16"
        >
          <FileClock className="size-5" />
          <span className="text-xs text-muted-foreground">Logs</span>
        </Button>
      </Link>
      <Button
        onClick={() => logout()}
        variant={"ghost"}
        className="flex flex-col justify-center gap-1 size-16"
      >
        <LogOut className="size-5" />
        <p className="text-xs text-muted-foreground">Log Out</p>
      </Button>
      <ModeToggle />
    </aside>
  );
}
