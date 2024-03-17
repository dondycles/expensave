"use server";
import { spServer } from "@/lib/supabase/server";
import { cookies } from "next/headers";
export const getlogs = async () => {
  const supabase = spServer(cookies());

  const { error, data } = await supabase
    .from("logs")
    .select("* , moneys(name,id)")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) return { error: error };

  const modifiedData = data?.map((log) => ({
    ...log,
    name: (log.latest_data as MoneyJSONData)?.name,
    changes:
      log.action === "edit_money"
        ? {
            lastData: log.last_data as MoneyJSONData,
            latestData: log.latest_data as MoneyJSONData,
          }
        : null,
  }));

  return { success: modifiedData };
};
