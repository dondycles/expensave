"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <main className="w-full h-full flex flex-col  screen-padding">
      <nav className="flex justify-between">
        <Button variant={"outline"}>Home. </Button>
        <Link
          href={
            (pathname === "/log-in" && "/sign-up") ||
            (pathname === "/sign-up" && "/log-in") ||
            "/log-in"
          }
        >
          <Button>
            {pathname === "/log-in" && "Sign Up"}
            {pathname === "/sign-up" && "Log In"}
          </Button>
        </Link>
      </nav>
      <div className="max-w-[420px] m-auto w-full text-center">
        <p className="text-6xl font-black">
          {pathname === "/log-in" && "Log In"}
          {pathname === "/sign-up" && "Sign Up"}
        </p>
        <p className="text-muted-foreground mb-4">
          The simplest way to keep track of your money.
        </p>
        {children}
      </div>
    </main>
  );
}