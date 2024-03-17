import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Database } from "@/database.types";
import { UsePhpPesoWSign } from "@/lib/php-formatter";
import { useActivityPageState } from "@/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "../ui/button";

type DailyTotalMoney = Database["public"]["Tables"]["daily_total_money"]["Row"];

interface Data extends DailyTotalMoney {
  isNoData: boolean;
}

export default function DailyTotalBarChart({ data }: { data: Data[] }) {
  const dailyTotalLimit = useActivityPageState();
  const finalizedDailyTotalData = () => {
    const modifiedDailyTotalData = [];
    const currentDate = new Date();
    currentDate.setDate(
      currentDate.getDate() - (dailyTotalLimit.dailyTotalLimit - 1)
    );

    for (let i = 0; i < dailyTotalLimit.dailyTotalLimit; i++) {
      const date = currentDate.toISOString().split("T")[0];

      const existingData = data?.find((item) => item.date === date);

      if (existingData) {
        modifiedDailyTotalData.push(existingData);
      } else {
        modifiedDailyTotalData.push({
          total: Math.max(...data?.map((item) => item.total as number)),
          date: date,
          isNoData: true,
        });
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return modifiedDailyTotalData;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-[--radius]  p-2  text-sm backdrop-blur">
          {payload[0].payload.isNoData ? (
            <p>No data available.</p>
          ) : (
            <>
              <p>{new Date(label).toDateString()}</p>
              <p>{UsePhpPesoWSign(payload[0].value)}</p>
            </>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-2xl font-bold">Daily Total</p>
      <Select
        defaultValue={dailyTotalLimit.dailyTotalLimit.toString()}
        onValueChange={(value) =>
          dailyTotalLimit.setDailyTotalLimit(Number(value))
        }
      >
        <SelectTrigger className="w-fit">
          Last {dailyTotalLimit.dailyTotalLimit} days
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={"7"}>7</SelectItem>
          <SelectItem value={"14"}>14</SelectItem>
          <SelectItem value={"21"}>21</SelectItem>
          <SelectItem value={"30"}>30</SelectItem>
        </SelectContent>
      </Select>
      <Card className="shadow-none rounded-[--radius]">
        <CardContent
          className={`w-full py-0 px-1 ${data.length && "h-[144px]"}`}
        >
          {data.length ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={150}
                height={40}
                data={finalizedDailyTotalData()}
              >
                <XAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  dataKey="date"
                  tickFormatter={(value) =>
                    value ? new Date(value).toLocaleDateString() : ""
                  }
                />
                <Tooltip content={CustomTooltip} />
                <Bar dataKey="total" radius={[4, 4, 0, 0]}>
                  {finalizedDailyTotalData().map((e) => (
                    <Cell
                      key={e.date}
                      style={
                        !e.isNoData
                          ? {
                              fill: "hsl(var(--foreground))",
                            }
                          : { fill: "hsl(var(--muted))" }
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-muted-foreground text-sm text-center pb-4">
              No results.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
