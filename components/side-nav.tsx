"use client";
import { logout } from "@/app/actions/auth/log-out";
import { Button } from "./ui/button";
import { Activity, List, LogOut } from "lucide-react";
import ModeToggle from "./theme-btn";
import Link from "next/link";

export default function SideNav() {
  return (
    <aside className="p-4 hidden sm:flex flex-col w-fit border-r-border border-r-[1px]">
      <Link href={"/list"}>
        <Button
          variant={"ghost"}
          className="flex flex-col justify-center gap-1 size-16"
        >
          <List className="size-5" />
          <span className="text-xs text-muted-foreground">List</span>
        </Button>
      </Link>
      <Link href={"/activity"}>
        <Button
          variant={"ghost"}
          className="flex flex-col justify-center gap-1 size-16"
        >
          <Activity className="size-5" />
          <span className="text-xs text-muted-foreground">Activity</span>
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
