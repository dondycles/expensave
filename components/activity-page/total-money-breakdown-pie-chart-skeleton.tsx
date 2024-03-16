import { Skeleton } from "../ui/skeleton";

export default function TotalMoneyBreakdownPieChartSkeleton() {
  return (
    <div className="flex w-full flex-col gap-4 justify-centertext-muted-foreground">
      <p className="font-bold text-2xl">Total Money Breakdown</p>
      <Skeleton className="max-w-[300px] aspect-square w-full rounded-full mx-auto" />
    </div>
  );
}
