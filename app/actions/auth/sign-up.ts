"use server";
import { SignUpFormTypes } from "../../../components/forms/sign-up";
import { spServer } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export const signup = async (data: SignUpFormTypes) => {
  const supabase = spServer(cookies());
  const email = `${data.username}@expensave.com`;
  const password = data.password;

  const { data: authUser, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });
  if (authError) return { error: authError };

  const { data: dbUser, error: dbError } = await supabase
    .from("users")
    .insert({ username: data.username })
    .select()
    .single();
  if (dbError) return { error: dbError };

  const userFinalData = {
    username: dbUser.username,
    id: authUser.user?.id,
  };

  return { success: userFinalData };
};
