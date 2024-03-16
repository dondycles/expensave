import { Database } from "@/database.types";
import { MoneyColor } from "@/lib/constants";
import { UsePhpPesoWSign } from "@/lib/php-formatter";
import { useState } from "react";
import { Cell, Pie, ResponsiveContainer, Sector, PieChart } from "recharts";

export default function TotalMoneyBreakdownPieChart({
  moneys,
}: {
  moneys: Database["public"]["Tables"]["moneys"]["Row"][];
}) {
  const [activeIndex, setActiveIndex] = useState(0);

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

  return (
    <div className="flex flex-col gap-4">
      <p className="font-bold text-2xl">Total Money Breakdown</p>
      <div className="rounded-[--radius] w-full aspect-square max-h-[500px]">
        {moneys?.length ? (
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
        ) : (
          <div className="flex flex-col justify-center items-center">
            <PieChart width={100} height={100}>
              <Pie
                data={[{ name: "no-date", amount: 100 }]}
                dataKey={"amount"}
              />
            </PieChart>
            <p className=" text-sm text-muted-foreground">No results.</p>
          </div>
        )}
      </div>
    </div>
  );
}
