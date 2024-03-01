"use server";
import { spServer } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export const getmoneys = async (sort: DashboardState["sort"]) => {
  const supabase = spServer(cookies());
  const by = sort.by;
  const asc = Boolean(sort.asc === "true");

  const { error, data } = await supabase
    .from("moneys")
    .select()
    .order(by, { ascending: asc });

  if (error) return { error: error };
  return { success: data };
};
