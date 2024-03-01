"use server";
import { spServer } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export const dragSortMoney = async (id: string, sort: string) => {
  const supabase = spServer(cookies());

  const { error } = await supabase
    .from("moneys")
    .update({ drag_order: sort })
    .eq("id", id);

  if (error) return { error: error };
  return { success: "ok" };
};
