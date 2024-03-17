"use server";
import { spServer } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export const getDailyTotal = async (limit: number) => {
  const supabase = spServer(cookies());
  const { data, error } = await supabase
    .from("daily_total_money")
    .select("*")
    .order("date", { ascending: true })
    .limit(limit);

  if (error) return { error: error };
  return { success: data };
};
