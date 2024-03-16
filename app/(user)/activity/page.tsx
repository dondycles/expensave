"use client";

import { getlogs } from "@/app/actions/get-logs";
import { getmoneys } from "@/app/actions/get-moneys";

import { logsDataColumns } from "@/components/activity-page/logs-table-data-column";
import LogTableSkeleton from "@/components/activity-page/logs-table-skeleton";
import { LogDataTable } from "@/components/activity-page/logs-table";
import { MoneyColor } from "@/lib/constants";
import { useListState } from "@/store";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Cell, ResponsiveContainer, PieChart, Pie, Sector } from "recharts";
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
  const renderActiveShape = (props: any) => {
    const {
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;

    return (
      <g>
        <text
          x={cx}
          y={cy}
          dy={-16}
          textAnchor="middle"
          fill={fill}
          style={{ fontWeight: "bold" }}
        >
          {payload.name}
        </text>
        <text
          x={cx}
          y={cy}
          dy={0}
          textAnchor="middle"
          fill="#333"
          style={{ fontSize: "0.8rem" }}
        >
          {UsePhpPesoWSign(value)}
        </text>
        <text
          x={cx}
          y={cy}
          dy={16}
          textAnchor="middle"
          fill="#999"
          style={{ fontSize: "0.8rem" }}
        >
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
      </g>
    );
  };

  const [activeIndex, setActiveIndex] = useState(0);
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
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={moneys}
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    fill="#8884d8"
                    dataKey="amount"
                    onMouseEnter={(_, i) => {
                      setActiveIndex(i);
                    }}
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
