import { create } from "zustand";
import { persist } from "zustand/middleware";

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
    id: "",
    name: "",
    opaque_color: null,
    trans_color: null,
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

export const useAvailableMoneyColors = create<AvailableMoneyColors>()(
  persist(
    (set) => ({
      colors: [],
      setColors: (colors) => set(() => ({ colors: colors })),
    }),
    { name: "available-money-colors" }
  )
);
