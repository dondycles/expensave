"use client";
import { getlogs } from "@/app/actions/get-logs";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePhpPeso } from "@/lib/php-formatter";
import { FaPesoSign } from "react-icons/fa6";
import { ArrowBigRightDash, ArrowRight, Circle } from "lucide-react";
type MoneyJSONData = {
  amount: number;
  name: string;
  id: string;
};
export default function Activity() {
  const {
    data: logsData,
    isLoading: logsLoading,
    error: logsError,
  } = useQuery({
    queryFn: async () => await getlogs(),
    refetchOnWindowFocus: false,
    queryKey: ["logs"],
  });

  const logs = logsData?.success?.flatMap((log) => log);

  const action = (action: string | null) => {
    return (
      <Circle
        className={` text-background dark:text-foreground  stroke-none size-3 m-auto
            ${action === "add_money" && "fill-green-500 hover:fill-green-600"}
            ${
              action === "edit_money" && "fill-yellow-500 hover:fill-yellow-600"
            }
            ${action === "del_money" && "fill-red-500 hover:fill-red-600"}
            `}
      />
    );
  };

  return (
    <div className="w-full h-full gap-4 screen-padding">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Logs</CardTitle>
        </CardHeader>
        <CardContent className="grid">
          <ScrollArea>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead />
                  <TableHead>Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Changes (if edit)</TableHead>
                  <TableHead>Total Money</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs?.map((log) => {
                  return (
                    <TableRow key={log.id}>
                      <TableCell>{action(log.action)}</TableCell>
                      <TableCell>
                        {(log.latest_data as MoneyJSONData)?.name}
                      </TableCell>
                      <TableCell>
                        {new Date(log.created_at).toLocaleString()}
                      </TableCell>
                      <TableCell className="grid">
                        {log.action === "edit_money" && log.last_data ? (
                          <div className="grid grid-cols-3">
                            {(log.last_data as MoneyJSONData).amount !==
                            (log.latest_data as MoneyJSONData).amount ? (
                              <>
                                <div className="flex items-center min-w-fit">
                                  <FaPesoSign className="text-xs min-w-fit" />
                                  {usePhpPeso(
                                    (log.last_data as MoneyJSONData).amount
                                  )}{" "}
                                </div>
                                <div>
                                  <ArrowBigRightDash
                                    className={`m-auto ${
                                      (log.last_data as MoneyJSONData).amount >=
                                      (log.latest_data as MoneyJSONData).amount
                                        ? "text-red-500"
                                        : "text-green-500"
                                    } `}
                                  />
                                </div>
                                <div className="flex items-center">
                                  <FaPesoSign className="text-xs min-w-fit" />{" "}
                                  {usePhpPeso(
                                    (log.latest_data as MoneyJSONData).amount
                                  )}
                                </div>
                              </>
                            ) : null}
                            {(log.last_data as MoneyJSONData).name !==
                            (log.latest_data as MoneyJSONData).name ? (
                              <>
                                <span>
                                  {(log.last_data as MoneyJSONData).name}{" "}
                                </span>
                                <ArrowBigRightDash className="m-auto" />
                                <span>
                                  {(log.latest_data as MoneyJSONData).name}
                                </span>
                              </>
                            ) : null}
                          </div>
                        ) : null}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <FaPesoSign className="text-xs min-w-fit" />
                          {log.current_total_money}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableCaption>
                <div className="grid grid-cols-2 w-fit">
                  <>
                    {action("add_money")}
                    <p className="text-left">Add money</p>
                  </>
                  <>
                    {action("edit_money")}
                    <p className="text-left">Edit money</p>
                  </>
                  <>
                    {action("del_money")}
                    <p className="text-left">Delete money</p>
                  </>
                </div>
              </TableCaption>
            </Table>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>
      <br />
      <br />
      <br />
    </div>
  );
}
