"use server";
import { MoneyColor } from "@/lib/constants";
import { spServer } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export const setMoneyColor = async (id: string, color: MoneyColor) => {
  const supabase = spServer(cookies());
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return redirect("/log-in");

  const { error } = await supabase
    .from("moneys")
    .update({
      color: color,
    })
    .eq("id", id);

  if (error) return { error: error.message };
  return { succes: "Money color set." };
};
