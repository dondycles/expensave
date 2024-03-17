"use server";
import { spServer } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export const getTotalMoney = async () => {
  const supabase = spServer(cookies());
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return redirect("/log-in");

  const { data } = await supabase.rpc("total_money");

  return data ? (data ? data : 0) : 0;
};
