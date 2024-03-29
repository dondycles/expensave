"use server";
import { spServer } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { logTotalMoney } from "./log-total-money";

export const editMoney = async (
  money: EditMoneyTypes,
  lastValues: { amount: number; name: string; id: string }
) => {
  const supabase = spServer(cookies());

  const { error: moneyError, data: moneyData } = await supabase
    .from("moneys")
    .update(money)
    .eq("id", money.id)
    .select("id, amount, name")
    .single();

  if (moneyError) return { error: moneyError.message };

  const { error: logError } = await supabase.from("logs").insert({
    action: "edit_money",
    money: moneyData.id,
    last_data: lastValues,
    latest_data: moneyData,
  });

  if (logError) {
    await supabase.from("moneys").update(lastValues).eq("id", moneyData.id);
    return { error: "Logging failed." };
  }
  const { error: logTotalMoneyError } = await logTotalMoney();
  if (logTotalMoneyError) return { error: "Logging total money failed." };

  return { success: "Money Edited." };
};
