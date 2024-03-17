"use server";
import { spServer } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getsession = async () => {
  const supabase = spServer(cookies());

  const { data, error } = await supabase.auth.getSession();
  if (error) redirect("/log-in");

  return { success: data.session?.user };
};
