import { create } from "zustand";
import { persist } from "zustand/middleware";
import { EditMoneyTypes } from "./components/forms/edit-money";

declare global {
  type OptimisticAddMoney = {
    name: string | null;
    amount: number | null;
    setMoney: (name: string | null, amount: number | null) => void;
  };
  type MoneyTotal = {
    total: number;
    setTotal: (total: number) => void;
  };
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
    money: EditMoneyTypes | null;
    setMoney: (money: EditMoneyTypes | null) => void;
  };

  type MoneysStyles = {
    colors: { id: string; color: { transparent: string; opaque: string } }[];
    setColor: (money: {
      color: { transparent: string; opaque: string };
      id: string;
    }) => void;
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

export const useListState = create<ListState>()(
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
      name: "list-state",
    }
  )
);

export const useEditMoney = create<EditMoney>()((set) => ({
  money: null,
  setMoney: (money) =>
    set((state) => ({
      money: money,
    })),
}));

export const useMoneysStyle = create<MoneysStyles>()(
  persist(
    (set) => ({
      colors: [], // Initialize colors array with an empty array
      setColor: (newColor: {
        id: string;
        color: { transparent: string; opaque: string };
      }) =>
        set((state) => {
          // Check if an entry with the same ID already exists
          const existingIndex = state.colors.findIndex(
            (c) => c.id === newColor.id
          );

          // If an entry with the same ID exists, update its color; otherwise, add a new entry
          if (existingIndex !== -1) {
            const updatedColors = [...state.colors];
            updatedColors[existingIndex].color = newColor.color;
            return { colors: updatedColors };
          } else {
            return { colors: [...state.colors, newColor] };
          }
        }),
    }),
    {
      name: "moneys-styles",
    }
  )
);
