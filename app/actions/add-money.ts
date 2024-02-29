"use server";
import { AddMoneyTypes } from "@/components/forms/add-money";
import { spServer } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export const addmoney = async (data: AddMoneyTypes) => {
  const supabase = spServer(cookies());
  const name = data.name;
  const amount = data.amount;

  const { error } = await supabase
    .from("moneys")
    .insert({ name, amount })
    .select()
    .single();
  if (error) return { error: error };
  return { success: "Money Added." };
};
