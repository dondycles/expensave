"use server";
import { spServer } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export const getTotalMoney = async () => {
  const supabase = spServer(cookies());

  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return redirect("/log-in");
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  const dateToday = `${year}/${month}/${day}`;

  const { error, data } = await supabase
    .from("daily_total")
    .select("total, created_at")
    .eq("date", dateToday)
    .single();

  if (error) return { error };
  return { data };
};
