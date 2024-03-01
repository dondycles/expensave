import { create } from "zustand";
import { persist } from "zustand/middleware";

declare global {
  type OptimisticAddMoney = {
    name: string | null;
    amount: string | null;
    setMoney: (name: string | null, amount: string | null) => void;
  };
  type MoneyTotal = {
    total: number;
    setTotal: (total: number) => void;
  };
  type DashboardState = {
    hideValues: boolean;
    sort: {
      asc: string;
      by: "created_at" | "amount";
    };
    setHideValues: () => void;
    setSort: (asc: string, by: "created_at" | "amount") => void;
  };
}

export const useOptimisticAddMoney = create<OptimisticAddMoney>()((set) => ({
  amount: null,
  name: null,
  setMoney: (name, amount) =>
    set((state) => ({
      amount: amount,
      name: name,
    })),
}));

export const useMoneyTotal = create<MoneyTotal>()((set) => ({
  total: 0,
  setTotal: (total) => set((state) => ({ total: total })),
}));

export const useDashboardState = create<DashboardState>()(
  persist(
    (set, get) => ({
      hideValues: false,
      setHideValues: () => set({ hideValues: !get().hideValues }),
      sort: {
        asc: "false",
        by: "created_at",
      },
      setSort: (asc, by) => set((state) => ({ sort: { asc: asc, by: by } })),
    }),
    {
      name: "dashboard-state",
    }
  )
);
