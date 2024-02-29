"use server";
import { spServer } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export const delmoney = async (id: string) => {
  const supabase = spServer(cookies());

  const { error } = await supabase.from("moneys").delete().eq("id", id);

  if (error) return { error: error };
  return { success: "ok" };
};
