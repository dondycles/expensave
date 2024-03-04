"use server";
import { spServer } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const delmoney = async (id: string) => {
  const supabase = spServer(cookies());

  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return redirect("/log-in");

  const { error } = await supabase.from("moneys").delete().eq("id", id);
  if (error) return { error: error };
  return { success: "ok" };
};
