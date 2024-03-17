import AuthPage from "@/app/(auth)/_components/auth-page";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full h-full flex flex-col  screen-padding">
      <AuthPage>{children}</AuthPage>
    </main>
  );
}
