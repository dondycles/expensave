"use client";

import { getlogs } from "@/app/actions/get-logs";
import { logsDataColumns } from "@/components/logs-table/data-column";
import LogTableSkeleton from "@/components/logs-table/skeleton";
import { LogDataTable } from "@/components/logs-table/table";
import { Database } from "@/database.types";
import { useQuery } from "@tanstack/react-query";

export default function Activity() {
  const getLogsData = async (): Promise<
    Database["public"]["Tables"]["logs"]["Row"][]
  > => {
    const { success, error } = await getlogs();
    if (error) return [];

    const data = success?.map((log) => ({
      ...log,
      name: (log.latest_data as MoneyJSONData)?.name,
      changes:
        log.action === "edit_money"
          ? {
              lastData: log.last_data as MoneyJSONData,
              latestData: log.latest_data as MoneyJSONData,
            }
          : null,
    }));
    return data;
  };

  const { data: logsData, isLoading: logsDataLoading } = useQuery({
    queryFn: getLogsData,
    queryKey: ["logs"],
  });
  return (
    <div className="w-full h-full screen-padding">
      {logsDataLoading ? (
        <LogTableSkeleton />
      ) : (
        <LogDataTable data={logsData ?? []} columns={logsDataColumns} />
      )}
    </div>
  );
}
