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

export default function ListSorter() {
  const listState = useListState();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-fit ml-auto mr-0 flex gap-1 items-center text-muted-foreground">
        <p className="text-sm">sort by {listState.sort.by}</p>
        {listState.sort.asc === "true" ? (
          <TbSortAscending />
        ) : (
          <TbSortDescending />
        )}
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
          <DropdownMenuRadioItem value="created_at">
            Date Created
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="amount">Amount</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
