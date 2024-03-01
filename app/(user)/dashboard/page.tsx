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
          <CardTitle className="flex justify-between items-center">
            <div className="flex flex-row gap-1 items-center">
              <FaPesoSign className="text-2xl" />
              {dashboardState.hideValues ? (
                <AsteriskNumber number={totalMoney.total} />
              ) : (
                // <AnimatedNumbers
                //   includeComma
                //   transitions={(index) => ({
                //     type: "spring",
                //     duration: index / 5,
                //     bounce: 0,
                //   })}
                //   animateToNumber={totalMoney.total}
                //   fontStyle={{
                //     fontSize: "24px",
                //     fontWeight: "bold",
                //   }}
                // />
                <p className="text-2xl font-black">
                  {usePhpPeso(totalMoney.total)}
                </p>
              )}
            </div>
            <Button
              onClick={() => dashboardState.setState()}
              size={"icon"}
              variant={"ghost"}
            >
              {dashboardState.hideValues ? <EyeOff /> : <Eye />}
            </Button>
          </CardTitle>
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
