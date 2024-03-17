"use server";
import { Database } from "@/database.types";
import { spServer } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { logTotalMoney } from "./log-total-money";

export const delmoney = async (
  id: string,
  money: Database["public"]["Tables"]["moneys"]["Row"]
) => {
  const supabase = spServer(cookies());

  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return redirect("/log-in");

  const { error: moneyError } = await supabase
    .from("moneys")
    .delete()
    .eq("id", id);
  if (moneyError) return { error: moneyError };

  const { error: logError } = await supabase.from("logs").insert({
    action: "del_money",
    latest_data: money,
    last_data: money,
  });

  if (logError) {
    await supabase.from("moneys").delete().eq("id", id);
    return { error: "Logging failed." };
  }

  const { error: logTotalMoneyError } = await logTotalMoney();
  if (logTotalMoneyError) return { error: "Logging total money failed." };

  return { success: "ok" };
};
