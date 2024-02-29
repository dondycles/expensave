"use server";
import { spServer } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export const getmoneys = async () => {
  const supabase = spServer(cookies());

  const { error, data } = await supabase
    .from("moneys")
    .select()
    .order("created_at", { ascending: false });

  if (error) return { error: error };
  return { success: data };
};
