import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { Card, CardContent, CardHeader } from "../../../../components/ui/card";
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

import { getTotalMoney } from "@/actions/get-total-money";
import { useQuery } from "@tanstack/react-query";

type DailyTotalMoney = Database["public"]["Tables"]["daily_total_money"]["Row"];

interface Data extends DailyTotalMoney {
  isNoData: boolean;
}

export default function DailyTotalBarChart({ data }: { data: Data[] }) {
  const dailyTotalLimit = useActivityPageState();

  const { data: totalMoney, isLoading: totalLoading } = useQuery({
    queryKey: ["total"],
    queryFn: async () => await getTotalMoney(),
  });

  const finalizedDailyTotalData = () => {
    const modifiedDailyTotalData: Data[] = [];
    const currentDate = new Date();

    //? Set the date to the last day of the limit
    currentDate.setDate(
      currentDate.getDate() - (dailyTotalLimit.dailyTotalLimit - 1)
    );

    for (let i = 0; i < dailyTotalLimit.dailyTotalLimit; i++) {
      //? gets the date in ISO format and splits it to get the date only
      const date = currentDate.toLocaleDateString();

      //? gets the existing data if there is any
      const existingData = data?.find((item) => item.date === date);

      //? gets the data for today if there is any
      const todaysData = data?.some(
        (item) => item.date === new Date().toISOString()
      );

      //? if there is an existing data, push it to the modifiedDailyTotalData
      if (existingData) modifiedDailyTotalData.push(existingData);
      else {
        //? if there is no data for today, push a new data to the modifiedDailyTotalData
        if (!todaysData && i === dailyTotalLimit.dailyTotalLimit - 1)
          modifiedDailyTotalData.push({
            total: Number(totalMoney),
            date: date,
            isNoData: false,
            created_at: "",
            date_and_user: "",
            id: 0,
            user: "",
          });
        else {
          // ? checks if the previous index has data, if it does, push the same data to the modifiedDailyTotalData
          if (modifiedDailyTotalData[i - 1]?.isNoData === false) {
            modifiedDailyTotalData.push({
              total: modifiedDailyTotalData[i - 1]?.total,
              date: date,
              isNoData: false,
              created_at: "",
              date_and_user: "",
              id: 0,
              user: "",
            });
          } else {
            // ? if the previous index has no data, push a new data to the modifiedDailyTotalData with a total of what is the greatest total in the data but isNoData is true to indicate that there is no data for that day and make it a different color in the bar chart
            modifiedDailyTotalData.push({
              total: Math.max(...data?.map((item) => item.total as number)),
              date: date,
              isNoData: true,
              created_at: "",
              date_and_user: "",
              id: 0,
              user: "",
            });
          }
        }
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return modifiedDailyTotalData;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-[--radius]  p-2  text-sm backdrop-blur bg-foreground/75 text-background">
          {payload[0]?.payload.isNoData ? (
            <p>No data available.</p>
          ) : (
            <>
              <p>{new Date(label).toDateString()}</p>
              <p>{UsePhpPesoWSign(payload[0]?.value)}</p>
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
