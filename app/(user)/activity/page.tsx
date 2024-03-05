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
type LastData = {
  amount: string;
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
          <Badge className="bg-green-500 text-background dark:text-foreground hover:bg-green-600">
            Add
          </Badge>
        );

      case "edit_money":
        return (
          <Badge className="bg-yellow-500 text-background dark:text-foreground hover:bg-yellow-600">
            Edit
          </Badge>
        );
    }
  };

  return (
    <div className="w-full h-full gap-4 screen-padding">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-black">Logs</CardTitle>
        </CardHeader>
        <CardContent className="grid ">
          <ScrollArea>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Action</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Changes (if edit)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs?.map((log) => {
                  return (
                    <TableRow key={log.id}>
                      <TableCell>{action(log.action)}</TableCell>
                      <TableCell>
                        {new Date(log.created_at).toLocaleString()}
                      </TableCell>
                      <TableCell className="flex flex-col">
                        {log.last_data ? (
                          <>
                            {Number((log.last_data as LastData).amount) !==
                            log.moneys?.amount ? (
                              <span>
                                {usePhpPeso((log.last_data as LastData).amount)}{" "}
                                to {usePhpPeso(log.moneys?.amount)}
                              </span>
                            ) : null}
                            {(log.last_data as LastData).name !==
                            log.moneys?.name ? (
                              <span>
                                {(log.last_data as LastData).name} to{" "}
                                {log.moneys?.name}
                              </span>
                            ) : null}
                          </>
                        ) : null}
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
