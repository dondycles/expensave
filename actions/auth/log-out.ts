"use server";
import { spServer } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export const logout = async () => {
  const supabase = spServer(cookies());
  const { error } = await supabase.auth.signOut();
  if (error) return error;
};
