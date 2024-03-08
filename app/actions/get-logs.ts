"use server";
import { spServer } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export const getlogs = async () => {
  const supabase = spServer(cookies());

  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return redirect("/log-in");

  const { error, data } = await supabase
    .from("logs")
    .select("* , moneys(name,id)")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) return { error: error };
  return { success: data };
};
