"use server";
import { EditMoneyTypes } from "@/components/forms/edit-money";
import { spServer } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export const editMoney = async (money: EditMoneyTypes) => {
  const supabase = spServer(cookies());
  const { error } = await supabase
    .from("moneys")
    .update(money)
    .eq("id", money.id);

  if (error) return { error: error };
  return { success: "ok" };
};
