"use server";
import { SignUpFormTypes } from "@/app/(auth)/components/sign-up-form";
import { spServer } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const signup = async (data: SignUpFormTypes) => {
  const supabase = spServer(cookies());
  const email = `${data.username}@expensave.com`;
  const password = data.password;

  const { error: authError } = await supabase.auth.signUp({
    email,
    password,
  });
  if (authError) return { authError };

  const { error: dbError } = await supabase
    .from("users")
    .insert({ username: data.username });

  if (dbError) return { dbError };

  redirect("/list");
};
