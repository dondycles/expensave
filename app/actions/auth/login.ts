"use server";
import { LogInFormTypes } from "@/components/forms/log-in";
import { spServer } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const login = async (data: LogInFormTypes) => {
  const supabase = spServer(cookies());
  const email = `${data.username}@expensave.com`;
  const password = data.password;
  const { data: authUser, error: authError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
  if (authError) return { authError };

  const { error: dbError } = await supabase
    .from("users")
    .select("*")
    .eq("id", authUser.user.id)
    .single();
  if (dbError) return { dbError };

  redirect("/dashboard");
};
