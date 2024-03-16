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
import { Card } from "@/components/ui/card";

export default function Activity() {
  const listState = useListState();
  const { data: logsData, isLoading: logsDataLoading } = useQuery({
    queryFn: async () => {
      const { success, error } = await getlogs();
      if (error) return [];

      return success;
    },
    queryKey: ["logs"],
  });

  const { data: moneysData, isLoading: moneysLoading } = useQuery({
    queryFn: async () => await getmoneys(listState.sort),
    refetchOnWindowFocus: false,
    queryKey: ["moneys", listState.sort.asc, listState.sort.by],
  });

  const { data: dailyTotalData, isLoading: dailyTotalLoading } = useQuery({
    queryKey: ["daily-total"],
    queryFn: async () => {
      const { success, error } = await getDailyTotal();
      if (error) return [];
      return success;
    },
  });

  const moneys = moneysData?.success?.flatMap((money) => money);

  const dailyTotalDataLength = dailyTotalData?.length ?? 0;

  const filledDailyTotalData = Array(30 - dailyTotalDataLength).fill(null);
  const modifiedDailyTotalData = [
    ...filledDailyTotalData,
    ...(dailyTotalData ?? []),
  ];

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
          <LogDataTable data={logsData ?? []} columns={logsDataColumns} />
          <TotalMoneyBreakdownPieChart moneys={moneys ?? []} />
          <div className="flex flex-col gap-4">
            <p className="text-2xl font-bold">Daily Total</p>
            <Card className="p-4 w-full h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart width={150} height={40} data={modifiedDailyTotalData}>
                  <XAxis
                    dataKey="date"
                    tickFormatter={(value) =>
                      value ? new Date(value).toLocaleDateString() : ""
                    }
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
          <br />
          <br />
        </>
      )}
    </div>
  );
}
