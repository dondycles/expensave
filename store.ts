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
    id: "",
    name: "",
    amount: 0,
  },
  openModal: false,
  setOpenModal: (status) => set(() => ({ openModal: status })),
  setMoney: (money) =>
    set(() => ({
      money: money,
    })),
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
    money: EditMoneyTypes;
    setMoney: (money: EditMoneyTypes) => void;
    openModal: boolean;
    setOpenModal: (status: boolean) => void;
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
