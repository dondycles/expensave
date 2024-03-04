"use client";
import {
  FileClock,
  List,
  LogOut,
  LucideLogOut,
  Moon,
  Settings2,
  Sun,
} from "lucide-react";
import ModeToggle from "./theme-btn";
import { Button } from "./ui/button";
import { logout } from "@/app/actions/auth/log-out";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useTheme } from "next-themes";
import { TbDashboard } from "react-icons/tb";
import Link from "next/link";

export default function Nav() {
  const { setTheme, theme } = useTheme();

  return (
    <nav
      className="sm:hidden grid grid-cols-3 fixed bottom-0 left-0 w-full nav-padding border-t-border border-t-[1px] bg-background h-fit
    "
    >
      <Link href={"/dashboard"} className="flex-1">
        <Button
          variant={"ghost"}
          className="flex flex-col justify-center gap-1 h-16 w-full"
        >
          <List className="size-5" />
          <span className="text-xs text-muted-foreground">Dashboard</span>
        </Button>
      </Link>
      <Link href={"/logs"} className="flex-1">
        <Button
          variant={"ghost"}
          className="flex flex-col justify-center gap-1 h-16 w-full"
        >
          <FileClock className="size-5" />
          <span className="text-xs text-muted-foreground">Logs</span>
        </Button>
      </Link>
      <DropdownMenu>
        <Button
          className="flex flex-col justify-center gap-1 h-16"
          variant={"ghost"}
          asChild
        >
          <DropdownMenuTrigger className="flex-1">
            <Settings2 className="size-5" />
            <span className="text-xs text-muted-foreground">Settings</span>
          </DropdownMenuTrigger>
        </Button>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => logout()}>
            <LogOut className="size-4 mr-2" />
            <span>Log Out</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <Moon className="size-4 mr-2" />
            ) : (
              <Sun className="size-4 mr-2" />
            )}
            <span>Theme</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
