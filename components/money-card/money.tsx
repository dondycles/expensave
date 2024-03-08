import { UsePhpPeso } from "@/lib/php-formatter";
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
import { useEditMoney, useMoneysStyle } from "@/store";
import { Database } from "@/database.types";
import { Circle, ExternalLink } from "lucide-react";
import { moneysColors } from "@/lib/constants";
import Link from "next/link";
interface MoneyCard extends React.HTMLAttributes<HTMLDivElement> {
  money: Database["public"]["Tables"]["moneys"]["Row"];
  listState: ListState;
}

export default function MoneyCard({ money, listState }: MoneyCard) {
  const queryClient = useQueryClient();
  const [onOpenChange, setOnOpenChange] = useState<boolean>(false);
  const editMoney = useEditMoney();
  const moneysStyles = useMoneysStyle();
  const { mutate: deleteMoney, isPending: deletePending } = useMutation({
    mutationFn: async (id: string) => await delmoney(id, money),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["moneys", listState.sort.asc, listState.sort.by],
      });
      queryClient.invalidateQueries({
        queryKey: ["total"],
      });
    },
  });

  const thisMoneyColors = moneysStyles.colors.filter(
    (color: { id: string }) => color.id === money.id
  )[0];
  const focusMoney = Boolean(editMoney.money?.id === money.id || onOpenChange);
  return (
    <ContextMenu onOpenChange={setOnOpenChange}>
      <ContextMenuTrigger>
        <div
          style={{
            backgroundColor: thisMoneyColors?.color.transparent,
            borderColor:
              (deletePending && "hsl(var(--destructive))") ||
              thisMoneyColors?.color.opaque,
            color: thisMoneyColors?.color.opaque,
          }}
          className={`rounded-[0.5rem] border p-2 scale-100 duration-150 grid grid-cols-2 xs:grid-cols-3  font-bold 
          ${focusMoney && "shadow-lg scale-[99%] border-[3px]"}
          ${deletePending && "opacity-80  border-[3px]"}
          `}
        >
          <p className=" truncate xs:col-span-2">{money.name}</p>
          <div className="flex items-center gap-1 truncate">
            <FaPesoSign className="text-base  min-w-fit" />
            {listState.hideValues ? (
              <AsteriskNumber
                className="text-xs"
                number={Number(money.amount)}
              />
            ) : (
              <p className="truncate">{UsePhpPeso(Number(money.amount))}</p>
            )}{" "}
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          onClick={() => {
            editMoney.setMoney(money);
            editMoney.setOpenModal(true);
          }}
        >
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
                <ContextMenuItem
                  onClick={() =>
                    moneysStyles.setColor({
                      color: {
                        opaque: color.opaque,
                        transparent: color.transparent,
                      },
                      id: money.id,
                    })
                  }
                  key={color?.name}
                  className="gap-2"
                >
                  <Circle
                    className="size-4"
                    style={{ fill: color.transparent, color: color.opaque }}
                  />{" "}
                  {color.name}
                </ContextMenuItem>
              );
            })}
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuItem disabled asChild>
          <Link
            href={"/money/" + money.id}
            className="flex items-center justify-between"
          >
            Details <ExternalLink className="size-4" />
          </Link>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
