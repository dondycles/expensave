"use client";

import { Button } from "@/components/ui/button";
import { Database } from "@/database.types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowBigDown, ArrowBigUp, ArrowUpDown } from "lucide-react";
import { Badge } from "../ui/badge";
import { usePhpPesoWSign } from "@/lib/php-formatter";

const getAction = (action: String) => {
  let modifiedActon;
  let color;
  switch (action) {
    case "add_money":
      modifiedActon = "Add";
      color = "bg-green-500 hover:bg-green-600";
      break;
    case "edit_money":
      modifiedActon = "Edit";
      color = "bg-yellow-500 hover:bg-yellow-600";

      break;

    case "del_money":
      modifiedActon = "Del";
      color = "bg-red-500 hover:bg-red-600";
      break;

    default:
      modifiedActon = "";
      color = "bg-muted";
      break;
  }

  return (
    <Badge className={`w-10 ${color} dark:text-foreground`}>
      {modifiedActon}
    </Badge>
  );
};

const getChanges = (lastData: MoneyJSONData, latestData: MoneyJSONData) => {
  if (!lastData && !latestData)
    return <span className="text-muted-foreground">None</span>;

  const isAmountChanged =
    Number(lastData?.amount) !== Number(latestData?.amount);
  const isNameChanged = lastData?.name !== latestData?.name;

  const isAmountIncreased = latestData.amount >= lastData.amount;

  const nameStatement = (
    <p>
      {lastData?.name} to {latestData?.name}
    </p>
  );
  const amountStatement = (
    <p className="flex items-center gap-1">
      <span>{usePhpPesoWSign(lastData?.amount)}</span> <span>to</span>
      <span>{usePhpPesoWSign(latestData?.amount)}</span>
      {isAmountIncreased ? (
        <ArrowBigUp className="text-green-500 size-5" />
      ) : (
        <ArrowBigDown className="text-red-500 size-5" />
      )}{" "}
    </p>
  );

  return (
    <div className="flex flex-col gap-1">
      {isNameChanged ? nameStatement : null}
      {isAmountChanged ? amountStatement : null}
    </div>
  );
};

export const logsDataColumns: ColumnDef<
  Database["public"]["Tables"]["logs"]["Row"]
>[] = [
  {
    accessorKey: "action",
    header: () => {
      return <div className="pl-4">Action</div>;
    },
    cell: ({ row }) => {
      return <div className="pl-4">{getAction(row.getValue("action"))}</div>;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="size-3 ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="pl-4">{row.getValue("name")}</div>;
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="size-3 ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="pl-4">
          {new Date(row.getValue("created_at")).toLocaleString()}
        </div>
      );
    },
  },
  {
    accessorKey: "changes",
    header: "Changes",
    cell: ({ row }) => {
      const changes = row.getValue("changes") as {
        lastData: MoneyJSONData;
        latestData: MoneyJSONData;
      };

      return getChanges(changes?.lastData, changes?.latestData);
    },
  },
  {
    accessorKey: "current_total_money",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total money
          <ArrowUpDown className="size-3 ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const current_total_money = parseFloat(
        row.getValue("current_total_money")
      );

      return <div className="pl-4">{usePhpPesoWSign(current_total_money)}</div>;
    },
  },
];
