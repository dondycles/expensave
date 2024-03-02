"use client";
import Nav from "@/components/nav";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import SideNav from "@/components/side-nav";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full h-full sm:flex flex-row">
      <SideNav />
      <ScrollArea className="w-full h-full">
        {children}
        <ScrollBar />
      </ScrollArea>
      <Nav />
    </main>
  );
}
