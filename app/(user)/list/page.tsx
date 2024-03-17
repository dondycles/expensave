"use client";
import { getmoneys } from "@/app/actions/get-moneys";
import { useListPageState } from "@/store";
import { useQuery } from "@tanstack/react-query";
import MoneyCard from "@/components/money-card/money";

import EditMoneyDrawer from "@/components/drawers/editmoney-drawer";
import { Skeleton } from "@/components/ui/skeleton";
import { getTotalMoney } from "@/app/actions/get-total-money";
import ListTotalCard from "@/components/list-page/total-card";
import ListSorter from "@/components/list-page/sorter";
import ColorPickerDrawer from "@/components/drawers/color-picker-drawer";
export default function List() {
  const listPageState = useListPageState();

  const { data: totalMoney, isLoading: totalLoading } = useQuery({
    queryKey: ["total"],
    queryFn: async () => await getTotalMoney(),
  });

  const {
    data: moneysData,
    isLoading: moneysLoading,
    error: moneysError,
  } = useQuery({
    queryFn: async () => await getmoneys(listPageState.sort),
    refetchOnWindowFocus: false,
    queryKey: ["moneys", listPageState.sort.asc, listPageState.sort.by],
  });

  const moneys = moneysData?.success?.flatMap((money) => money);

  const fetching = totalLoading || moneysLoading;

  if (moneysData?.error || moneysError)
    return (
      <div className="w-full h-full flex-1 flex flex-col gap-4 screen-padding ">
        <p className="text-destructive font-bold">
          Error: {moneysData?.error?.toString() || moneysError?.message}
        </p>
      </div>
    );

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
