"use client";
import { getmoneys } from "@/actions/get-moneys";
import { useAvailableMoneyColors, useListPageState } from "@/store";
import { useQuery } from "@tanstack/react-query";
import MoneyCard from "@/app/(user)/list/_components/money-card";

import EditMoneyDrawer from "@/app/(user)/list/_components/edit-money-drawer";
import { Skeleton } from "@/components/ui/skeleton";
import { getTotalMoney } from "@/actions/get-total-money";
import ListTotalCard from "@/app/(user)/list/_components/total-card";
import ListSorter from "@/app/(user)/list/_components/sorter";
import ColorPickerDrawer from "@/app/(user)/list/_components/color-picker-drawer";
import { useEffect } from "react";
export default function List() {
  const listPageState = useListPageState();
  const availableMoneyColors = useAvailableMoneyColors();
  const { data: totalMoney, isLoading: totalLoading } = useQuery({
    queryKey: ["total"],
    queryFn: async () => await getTotalMoney(),
  });

  const {
    data: moneysData,
    isLoading: moneysLoading,
    isFetched,
  } = useQuery({
    queryFn: async () => await getmoneys(listPageState.sort),
    refetchOnWindowFocus: false,
    queryKey: ["moneys", listPageState.sort.asc, listPageState.sort.by],
  });

  const moneys = moneysData?.success?.flatMap((money) => money);
  const colors = moneys?.flatMap(
    (money) => (money.color as { opaque: string }).opaque
  );
  const uniqueColorsAvailable = () => {
    const groupedMoneys: {
      [key: string]: { color: any; names: string[] };
    }[] = [];

    // Iterate through the original array
    moneys?.forEach((money) => {
      // Check if the color already exists in the groupedMoneys array
      const index = groupedMoneys.findIndex(
        (item) =>
          item[(money?.color as { opaque: string })?.opaque] != undefined
      );
      if (index === -1) {
        // If not, create a new entry for the color
        const newEntry: { [key: string]: { color: any; names: string[] } } = {};
        newEntry[(money?.color as { opaque: string })?.opaque] = {
          color: money.color,
          names: [money.name],
        };
        groupedMoneys.push(newEntry);
      } else {
        // If it does, push the name to the existing color entry
        const colorKey = Object.keys(groupedMoneys[index])[0];
        groupedMoneys[index][colorKey].names.push(money.name);
      }
    });

    // Extract the values from the groupedMoneys array to get the final array
    const uniqueMoneys = groupedMoneys.map((entry) => Object.values(entry)[0]);

    return uniqueMoneys;
  };
  const fetching = totalLoading || moneysLoading;

  useEffect(() => {
    availableMoneyColors.setColors(uniqueColorsAvailable());
  }, [moneysData]);

  return (
    <div className="w-full h-full flex-1 flex flex-col gap-4 screen-padding ">
      <ListTotalCard fetching={fetching} total={totalMoney ?? 0} />
      <ListSorter />
      {fetching
        ? Array.from({ length: 4 }, (_, i) => {
            return <Skeleton key={i} className="w-full h-10" />;
          })
        : moneys?.map((money) => {
            return (
              <MoneyCard
                key={money.id}
                money={money}
                listPageState={listPageState}
              />
            );
          })}
      <br />
      <br />
      <EditMoneyDrawer />
      <ColorPickerDrawer />
    </div>
  );
}
