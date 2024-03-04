"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

import { Moon, Sun } from "lucide-react";

export default function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="flex flex-col justify-center gap-1 size-16"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <div className="relative size-5">
        <Sun className="absolute size-5 opacity-100 dark:opacity-0 " />
        <Moon className="absolute size-5 opacity-0 dark:opacity-100  " />
      </div>
      <p className="text-xs text-muted-foreground">Theme</p>
    </Button>
  );
}
