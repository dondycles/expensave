// components/AsteriskNumber.js

import { cn } from "@/lib/utils";
import React from "react";

export default function AsteriskNumber({
  number,
  className,
}: {
  number: number;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
}) {
  const numberString = number.toString();
  const asteriskString = "*".repeat(numberString.length);

  return (
    <p className={cn("font-bold text-2xl", className)}>{asteriskString}</p>
  );
}
