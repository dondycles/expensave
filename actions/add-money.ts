"use server";
import { AddMoneyTypes } from "@/app/(user)/list/_components/add-money-form";
import { spServer } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { logTotalMoney } from "./log-total-money";

export const addmoney = async (data: AddMoneyTypes) => {
  const supabase = spServer(cookies());
  const name = data.name;
  const amount = Number(data.amount);

  const { error: moneyError, data: moneyData } = await supabase
    .from("moneys")
    .insert({ name, amount })
    .select("id, amount, name")
    .single();
  if (moneyError) return { error: moneyError.message };

  const { error: logError } = await supabase.from("logs").insert({
    action: "add_money",
    money: moneyData.id,
    latest_data: moneyData,
  });

  if (logError) {
    await supabase.from("moneys").delete().eq("id", moneyData.id);
    return { error: "Logging failed." };
  }

  const { error: logTotalMoneyError } = await logTotalMoney();
  if (logTotalMoneyError) return { error: "Logging total money failed." };

  return { success: "Money Added." };
};
