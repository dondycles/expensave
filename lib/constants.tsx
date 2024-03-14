export const moneysColors = [
  {
    name: "default",
    transparent: "",
    opaque: "",
  },
  {
    name: "red",
    transparent: "#ef444420",
    opaque: "#ef4444",
  },
  {
    name: "orange",
    transparent: "#f9731620",
    opaque: "#f97316",
  },
  {
    name: "yellow",
    transparent: "#eab30820",
    opaque: "#eab308",
  },
  {
    name: "green",
    transparent: "#22c55e20",
    opaque: "#22c55e",
  },
  {
    name: "blue",
    transparent: "#3b82f620",
    opaque: "#3b82f6",
  },
  {
    name: "indigo",
    transparent: "#6366f120",
    opaque: "#6366f1",
  },
  {
    name: "violet",
    transparent: "#8b5cf620",
    opaque: "#8b5cf6",
  },
];

export type MoneyColor = (typeof moneysColors)[0];
import { Activity, List } from "lucide-react";

export const pathnames = [
  { name: "List", link: "/list", icon: <List className="size-5" /> },
  {
    name: "Activity",
    link: "/activity",
    icon: <Activity className="size-5" />,
  },
];
