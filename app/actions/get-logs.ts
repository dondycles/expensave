"use server";
import { spServer } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// export const getmoneys = async (sort: DashboardState["sort"]) => {
export const getlogs = async () => {
  const supabase = spServer(cookies());
  //   const by = sort.by;
  //   const asc = Boolean(sort.asc === "true");

  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return redirect("/log-in");

  const { error, data } = await supabase
    .from("logs")
    .select("* , moneys(*)")
    .order("created_at", { ascending: false });

  if (error) return { error: error };
  return { success: data };
};
