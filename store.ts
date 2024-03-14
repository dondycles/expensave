import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Database } from "./database.types";

export const useListState = create<ListState>()(
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
      name: "list-state",
    }
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
  type ListState = {
    hideValues: boolean;
    sort: {
      asc: string;
      by: "created_at" | "amount";
    };
    setHideValues: () => void;
    setSort: (asc: string, by: "created_at" | "amount") => void;
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
