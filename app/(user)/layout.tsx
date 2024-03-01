"use client";

import AddMoneyDrawer from "@/components/drawers/addmoney-drawer";
import EditMoneyDrawer from "@/components/drawers/editmoney-drawer";
import Nav from "@/components/nav";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full h-full flex flex-col">
      <Nav />
      <ScrollArea className="w-full h-full">
        {children}
        <ScrollBar />
      </ScrollArea>
      <AddMoneyDrawer />
      <EditMoneyDrawer />
    </main>
  );
}
