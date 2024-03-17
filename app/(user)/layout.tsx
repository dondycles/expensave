import Nav from "@/components/nav";
import { ScrollArea } from "@/components/ui/scroll-area";
import SideNav from "@/components/side-nav";
import { getsession } from "../actions/auth/get-session";
import { redirect } from "next/navigation";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { success: session } = await getsession();
  if (!session) return redirect("/log-in");
  return (
    <main className="w-full h-full sm:flex flex-row">
      <SideNav />
      <ScrollArea className="w-full h-full">{children}</ScrollArea>
      <Nav />
    </main>
  );
}
