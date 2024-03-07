"use server";
import { Database } from "@/database.types";
import { spServer } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const delmoney = async (
  id: string,
  money: Database["public"]["Tables"]["moneys"]["Row"]
) => {
  const supabase = spServer(cookies());

  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return redirect("/log-in");

  const { error } = await supabase.from("moneys").delete().eq("id", id);
  if (error) return { error: error };

  const { error: logError } = await supabase.from("logs").insert({
    action: "del_money",
    latest_data: money,
    last_data: money,
  });

  if (logError) {
    await supabase.from("moneys").delete().eq("id", id);
    return { error: "Logging failed." };
  }

  return { success: "ok" };
};
