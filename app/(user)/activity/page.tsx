"use client";

import { getlogs } from "@/app/actions/get-logs";
import { logsDataColumns } from "@/components/logs-table/data-column";
import { LogDataTable } from "@/components/logs-table/table";
import { Database } from "@/database.types";
import { usePhpPesoWSign } from "@/lib/php-formatter";
import { useQuery } from "@tanstack/react-query";

export default function Activity() {
  const getLogsData = async (): Promise<
    Database["public"]["Tables"]["logs"]["Row"][]
  > => {
    const { success, error } = await getlogs(0);
    if (error) return [];

    const data = success?.map((log) => ({
      ...log,
      name: (log.latest_data as MoneyJSONData)?.name,
      changes: {
        last: log.last_data as MoneyJSONData,
        latest: log.latest_data as MoneyJSONData,
      },
    }));
    return data;
  };

  const { data: logsData, isLoading: logsDataLoading } = useQuery({
    queryFn: getLogsData,
    queryKey: ["logs"],
  });
  if (!logsData) return;
  return (
    <div className="w-full h-full gap-4 screen-padding">
      <LogDataTable data={logsData} columns={logsDataColumns} />
    </div>
  );
}
