"use client";
import { getlogs } from "@/app/actions/get-logs";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePhpPeso } from "@/lib/php-formatter";
import { FaPesoSign } from "react-icons/fa6";
import { ArrowBigRightDash, ArrowRight } from "lucide-react";
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
    switch (action) {
      case "add_money":
        return (
          <Badge className="bg-green-500 text-background dark:text-foreground hover:bg-green-600 w-full">
            Add
          </Badge>
        );

      case "edit_money":
        return (
          <Badge className="bg-yellow-500 text-background dark:text-foreground hover:bg-yellow-600 w-full">
            Edit
          </Badge>
        );

      case "del_money":
        return (
          <Badge className="bg-red-500 text-background dark:text-foreground hover:bg-red-600 w-full">
            Del
          </Badge>
        );
    }
  };

  return (
    <div className="w-full h-full gap-4 screen-padding">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Logs</CardTitle>
        </CardHeader>
        <CardContent className="grid max-h-[500px]">
          <ScrollArea>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-14">Action</TableHead>
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
                      <TableCell className="grid grid-cols-3 min-w-[144px]">
                        {log.action === "edit_money" && log.last_data ? (
                          <>
                            {(log.last_data as MoneyJSONData).amount !==
                            (log.latest_data as MoneyJSONData).amount ? (
                              <>
                                <span className="flex items-center">
                                  <FaPesoSign className="text-xs min-w-fit" />
                                  {usePhpPeso(
                                    (log.last_data as MoneyJSONData).amount
                                  )}{" "}
                                </span>
                                <ArrowBigRightDash
                                  className={`${
                                    (log.last_data as MoneyJSONData).amount >=
                                    (log.latest_data as MoneyJSONData).amount
                                      ? "text-red-500"
                                      : "text-green-500"
                                  } `}
                                />
                                <span className="flex items-center">
                                  <FaPesoSign className="text-xs min-w-fit" />{" "}
                                  {usePhpPeso(
                                    (log.latest_data as MoneyJSONData).amount
                                  )}
                                </span>
                              </>
                            ) : null}
                            {(log.last_data as MoneyJSONData).name !==
                            (log.latest_data as MoneyJSONData).name ? (
                              <>
                                <span>
                                  {(log.last_data as MoneyJSONData).name}{" "}
                                </span>
                                <ArrowBigRightDash />
                                <span>
                                  {(log.latest_data as MoneyJSONData).name}
                                </span>
                              </>
                            ) : null}
                          </>
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
