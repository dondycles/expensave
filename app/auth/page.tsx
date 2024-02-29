"use client";
import { LogInForm } from "@/components/forms/log-in";
import { SignUpForm } from "@/components/forms/sign-up";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function Auth() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") ?? "login";
  return (
    <main className="w-full h-full flex flex-col  screen-padding">
      <nav className="flex justify-between">
        <Button variant={"outline"}>Home. </Button>
        <Link
          href={
            (mode === "login" && "/auth?mode=sign-up") ||
            (mode === "sign-up" && "/auth?mode=login") ||
            "/auth?mode=login"
          }
        >
          <Button>
            {mode === "login" && "Sign Up"}
            {mode === "sign-up" && "Log In"}
          </Button>
        </Link>
      </nav>
      <div className="max-w-[420px] m-auto w-full text-center">
        <p className="text-6xl font-black">
          {mode === "login" && "Log In"}
          {mode === "sign-up" && "Sign Up"}
        </p>
        <p className="text-muted-foreground mb-4">
          The simplest way to keep track of your money.
        </p>
        {mode === "sign-up" && <SignUpForm />}
        {mode === "login" && <LogInForm />}
      </div>
    </main>
  );
}
