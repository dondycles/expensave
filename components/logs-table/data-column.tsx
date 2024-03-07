"use client";

import { Button } from "@/components/ui/button";
import { Database } from "@/database.types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "../ui/badge";
import { Suspense } from "react";
import { usePhpPesoWSign } from "@/lib/php-formatter";

const action = (action: String) => {
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
  let nameChanged = false,
    amountChanged = false;

  if (Number(lastData.amount) != Number(latestData.amount))
    amountChanged = true;
  if (lastData.name != latestData.name) nameChanged = true;

  const nameStatement = `${lastData.name} to ${latestData.name}`;
  const valueStatement = `${lastData.amount} to ${latestData.amount}`;

  return (
    <div>
      {nameChanged ? nameStatement : null}{" "}
      {amountChanged ? valueStatement : null}
    </div>
  );
};

export const logsDataColumns: ColumnDef<
  Database["public"]["Tables"]["logs"]["Row"]
>[] = [
  {
    accessorKey: "action",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Action
          <ArrowUpDown className="size-3 ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="pl-4">{action(row.getValue("action"))}</div>;
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
        last: MoneyJSONData;
        latest: MoneyJSONData;
      };

      return <div className="pl-4">{changes.last.name}</div>;
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
