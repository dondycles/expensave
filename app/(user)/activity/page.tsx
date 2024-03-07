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
        <ScrollArea>
          <CardContent className="grid max-h-[500px] overflow-auto">
            <ScrollArea>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead />
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Changes</TableHead>
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
                        <TableCell className="-text-nowrap">
                          {new Date(log.created_at).toLocaleString()}
                        </TableCell>
                        <TableCell className="truncate">
                          {log.action === "edit_money" && log.last_data ? (
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="pl-0">From</TableHead>
                                  <TableHead>To</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {(log.last_data as MoneyJSONData).amount !==
                                (log.latest_data as MoneyJSONData).amount ? (
                                  <TableRow>
                                    <TableCell className="pl-0">
                                      <FaPesoSign className="text-xs min-w-fit" />
                                      {usePhpPeso(
                                        (log.last_data as MoneyJSONData).amount
                                      )}{" "}
                                    </TableCell>

                                    <TableCell>
                                      <FaPesoSign className="text-xs min-w-fit" />{" "}
                                      {usePhpPeso(
                                        (log.latest_data as MoneyJSONData)
                                          .amount
                                      )}
                                    </TableCell>
                                  </TableRow>
                                ) : null}
                                {(log.last_data as MoneyJSONData).name !==
                                (log.latest_data as MoneyJSONData).name ? (
                                  <TableRow>
                                    <TableCell className="pl-0">
                                      {(log.last_data as MoneyJSONData).name}{" "}
                                    </TableCell>

                                    <TableCell className="">
                                      {(log.latest_data as MoneyJSONData).name}
                                    </TableCell>
                                  </TableRow>
                                ) : null}
                              </TableBody>
                            </Table>
                          ) : null}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <FaPesoSign className="text-xs min-w-fit" />
                            {usePhpPeso(log.current_total_money)}
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
        </ScrollArea>
      </Card>
      <br />
      <br />
      <br />
    </div>
  );
}
