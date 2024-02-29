"use client";

import Menu from "@/components/menu";
import Nav from "@/components/nav";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ReactNode } from "react";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <main className="w-full h-full flex flex-col">
      <Nav />
      <ScrollArea className="w-full h-full">
        {children}
        <ScrollBar />
      </ScrollArea>
      <Menu />
    </main>
  );
}
