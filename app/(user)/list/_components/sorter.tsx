import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import { useListPageState } from "@/store";

export default function ListSorter() {
  const listPageState = useListPageState();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-fit ml-auto mr-0 flex gap-1 items-center text-muted-foreground">
        <p className="text-sm">sort by {listPageState.sort.by}</p>
        {listPageState.sort.asc === "true" ? (
          <TbSortAscending />
        ) : (
          <TbSortDescending />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup
          value={listPageState.sort.asc}
          onValueChange={(e) => {
            listPageState.setSort(e, listPageState.sort.by);
          }}
        >
          <DropdownMenuRadioItem value="true">Ascending</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="false">
            Descending
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={listPageState.sort.by}
          onValueChange={(e) => {
            listPageState.setSort(
              listPageState.sort.asc,
              e as typeof listPageState.sort.by
            );
          }}
        >
          <DropdownMenuRadioItem value="created_at">
            Date Created
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="amount">Amount</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="opaque_color">
            Color
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
