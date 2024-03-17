"use client";

import { getlogs } from "@/actions/get-logs";
import { getmoneys } from "@/actions/get-moneys";

import { logsDataColumns } from "@/app/(user)/activity/_components/logs-table-data-column";
import LogTableSkeleton from "@/app/(user)/activity/_components/logs-table-skeleton";
import { LogDataTable } from "@/app/(user)/activity/_components/logs-table";
import { useActivityPageState, useListPageState } from "@/store";
import { useQueries, useQuery } from "@tanstack/react-query";
import TotalMoneyBreakdownPieChart from "./_components/total-money-breakdown-pie-chart";
import TotalMoneyBreakdownPieChartSkeleton from "@/app/(user)/activity/_components/total-money-breakdown-pie-chart-skeleton";
import { getDailyTotal } from "@/actions/get-daily-total";
import DailyTotalBarChart from "@/app/(user)/activity/_components/daily-total-bar-chart";
import DailyTotalBarChartSkeleton from "@/app/(user)/activity/_components/daily-total-bar-chart-skeleton";

export default function Activity() {
  const listPageState = useListPageState();
  const activityPageState = useActivityPageState();
  const results = useQueries({
    queries: [
      {
        queryFn: async () => {
          const { success, error } = await getlogs();
          if (error) return [];

          return success;
        },
        queryKey: ["logs"],
      },
      {
        queryFn: async () => await getmoneys(listPageState.sort),
        queryKey: ["moneys", listPageState.sort.asc, listPageState.sort.by],
      },
      {
        queryKey: ["daily-total", activityPageState.dailyTotalLimit],
        queryFn: async () => {
          const { success, error } = await getDailyTotal(
            activityPageState.dailyTotalLimit
          );
          if (error) return [];
          const newData = success.map((item) => ({
            ...item,
            isNoData: false,
          }));
          return newData;
        },
      },
    ],
  });

  const logsData = results[0].data ?? [];
  const moneysData = results[1].data?.success?.flatMap((money) => money) ?? [];
  const dailyTotalData = results[2].data ?? [];

  const moneys = moneysData?.flatMap((money) => money);
  const isLoading = results.some((result) => result.isLoading);

  return (
    <div className="w-full h-full screen-padding space-y-8">
      {isLoading ? (
        <>
          <DailyTotalBarChartSkeleton />
          <TotalMoneyBreakdownPieChartSkeleton />
          <LogTableSkeleton />
        </>
      ) : (
        <>
          <DailyTotalBarChart data={dailyTotalData ?? []} />
          <TotalMoneyBreakdownPieChart data={moneys ?? []} />
          <LogDataTable data={logsData ?? []} columns={logsDataColumns} />
        </>
      )}
      <br />
      <br />
    </div>
  );
}
