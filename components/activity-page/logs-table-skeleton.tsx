import { FaSpinner } from "react-icons/fa6";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function LogTableSkeleton() {
  return (
    <div className="flex flex-col gap-4 text-muted-foreground">
      <p className="font-bold text-2xl">Logs</p>
      <div className="flex flex-row justify-between gap-4">
        <Button variant={"outline"} size={"sm"} disabled>
          Shown columns
        </Button>
        <Input disabled className=" max-w-96" placeholder="Filter by name..." />
      </div>
      <div className="w-full h-44 border rounded-[--radius] flex items-center justify-center">
        <FaSpinner className="animate-spin text-muted-foreground" />
      </div>
    </div>
  );
}
