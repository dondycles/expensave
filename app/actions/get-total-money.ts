"use server";
import { spServer } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export const getTotalMoney = async () => {
  const supabase = spServer(cookies());
  const date = new Date();
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return redirect("/log-in");

  const { error, data } = await supabase
    .from("daily_total")
    .select("total, created_at")
    .single();

  if (error) return { error };

  return { data };
};
