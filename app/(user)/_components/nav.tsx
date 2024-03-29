"use client";
import { LogOut, Moon, Settings2, Sun } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { logout } from "@/actions/auth/log-out";
import { pathnames } from "@/lib/pathnames";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export default function Nav() {
  const queryClient = useQueryClient();
  const { setTheme, theme } = useTheme();
  const pathname = usePathname();

  const handleLogout = async () => {
    queryClient.clear();
    await logout();
    location.reload();
  };

  return (
    <nav
      className="sm:hidden grid grid-cols-3 fixed bottom-0 left-0 w-full nav-padding bg-background/70 backdrop-blur h-fit
    "
    >
      {pathnames.map((path) => {
        return (
          <Link key={path.name} href={path.link} className="flex-1">
            <Button
              variant={pathname === path.link ? "outline" : "ghost"}
              className={`flex flex-col justify-center gap-1 h-16 w-full rounded-[--radius] 
              `}
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
          <DropdownMenuItem onClick={handleLogout}>
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
