"use client";
import { getmoneys } from "@/app/actions/get-moneys";
import { Card, CardHeader } from "@/components/ui/card";
import { useMoneyTotal, useListState } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import { useEffect } from "react";
import { FaPesoSign } from "react-icons/fa6";
import MoneyCard from "@/components/money-card/money";
import AsteriskNumber from "@/components/asterisk-value";
import { usePhpPeso } from "@/lib/php-formatter";
import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import AddMoneyDrawer from "@/components/drawers/addmoney-drawer";
import EditMoneyDrawer from "@/components/drawers/editmoney-drawer";
import { Skeleton } from "@/components/ui/skeleton";
export default function List() {
  var _ = require("lodash");
  const totalMoney = useMoneyTotal();
  const listState = useListState();

  const {
    data: moneysData,
    isLoading: moneysLoading,
    error: moneysError,
  } = useQuery({
    queryFn: async () => await getmoneys(listState.sort),
    refetchOnWindowFocus: false,
    queryKey: ["moneys", listState.sort.asc, listState.sort.by],
  });

  const moneys = moneysData?.success?.flatMap((money) => money);
  const total = _.sum(
    moneysData?.success?.flatMap((money) => Number(money.amount))
  );

  useEffect(() => {
    totalMoney.setTotal(total);
  }, [total]);

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
      <Card className="bg-foreground  shadow-md">
        <CardHeader>
          <div className="grid grid-cols-3 ">
            <div className="w-full flex flex-col col-span-2 text-background">
              <div className="text-muted-foreground text-sm w-fit flex gap-2 items-center ">
                <p className="line-clamp-1 w-fit">Total money</p>
                <button className="w-fit h-fit my-auto ml-auto mr-0">
                  {listState.hideValues ? (
                    <EyeOff
                      className="size-5"
                      onClick={() => listState.setHideValues()}
                    />
                  ) : (
                    <Eye
                      className="size-5"
                      onClick={() => listState.setHideValues()}
                    />
                  )}
                </button>
              </div>
              <div className="flex items-center w-full col-span-2">
                <FaPesoSign className="text-2xl min-w-fit" />
                {moneysLoading ? (
                  <Skeleton className="w-24 h-8 invert ml-1" />
                ) : listState.hideValues ? (
                  <AsteriskNumber number={totalMoney.total} />
                ) : (
                  <p className="text-2xl max-w-full  truncate font-bold">
                    {usePhpPeso(totalMoney.total)}
                  </p>
                )}
              </div>
            </div>
            <div className="my-auto ml-auto mr-0 ">
              <AddMoneyDrawer />
            </div>
          </div>
        </CardHeader>
      </Card>
      <DropdownMenu>
        <DropdownMenuTrigger className="w-fit ml-auto mr-0 flex gap-1 items-center text-muted-foreground">
          <p className="text-sm">sort by {listState.sort.by}</p>
          {listState.sort.asc === "true" ? (
            <TbSortAscending />
          ) : (
            <TbSortDescending />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuRadioGroup
            value={listState.sort.asc}
            onValueChange={(e) => {
              listState.setSort(e, listState.sort.by);
            }}
          >
            <DropdownMenuRadioItem value="true">
              Ascending
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="false">
              Descending
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={listState.sort.by}
            onValueChange={(e) => {
              listState.setSort(
                listState.sort.asc,
                e as typeof listState.sort.by
              );
            }}
          >
            <DropdownMenuRadioItem value="created_at">
              Date Created
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="amount">Amount</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {moneysLoading
        ? Array.from({ length: 4 }, (_, i) => {
            return <Skeleton key={i} className="w-full h-10" />;
          })
        : moneys?.map((money, index) => {
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
