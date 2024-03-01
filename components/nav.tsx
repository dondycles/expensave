import { LogOut, Plus, User, User2 } from "lucide-react";
import ModeToggle from "./theme-btn";
import { Button } from "./ui/button";

export default function Nav() {
  return (
    <header
      className="w-full flex justify-between screen-padding border-b-border border-b-[1px]
    "
    >
      <Button size="icon" variant={"ghost"}>
        <LogOut />
      </Button>
      <ModeToggle />
    </header>
  );
}
