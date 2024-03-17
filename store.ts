import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Database } from "./database.types";

export const useListPageState = create<ListPageState>()(
  persist(
    (set, get) => ({
      hideValues: false,
      setHideValues: () => set({ hideValues: !get().hideValues }),
      sort: {
        asc: "false",
        by: "created_at",
      },
      setSort: (asc, by) => set(() => ({ sort: { asc: asc, by: by } })),
    }),
    {
      name: "list-page-state",
    }
  )
);

export const useActivityPageState = create<ActivityPageState>()(
  persist(
    (set) => ({
      dailyTotalLimit: 30,
      setDailyTotalLimit: (limit) => set(() => ({ dailyTotalLimit: limit })),
    }),
    { name: "activity-page-state" }
  )
);

export const useEditMoney = create<EditMoney>()((set) => ({
  money: {
    amount: 0,
    color: { opaque: "", transparent: "", id: "" },
    id: "",
    name: "",
  },
  openEditModal: false,
  setOpenEditModal: (status) => set(() => ({ openEditModal: status })),
  setMoney: (money) =>
    set(() => ({
      money: money,
    })),
  openColorPicker: false,
  setOpenColorPicker: (status) => set(() => ({ openColorPicker: status })),
}));

export const useGlobalMoneysListContext = create<GlobalMoneysListContext>()(
  persist(
    (set) => ({
      moneys: [],
      setMoney: (moneys) => set(() => ({ moneys: moneys })),
    }),
    { name: "global-moneys-list-context" }
  )
);

declare global {
  type Money = Database["public"]["Tables"]["moneys"]["Row"];
  type ListPageState = {
    hideValues: boolean;
    sort: {
      asc: string;
      by: "created_at" | "amount";
    };
    setHideValues: () => void;
    setSort: (asc: string, by: "created_at" | "amount") => void;
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
}
