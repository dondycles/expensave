import { FaPesoSign } from "react-icons/fa6";
import { Card, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import AsteriskNumber from "../asterisk-value";
import { UsePhpPeso } from "@/lib/php-formatter";
import AddMoneyDrawer from "../drawers/addmoney-drawer";
import { useListState } from "@/store";
import { Eye, EyeOff } from "lucide-react";

export default function ListTotalCard({
  fetching,
  total,
}: {
  fetching: boolean;
  total: number;
}) {
  const listState = useListState();
  return (
    <Card className="bg-foreground  shadow-md">
      <CardHeader>
        <div className="grid grid-cols-3 ">
          <div className="w-full flex flex-col col-span-2 text-background">
            <div className="text-muted-foreground text-sm w-fit flex gap-2 items-center ">
              <p className="line-clamp-1 w-fit">Total money</p>
              <button className="w-fit h-fit my-auto ml-auto mr-0">
                {listState.hideValues ? (
                  <EyeOff
                    className="size-5"
                    onClick={() => listState.setHideValues()}
                  />
                ) : (
                  <Eye
                    className="size-5"
                    onClick={() => listState.setHideValues()}
                  />
                )}
              </button>
            </div>
            <div className="flex items-center w-full col-span-2">
              <FaPesoSign className="text-2xl min-w-fit" />
              {fetching ? (
                <Skeleton className="w-24 h-8 invert ml-1" />
              ) : listState.hideValues ? (
                <AsteriskNumber number={Number(total)} />
              ) : (
                <p className="text-2xl max-w-full  truncate font-bold">
                  {UsePhpPeso(Number(total))}
                </p>
              )}
            </div>
          </div>
          <div className="my-auto ml-auto mr-0 ">
            <AddMoneyDrawer />
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
