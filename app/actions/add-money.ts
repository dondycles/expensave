"use server";
import { AddMoneyTypes } from "@/components/forms/add-money";
import { spServer } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const addmoney = async (data: AddMoneyTypes) => {
  const supabase = spServer(cookies());
  const name = data.name;
  const amount = Number(data.amount);

  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return redirect("/log-in");

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
    console.log("🚀 ~ addmoney ~ logError:", logError);
    await supabase.from("moneys").delete().eq("id", moneyData.id);
    return { error: "Logging failed." };
  }

  return { success: "Money Added." };
};
