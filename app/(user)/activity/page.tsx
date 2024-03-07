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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePhpPeso } from "@/lib/php-formatter";
import { FaPesoSign } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { ArrowBigRight } from "lucide-react";
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
      <Badge
        className={` text-background dark:text-foreground  w-[40px]
            ${action === "add_money" && "bg-green-500 hover:bg-green-600"}
            ${action === "edit_money" && "bg-yellow-500 hover:bg-yellow-600"}
            ${action === "del_money" && "bg-red-500 hover:bg-red-600"}
            `}
      >
        {action === "add_money" && "Add"}
        {action === "edit_money" && "Edit"}
        {action === "del_money" && "Del"}
      </Badge>
    );
  };

  if (logsLoading) return;

  return (
    <div className="w-full h-full gap-4 screen-padding">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Logs</CardTitle>
        </CardHeader>
        <CardContent className="grid  overflow-auto">
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
                        <p className="text-nowrap">
                          {(log.latest_data as MoneyJSONData)?.name}
                        </p>
                      </TableCell>
                      <TableCell>
                        <p className="text-nowrap">
                          {new Date(log.created_at).toLocaleString()}
                        </p>
                      </TableCell>
                      <TableCell>
                        {log.action === "edit_money" && log.last_data ? (
                          <Table>
                            <TableBody>
                              {(log.last_data as MoneyJSONData).amount !==
                              (log.latest_data as MoneyJSONData).amount ? (
                                <TableRow>
                                  <TableCell>
                                    <div className="flex items-center">
                                      <FaPesoSign className="text-xs min-w-fit" />
                                      {usePhpPeso(
                                        (log.last_data as MoneyJSONData).amount
                                      )}{" "}
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <ArrowBigRight className="m-auto size-5 text-muted-foreground" />
                                  </TableCell>

                                  <TableCell>
                                    <div className="flex items-center">
                                      <FaPesoSign className="text-xs min-w-fit" />{" "}
                                      {usePhpPeso(
                                        (log.latest_data as MoneyJSONData)
                                          .amount
                                      )}
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ) : null}
                              {(log.last_data as MoneyJSONData).name !==
                              (log.latest_data as MoneyJSONData).name ? (
                                <TableRow>
                                  <TableCell>
                                    {(log.last_data as MoneyJSONData).name}{" "}
                                  </TableCell>
                                  <TableCell>
                                    <ArrowBigRight className="m-auto size-5 text-muted-foreground" />
                                  </TableCell>

                                  <TableCell>
                                    {(log.latest_data as MoneyJSONData).name}
                                  </TableCell>
                                </TableRow>
                              ) : null}
                            </TableBody>
                          </Table>
                        ) : (
                          <p className="text-muted-foreground">No Changes</p>
                        )}
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
        <CardFooter className="flex gap-4 justify-end">
          <Button variant={"outline"}>Previous</Button>
          <Button variant={"outline"}>Next</Button>
        </CardFooter>
      </Card>
      <br />
      <br />
      <br />
    </div>
  );
}
