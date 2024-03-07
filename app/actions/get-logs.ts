"use server";
import { spServer } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// export const getmoneys = async (sort: DashboardState["sort"]) => {
export const getlogs = async (page: number) => {
  const supabase = spServer(cookies());
  //   const by = sort.by;
  //   const asc = Boolean(sort.asc === "true");

  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return redirect("/log-in");

  const from = page === 1 ? 0 : (page - 1) * 10;
  const to = from + 9;

  const { error, data } = await supabase
    .from("logs")
    .select("* , moneys(name,id)")
    .order("created_at", { ascending: false });
  // .range(from, to);

  if (error) return { error: error };
  return { success: data };
};
