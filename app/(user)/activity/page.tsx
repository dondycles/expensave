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
import DailyTotalBarChart from "@/components/activity-page/daily-total-bar-chart";

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
      const newData = success.map((item) => ({
        ...item,
        isNoData: false,
      }));
      return newData;
    },
  });

  const moneys = moneysData?.success?.flatMap((money) => money);

  const fetching = logsDataLoading || moneysLoading || dailyTotalLoading;

  return (
    <div className="w-full h-full screen-padding space-y-8">
      {fetching ? (
        <>
          <TotalMoneyBreakdownPieChartSkeleton />
          <LogTableSkeleton />
        </>
      ) : (
        <>
          <DailyTotalBarChart data={dailyTotalData ?? []} />
          <TotalMoneyBreakdownPieChart data={moneys ?? []} />
          <LogDataTable data={logsData ?? []} columns={logsDataColumns} />
          <br />
          <br />
        </>
      )}
    </div>
  );
}
