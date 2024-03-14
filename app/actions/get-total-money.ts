"use server";
import { spServer } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export const getTotalMoney = async () => {
  const supabase = spServer(cookies());
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return redirect("/log-in");

  const { data } = await supabase.from("daily_total").select("total").single();

  return data ? (data.total ? data.total : 0) : 0;
};
