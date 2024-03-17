"use server";
import { spServer } from "@/lib/supabase/server";
import { cookies } from "next/headers";
export const getTotalMoney = async () => {
  const supabase = spServer(cookies());

  const { data } = await supabase.rpc("total_money");

  return data ? (data ? data : 0) : 0;
};
