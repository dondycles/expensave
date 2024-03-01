import { usePhpPeso } from "@/lib/php-formatter";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useState } from "react";
import AsteriskNumber from "../asterisk-value";
import { FaPesoSign } from "react-icons/fa6";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { delmoney } from "@/app/actions/delete-money";

interface MoneyCard extends React.HTMLAttributes<HTMLDivElement> {
  money: any;
  dashboardState: DashboardState;
}

export default function MoneyCard({
  money,
  dashboardState,
  ...props
}: MoneyCard) {
  const queryClient = useQueryClient();
  const [onOpenChange, setOnOpenChange] = useState<boolean>(false);

  const { mutate } = useMutation({
    mutationFn: async (id: string) => await delmoney(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["moneys"],
      });
    },
  });

  return (
    <ContextMenu onOpenChange={setOnOpenChange}>
      <ContextMenuTrigger>
        <div
          className={`rounded-[0.5rem] border p-2 scale-100 duration-150 grid grid-cols-2 xs:grid-cols-3 ${
            onOpenChange && "shadow-lg scale-[99%]"
          }`}
        >
          <p className=" truncate xs:col-span-2">{money.name}</p>
          <div className="flex items-center gap-1 truncate">
            <FaPesoSign className="text-base  min-w-fit" />
            {dashboardState.hideValues ? (
              <AsteriskNumber className="text-xs" number={money.amount} />
            ) : (
              <p className="truncate">{usePhpPeso(money.amount)}</p>
            )}{" "}
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Edit</ContextMenuItem>
        <ContextMenuItem onClick={() => mutate(money.id)}>
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
