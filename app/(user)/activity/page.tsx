"use client";

import { getlogs } from "@/app/actions/get-logs";
import { columns } from "@/components/logs/column";
import { LogDataTable } from "@/components/logs/table";
import { Database } from "@/database.types";
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
      <LogDataTable data={logsData} columns={columns} />
    </div>
  );
}
