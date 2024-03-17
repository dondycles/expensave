"use client";

import { getlogs } from "@/app/actions/get-logs";
import { getmoneys } from "@/app/actions/get-moneys";

import { logsDataColumns } from "@/components/activity-page/logs-table-data-column";
import LogTableSkeleton from "@/components/activity-page/logs-table-skeleton";
import { LogDataTable } from "@/components/activity-page/logs-table";
import { useListState } from "@/store";
import { useQuery } from "@tanstack/react-query";
import TotalMoneyBreakdownPieChart from "@/components/activity-page/total-money-breakdown-pie-chart";
import TotalMoneyBreakdownPieChartSkeleton from "@/components/activity-page/total-money-breakdown-pie-chart-skeleton";
import { getDailyTotal } from "@/app/actions/get-daily-total";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { UsePhpPesoWSign } from "@/lib/php-formatter";
import { getsession } from "@/app/actions/auth/get-session";

export default function Activity() {
  const listState = useListState();

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await getsession(),
  });

  const { data: logsData, isLoading: logsDataLoading } = useQuery({
    queryFn: async () => {
      const { success, error } = await getlogs();
      if (error) return [];

      return success;
    },
    queryKey: ["logs", user?.success?.id],
    enabled: !!user,
  });

  const { data: moneysData, isLoading: moneysLoading } = useQuery({
    queryFn: async () => await getmoneys(listState.sort),
    refetchOnWindowFocus: false,
    queryKey: [
      "moneys",
      listState.sort.asc,
      listState.sort.by,
      user?.success?.id,
    ],
    enabled: !!user,
  });

  const { data: dailyTotalData, isLoading: dailyTotalLoading } = useQuery({
    queryKey: ["daily-total", user?.success?.id],
    queryFn: async () => {
      const { success, error } = await getDailyTotal();
      if (error) return [];
      return success;
    },
    enabled: !!user,
  });

  const moneys = moneysData?.success?.flatMap((money) => money);

  const finalizedDailyTotalData = () => {
    const dailyTotalDataLength = dailyTotalData?.length ?? 0;

    const filledDailyTotalData = Array(30 - dailyTotalDataLength).fill({
      total: 0,
      date: "",
    });
    const modifiedDailyTotalData = [
      ...filledDailyTotalData,
      ...(dailyTotalData ?? []),
    ];

    return modifiedDailyTotalData;
  };

  const fetching = logsDataLoading || moneysLoading || dailyTotalLoading;

  return (
    <div className="w-full h-full screen-padding space-y-8">
      {fetching ? (
        <>
          <LogTableSkeleton />
          <TotalMoneyBreakdownPieChartSkeleton />
        </>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            <p className="text-2xl font-bold">Daily Total</p>
            <Card className="shadow-none">
              <CardHeader className="text-sm text-muted-foreground">
                Last 30 days
              </CardHeader>
              <CardContent className="w-full h-[144px] py-0 px-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    width={150}
                    height={40}
                    data={finalizedDailyTotalData()}
                  >
                    <XAxis
                      dataKey="date"
                      tickFormatter={(value) =>
                        value ? new Date(value).toLocaleDateString() : ""
                      }
                      style={{
                        fontSize: "0.75rem",
                        fill: "hsl(var(--muted-foreground))",
                      }}
                    />
                    <Tooltip />
                    <Bar dataKey="total" fill="hsl(var(--muted-foreground))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          <TotalMoneyBreakdownPieChart moneys={moneys ?? []} />
          <LogDataTable data={logsData ?? []} columns={logsDataColumns} />
          <br />
          <br />
        </>
      )}
    </div>
  );
}
