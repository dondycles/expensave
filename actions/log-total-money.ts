import { getLocaleTime } from "@/lib/get-locale-date";
import { spServer } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export const logTotalMoney = async () => {
  const supabase = spServer(cookies());
  const authUID = (await supabase.auth.getUser()).data.user?.id;
  const date = new Date();
  console.log("🚀 ~ logTotalMoney ~ date:", date);

  const { data: total } = await supabase.rpc("total_money");

  const { error } = await supabase.from("daily_total_money").upsert(
    {
      total: total,
      date_and_user: `${getLocaleTime(date)}-${authUID}`,
      updated_at: new Date().toUTCString(),
    },
    { onConflict: "date_and_user" }
  );
  if (error) return { error: error };

  return { sucess: "ok" };
};
