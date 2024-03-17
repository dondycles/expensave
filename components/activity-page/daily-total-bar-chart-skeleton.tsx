import { useActivityPageState } from "@/store";
import { Skeleton } from "../ui/skeleton";

export default function DailyTotalBarChartSkeleton() {
  const activityPageState = useActivityPageState();
  return (
    <div className="w-full flex flex-col gap-4">
      <p className="text-2xl text-muted-foreground font-bold">Daily Total</p>
      <div className="border rounded-[--radius] p-4 flex flex-row gap-1 w-full h-[144px]">
        {Array.from({ length: activityPageState.dailyTotalLimit }).map(
          (_, index) => (
            <Skeleton
              key={index}
              className="w-full h-full bg-muted rounded-0"
            />
          )
        )}
      </div>
    </div>
  );
}
