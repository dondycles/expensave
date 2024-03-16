import { spServer } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export const logTotalMoney = async () => {
  const supabase = spServer(cookies());
  const date = new Date();

  const { data: total } = await supabase.rpc("total_money");

  const { error } = await supabase.from("daily_total_money").upsert(
    {
      date: date.toISOString(),
      total: total,
    },
    { onConflict: "date" }
  );
  if (error) return { error: error };
  return { sucess: "ok" };
};
