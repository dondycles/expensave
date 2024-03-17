import Nav from "@/app/(user)/_components/nav";
import { ScrollArea } from "@/components/ui/scroll-area";
import SideNav from "@/app/(user)/_components/side-nav";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full h-full sm:flex flex-row">
      <SideNav />
      <ScrollArea className="w-full h-full">{children}</ScrollArea>
      <Nav />
    </main>
  );
}
