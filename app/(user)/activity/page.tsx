"use client";

import { getlogs } from "@/app/actions/get-logs";
import { getmoneys } from "@/app/actions/get-moneys";

import { logsDataColumns } from "@/components/activity-page/logs-table-data-column";
import LogTableSkeleton from "@/components/activity-page/logs-table-skeleton";
import { LogDataTable } from "@/components/activity-page/logs-table";
import { MoneyColor } from "@/lib/constants";
import { useListState } from "@/store";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Cell, Tooltip, ResponsiveContainer, PieChart, Pie } from "recharts";
import { FaPesoSign } from "react-icons/fa6";
import { UsePhpPesoWSign } from "@/lib/php-formatter";

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

  const moneys = moneysData?.success?.flatMap((money) => money);

  const fetching = logsDataLoading || moneysLoading;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="p-4 rounded-[--radius] border bg-background font-bold"
          style={{
            borderColor: payload[0]?.payload?.color?.opaque,
            color: payload[0]?.payload?.color?.opaque,
          }}
        >
          <p className="flex flex-row gap-1 items-center  ">
            {payload[0].name} :
            <FaPesoSign className="text-base min-w-fit" />
            {payload[0].value}
          </p>
        </div>
      );
    }

    return null;
  };
  const RADIAN = Math.PI / 180;
  const CustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    name,
    value,
  }: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <>
        <text
          x={x}
          y={y - 10}
          fill="hsl(var(--background))"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
          style={{ fontSize: "0.75rem" }}
        >
          {name.length > 11 ? `${name.slice(0, 8)}...` : name}
        </text>
        <text
          x={x}
          y={y + 10}
          fill="hsl(var(--background))"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
          style={{ fontSize: "0.75rem" }}
        >
          {UsePhpPesoWSign(value)}
        </text>
      </>
    );
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
            <p className="font-bold text-2xl">Total Money Breakdown</p>
            {/* <BarSorter /> */}
            <div className="rounded-[--radius] w-full aspect-square max-h-[500px]">
              <ResponsiveContainer width="100%" height={"100%"}>
                <PieChart>
                  <Tooltip content={<CustomTooltip />} />
                  <Pie
                    data={moneys}
                    dataKey="amount"
                    cx="50%"
                    cy="50%"
                    label={CustomLabel}
                    labelLine={false}
                    outerRadius="100%"
                  >
                    {moneys?.map((money) => (
                      <Cell
                        key={money.id}
                        fill={
                          (money.color as MoneyColor)?.opaque ??
                          "hsl(var(--muted-foreground))"
                        }
                        style={{
                          outlineColor:
                            (money.color as MoneyColor)?.opaque ??
                            "hsl(var(--muted-foreground))",
                          outlineWidth: "1px",
                        }}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <br />
          <br />
        </>
      )}
    </div>
  );
}
