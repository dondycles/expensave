"use client";
import { getmoneys } from "@/app/actions/get-moneys";
import { useListState } from "@/store";
import { useQuery } from "@tanstack/react-query";
import MoneyCard from "@/components/money-card/money";

import EditMoneyDrawer from "@/components/drawers/editmoney-drawer";
import { Skeleton } from "@/components/ui/skeleton";
import { getTotalMoney } from "@/app/actions/get-total-money";
import ListTotalCard from "@/components/list-page/total-card";
import ListSorter from "@/components/list-page/sorter";
export default function List() {
  const listState = useListState();

  const { data: totalMoney, isLoading: totalLoading } = useQuery({
    queryKey: ["total"],
    queryFn: async () => await getTotalMoney(),
  });

  const {
    data: moneysData,
    isLoading: moneysLoading,
    error: moneysError,
  } = useQuery({
    queryFn: async () => await getmoneys(listState.sort),
    refetchOnWindowFocus: false,
    queryKey: ["moneys", listState.sort.asc, listState.sort.by],
  });

  const fetching = totalLoading || moneysLoading;

  const moneys = moneysData?.success?.flatMap((money) => money);
  const total = totalMoney ? totalMoney?.data?.total : 0;

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
      <ListTotalCard fetching={fetching} total={total as number} />
      <ListSorter />
      {fetching
        ? Array.from({ length: 4 }, (_, i) => {
            return <Skeleton key={i} className="w-full h-10" />;
          })
        : moneys?.map((money) => {
            return (
              <MoneyCard key={money.id} money={money} listState={listState} />
            );
          })}
      <br />
      <br />
      <EditMoneyDrawer />
    </div>
  );
}
