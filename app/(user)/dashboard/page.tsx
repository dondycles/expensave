"use client";
import { getmoneys } from "@/app/actions/get-moneys";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
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

export default function Dashboard() {
  var _ = require("lodash");

  const totalMoney = useMoneyTotal();
  const dashboardState = useDashboardState();

  const { data } = useQuery({
    queryKey: ["moneys"],
    queryFn: async () => await getmoneys(),
    refetchOnWindowFocus: false,
  });

  const moneys = data?.success?.flatMap((money) => money);
  const total = _.sum(data?.success?.flatMap((money) => Number(money.amount)));

  useEffect(() => {
    totalMoney.setTotal(total);
  }, [total]);

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
              onClick={() => dashboardState.setState()}
              size={"icon"}
              variant={"ghost"}
              className="w-fit h-fit my-auto ml-auto mr-0"
            >
              {dashboardState.hideValues ? <EyeOff /> : <Eye />}
            </Button>
          </div>
        </CardHeader>
      </Card>
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
