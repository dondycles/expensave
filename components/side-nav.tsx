"use client";
import { logout } from "@/app/actions/auth/log-out";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import ModeToggle from "./theme-btn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { pathnames } from "@/lib/constants";

export default function SideNav() {
  const pathname = usePathname();

  return (
    <aside className="p-4 hidden sm:flex flex-col w-fit border-r-border border-r-[1px]">
      {pathnames.map((path) => {
        return (
          <Link key={path.name} href={path.link}>
            <Button
              variant={pathname === path.link ? "outline" : "ghost"}
              className="flex flex-col justify-center gap-1 size-16  rounded-[--radius]"
            >
              {path.icon}
              <span
                className={`text-xs ${
                  pathname !== path.link && "text-muted-foreground"
                }`}
              >
                {path.name}
              </span>
            </Button>
          </Link>
        );
      })}

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
