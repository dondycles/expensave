"use client";
import { getmoneys } from "@/app/actions/get-moneys";
import { Card, CardHeader } from "@/components/ui/card";
import { useDashboardState, useMoneyTotal } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import { useEffect } from "react";
import { FaPesoSign } from "react-icons/fa6";
import MoneyCard from "@/components/money-card/money";
import MoneyCardOptimistic from "@/components/money-card/money-optimistic";
import { Button } from "@/components/ui/button";
import AsteriskNumber from "@/components/asterisk-value";
import { usePhpPeso } from "@/lib/php-formatter";
import { MdSort } from "react-icons/md";
import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

export default function Dashboard() {
  var _ = require("lodash");
  const totalMoney = useMoneyTotal();
  const dashboardState = useDashboardState();

  const { data, isFetched, refetch } = useQuery({
    queryFn: async () => await getmoneys(dashboardState.sort),
    refetchOnWindowFocus: false,
    staleTime: 10000,
    queryKey: ["moneys", dashboardState.sort.asc, dashboardState.sort.by],
  });

  const moneys = data?.success?.flatMap((money) => money);
  const total = _.sum(data?.success?.flatMap((money) => Number(money.amount)));

  useEffect(() => {
    totalMoney.setTotal(total);
  }, [isFetched]);

  return (
    <div className="w-full h-full flex-1 flex flex-col gap-4 screen-padding ">
      <Card className="bg-foreground text-background shadow-md">
        <CardHeader className="">
          <div className="grid grid-cols-3">
            <div className="flex items-center w-full col-span-2">
              <FaPesoSign className="text-2xl min-w-fit" />
              {dashboardState.hideValues ? (
                <AsteriskNumber number={totalMoney.total} />
              ) : (
                <p className="text-2xl max-w-full  truncate font-bold">
                  {usePhpPeso(totalMoney.total)}
                </p>
              )}
            </div>
            <Button
              onClick={() => dashboardState.setHideValues()}
              size={"icon"}
              variant={"ghost"}
              className="w-fit h-fit my-auto ml-auto mr-0"
            >
              {dashboardState.hideValues ? <EyeOff /> : <Eye />}
            </Button>
          </div>
        </CardHeader>
      </Card>

      <DropdownMenu>
        <DropdownMenuTrigger className="w-fit ml-auto mr-0 flex gap-1 items-center text-muted-foreground">
          <p className="text-sm">sort by {dashboardState.sort.by}</p>
          {dashboardState.sort.asc === "true" ? (
            <TbSortAscending />
          ) : (
            <TbSortDescending />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuRadioGroup
            value={dashboardState.sort.asc}
            onValueChange={(e) => {
              dashboardState.setSort(e, dashboardState.sort.by);
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
            value={dashboardState.sort.by}
            onValueChange={(e) => {
              dashboardState.setSort(
                dashboardState.sort.asc,
                e as typeof dashboardState.sort.by
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

      <MoneyCardOptimistic />
      {moneys?.map((money, index) => {
        return (
          <MoneyCard
            key={money.id}
            money={money}
            dashboardState={dashboardState}
          />
        );
      })}
      <br />
      <br />
    </div>
  );
}
