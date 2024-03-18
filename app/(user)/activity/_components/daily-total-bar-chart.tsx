import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { Card, CardContent } from "../../../../components/ui/card";
import { Database } from "@/database.types";
import { UsePhpPesoWSign } from "@/lib/php-formatter";
import { useActivityPageState } from "@/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { getLocaleTime } from "@/lib/get-locale-date";

// import { getTotalMoney } from "@/actions/get-total-money";
// import { useQuery } from "@tanstack/react-query";
// import { getDailyTotal } from "@/actions/get-daily-total";

type DailyTotalMoney = Database["public"]["Tables"]["daily_total_money"]["Row"];

interface Data extends DailyTotalMoney {
  isNoData: boolean;
}

export default function DailyTotalBarChart({ data }: { data: Data[] }) {
  const activityPageState = useActivityPageState();

  // const { data: totalMoney, isLoading: totalLoading } = useQuery({
  //   queryKey: ["total"],
  //   queryFn: async () => await getTotalMoney(),
  // });

  const finalizedDailyTotalData = () => {
    const modifiedDailyTotalData: Data[] = [];
    const currentDate = new Date();

    currentDate.setDate(
      currentDate.getDate() - (activityPageState.dailyTotalLimit - 1)
    );

    for (let i = 0; i < activityPageState.dailyTotalLimit; i++) {
      const date = currentDate.toLocaleDateString();

      const existingData = data?.find(
        (item) => new Date(item.updated_at).toLocaleDateString() === date
      );

      // const todaysData = data?.some(
      //   (item) => item.date === new Date().toISOString().split("T")[0]
      // );

      if (existingData) modifiedDailyTotalData.push(existingData);
      else {
        // if (!todaysData && i === activityPageState.dailyTotalLimit - 1)
        //   modifiedDailyTotalData.push({
        //     total: Number(totalMoney),
        //     date: date,
        //     isNoData: false,
        //     created_at: "",
        //     date_and_user: "",
        //     id: 0,
        //     user: "",
        //   });
        // else {
        if (modifiedDailyTotalData[i - 1]?.isNoData === false) {
          modifiedDailyTotalData.push({
            total: modifiedDailyTotalData[i - 1]?.total,
            updated_at: date,
            isNoData: false,
            created_at: "",
            date_and_user: "",
            id: 0,
            user: "",
          });
        } else {
          modifiedDailyTotalData.push({
            total: Math.max(...data?.map((item) => item.total as number)),
            updated_at: date,
            isNoData: true,
            created_at: "",
            date_and_user: "",
            id: 0,
            user: "",
          });
        }
        // }
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
        defaultValue={activityPageState.dailyTotalLimit.toString()}
        onValueChange={(value) =>
          activityPageState.setDailyTotalLimit(Number(value))
        }
      >
        <SelectTrigger className="w-fit">
          Last {activityPageState.dailyTotalLimit} days
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
                      key={e.updated_at}
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
            <p className="text-muted-foreground text-sm text-center py-4">
              No results.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
