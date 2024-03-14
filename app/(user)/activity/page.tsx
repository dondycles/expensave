"use client";

import { getlogs } from "@/app/actions/get-logs";
import { getmoneys } from "@/app/actions/get-moneys";
import BarSorter from "@/components/activity-page/bar-sorter";
import { logsDataColumns } from "@/components/activity-page/logs-table-data-column";
import LogTableSkeleton from "@/components/activity-page/logs-table-skeleton";
import { LogDataTable } from "@/components/activity-page/logs-table";
import { Card } from "@/components/ui/card";
import { MoneyColor } from "@/lib/constants";
import { useListState } from "@/store";
import { useQuery } from "@tanstack/react-query";
import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaPesoSign } from "react-icons/fa6";

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

  const {
    data: moneysData,
    isLoading: moneysLoading,
    error: moneysError,
  } = useQuery({
    queryFn: async () => await getmoneys(listState.sort),
    refetchOnWindowFocus: false,
    queryKey: ["moneys", listState.sort.asc, listState.sort.by],
  });

  const moneys = moneysData?.success?.flatMap((money) => money);

  const fetching = logsDataLoading || moneysLoading;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="p-4 rounded-[--radius] border bg-background font-bold"
          style={{
            borderColor: payload[0].payload.color.opaque,
            color: payload[0].payload.color.opaque,
          }}
        >
          <p className="flex flex-row gap-1 items-center  ">
            {label} :
            <FaPesoSign className="text-base min-w-fit" />
            {payload[0].value}
          </p>
        </div>
      );
    }

    return null;
  };
  return (
    <div className="w-full h-full screen-padding space-y-8">
      {fetching ? (
        <>
          <LogTableSkeleton />
        </>
      ) : (
        <>
          <LogDataTable data={logsData ?? []} columns={logsDataColumns} />
          <div className="flex flex-col gap-4">
            <p className="font-bold text-2xl">All Moneys</p>
            <BarSorter />
            <Card className="rounded-[--radius] shadow-none p-4">
              <ResponsiveContainer width="100%" height={500}>
                <BarChart data={moneys}>
                  <Tooltip content={<CustomTooltip />} />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Bar dataKey="amount">
                    {moneys?.map((money, i) => (
                      <Cell
                        key={money.id}
                        fill={
                          (money.color as MoneyColor)?.opaque ??
                          "hsl(var(--foreground))"
                        }
                        radius={5}
                      />
                    ))}
                  </Bar>
                  <XAxis
                    className="text-xs"
                    dataKey="name"
                    style={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                  <YAxis
                    className="text-xs"
                    style={{ fill: "hsl(var(--muted-foreground))" }}
                    tickFormatter={(value, i) => `Php ${value}`}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
