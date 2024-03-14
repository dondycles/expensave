import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useListState } from "@/store";
import { Button } from "../ui/button";

export default function BarSorter() {
  const listState = useListState();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-fit flex gap-1 items-center text-muted-foreground">
        <Button variant={"outline"} className="flex items-center gap-1">
          <p className="text-sm">sort by {listState.sort.by}</p>
          {listState.sort.asc === "true" ? (
            <TbSortAscending />
          ) : (
            <TbSortDescending />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup
          value={listState.sort.asc}
          onValueChange={(e) => {
            listState.setSort(e, listState.sort.by);
          }}
        >
          <DropdownMenuRadioItem value="true">Ascending</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="false">
            Descending
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={listState.sort.by}
          onValueChange={(e) => {
            listState.setSort(
              listState.sort.asc,
              e as typeof listState.sort.by
            );
          }}
        >
          <DropdownMenuRadioItem value="amount">Amount</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
