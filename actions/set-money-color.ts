"use server";
import { spServer } from "@/lib/supabase/server";
import { cookies } from "next/headers";
export const setMoneyColor = async (
  id: string,
  color: {
    opaque: string;
    transparent: string;
  }
) => {
  const supabase = spServer(cookies());

  const { error } = await supabase
    .from("moneys")
    .update({
      color: color,
    })
    .eq("id", id);

  if (error) return { error: error.message };
  return { succes: "Money color set." };
};
