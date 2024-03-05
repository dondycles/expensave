"use server";
import { EditMoneyTypes } from "@/components/forms/edit-money";
import { spServer } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const editMoney = async (
  money: EditMoneyTypes,
  lastValues: { amount: number; name: string; id: string }
) => {
  const supabase = spServer(cookies());

  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return redirect("/log-in");

  const { error: moneyError, data: moneyData } = await supabase
    .from("moneys")
    .update(money)
    .eq("id", money.id)
    .select("id")
    .single();

  if (moneyError) return { error: moneyError.message };

  const { error: logError } = await supabase.from("logs").insert({
    action: "edit_money",
    money: moneyData.id,
    last_data: lastValues,
  });

  if (logError) {
    await supabase.from("moneys").update(lastValues).eq("id", moneyData.id);
    return { error: "Logging failed." };
  }

  return { success: "Money Edited." };
};
