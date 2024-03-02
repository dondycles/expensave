"use client";
import Nav from "@/components/nav";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full h-full flex flex-col">
      <ScrollArea className="w-full h-full">
        {children}
        <ScrollBar />
      </ScrollArea>
      <Nav />
    </main>
  );
}
