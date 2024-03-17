import AuthPage from "@/components/auth-page";
import { getsession } from "../actions/auth/get-session";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { success: session } = await getsession();

  if (session) return redirect("/list");

  return (
    <main className="w-full h-full flex flex-col  screen-padding">
      <AuthPage>{children}</AuthPage>
    </main>
  );
}
