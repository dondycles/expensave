import { usePhpPeso } from "@/lib/php-formatter";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useState } from "react";
import AsteriskNumber from "../asterisk-value";
import { FaPesoSign } from "react-icons/fa6";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { delmoney } from "@/app/actions/delete-money";
import { useEditMoney } from "@/store";
import { Database } from "@/database.types";
import { Circle } from "lucide-react";
import { moneysColors as colors } from "@/lib/constants";
interface MoneyCard extends React.HTMLAttributes<HTMLDivElement> {
  money: Database["public"]["Tables"]["moneys"]["Row"];
  dashboardState: DashboardState;
}

export default function MoneyCard({
  money,
  dashboardState,
  ...props
}: MoneyCard) {
  const queryClient = useQueryClient();
  const [onOpenChange, setOnOpenChange] = useState<boolean>(false);
  const editMoney = useEditMoney();
  const { mutate: deleteMoney, isPending: deletePending } = useMutation({
    mutationFn: async (id: string) => await delmoney(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["moneys", dashboardState.sort.asc, dashboardState.sort.by],
      });
    },
  });
  const moneysColors = colors;

  return (
    <ContextMenu onOpenChange={setOnOpenChange}>
      <ContextMenuTrigger>
        <div
          className={`rounded-[0.5rem] border p-2 scale-100 duration-150 grid grid-cols-2 xs:grid-cols-3 
          ${onOpenChange && "shadow-lg scale-[99%] border-primary"}
          ${deletePending && "opacity-80 border-destructive"}
          ${
            editMoney.money?.id === money.id &&
            "shadow-lg scale-[99%] border-orange-400"
          }
          `}
        >
          <p className=" truncate xs:col-span-2">{money.name}</p>
          <div className="flex items-center gap-1 truncate">
            <FaPesoSign className="text-base  min-w-fit" />
            {dashboardState.hideValues ? (
              <AsteriskNumber
                className="text-xs"
                number={Number(money.amount)}
              />
            ) : (
              <p className="truncate">{usePhpPeso(Number(money.amount))}</p>
            )}{" "}
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => editMoney.setMoney(money)}>
          Edit
        </ContextMenuItem>
        <ContextMenuItem onClick={() => deleteMoney(money.id)}>
          Delete
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>Set Color</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-fit">
            {moneysColors.map((color) => {
              return (
                <ContextMenuItem key={color.color} className="gap-2">
                  <Circle className={`size-4 ${color.color}`} /> {color.name}
                </ContextMenuItem>
              );
            })}
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  );
}
