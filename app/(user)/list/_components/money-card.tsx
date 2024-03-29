"use client";
import { UsePhpPeso } from "@/lib/php-formatter";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useState } from "react";
import AsteriskNumber from "../../../../lib/asterisk-value";
import { FaPesoSign } from "react-icons/fa6";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { delmoney } from "@/actions/delete-money";
import { useEditMoney } from "@/store";
import { Database } from "@/database.types";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
interface MoneyCard extends React.HTMLAttributes<HTMLDivElement> {
  money: Database["public"]["Tables"]["moneys"]["Row"];
  listPageState: ListPageState;
}

export default function MoneyCard({ money, listPageState }: MoneyCard) {
  const queryClient = useQueryClient();
  const [onOpenChange, setOnOpenChange] = useState<boolean>(false);
  const editMoney = useEditMoney();

  const { mutate: deleteMoney, isPending: deletePending } = useMutation({
    mutationFn: async (id: string) => await delmoney(id, money),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["moneys", listPageState.sort.asc, listPageState.sort.by],
      });
      queryClient.invalidateQueries({
        queryKey: ["total"],
      });
    },
  });

  const focusMoney = Boolean(editMoney.money?.id === money.id || onOpenChange);

  return (
    <ContextMenu onOpenChange={setOnOpenChange}>
      <ContextMenuTrigger
        style={{
          backgroundColor: money?.trans_color ?? "",
          borderColor:
            ((deletePending && "hsl(var(--destructive))") ||
              money.opaque_color) ??
            "",
          color: money.opaque_color ?? "",
        }}
        className={`rounded-[0.5rem] border p-2 scale-100 duration-150 grid grid-cols-2 xs:grid-cols-3  font-bold 
          ${focusMoney && "shadow-lg scale-[99%] border-[3px]"}
          ${deletePending && "opacity-80  border-[3px]"}
        `}
      >
        <p className=" truncate xs:col-span-2">{money.name}</p>
        <div className="flex items-center gap-1 truncate">
          <FaPesoSign className="text-base  min-w-fit" />
          {listPageState.hideValues ? (
            <AsteriskNumber className="text-xs" number={Number(money.amount)} />
          ) : (
            <p className="truncate">{UsePhpPeso(Number(money.amount))}</p>
          )}{" "}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          onClick={() => {
            editMoney.setMoney(money);
            editMoney.setOpenEditModal(true);
          }}
        >
          Edit
        </ContextMenuItem>
        <ContextMenuItem onClick={() => deleteMoney(money.id)}>
          Delete
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => {
            editMoney.setMoney(money);
            editMoney.setOpenColorPicker(true);
          }}
        >
          Set color
        </ContextMenuItem>

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
