import { Database } from "@/database.types";

declare global {
  type Color = {
    opaque: string;
    transparent: string;
  };
  type Money = Database["public"]["Tables"]["moneys"]["Row"];
  type ListPageState = {
    hideValues: boolean;
    sort: {
      asc: string;
      by: "created_at" | "amount" | "color";
    };
    setHideValues: () => void;
    setSort: (asc: string, by: "created_at" | "amount" | "color") => void;
  };
  type ActivityPageState = {
    dailyTotalLimit: number;
    setDailyTotalLimit: (limit: number) => void;
  };
  type EditMoney = {
    money: Omit<Money, "created_at" | "user">;
    setMoney: (money: Omit<Money, "created_at" | "user">) => void;
    openEditModal: boolean;
    setOpenEditModal: (status: boolean) => void;
    openColorPicker: boolean;
    setOpenColorPicker: (status: boolean) => void;
  };
  type GlobalMoneysListContext = {
    moneys: Database["public"]["Tables"]["moneys"]["Row"][];
    setMoney: (moneys: Database["public"]["Tables"]["moneys"]["Row"][]) => void;
  };
  type MoneyJSONData = {
    amount: number;
    name: string;
    id: string;
  };
  type AvailableMoneyColors = {
    colors: {
      opaque_color: string;
      trans_color: string;
      names: string[];
    }[];
    setColors: (
      colors: {
        opaque_color: string;
        trans_color: string;
        names: string[];
      }[]
    ) => void;
  };
}
