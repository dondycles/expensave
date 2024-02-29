"use server";
import { LogInFormTypes } from "@/components/forms/log-in";
import { spServer } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export const login = async (data: LogInFormTypes) => {
  const supabase = spServer(cookies());
  const email = `${data.username}@expensave.com`;
  const password = data.password;
  const { data: authUser, error: authError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
  if (authError) return { error: authError };

  const { data: dbUser, error: dbError } = await supabase
    .from("users")
    .select("*")
    .eq("id", authUser.user.id)
    .single();

  if (dbError) return { error: dbError };

  const userFinalData = {
    username: dbUser.username,
    id: authUser.user?.id,
  };

  return { success: userFinalData };
};
