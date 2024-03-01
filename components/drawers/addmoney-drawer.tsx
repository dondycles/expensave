import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { AddMoneyForm } from "../forms/add-money";
import { useState } from "react";

export default function AddMoneyDrawer() {
  const [onOpenChange, setOnOpenChange] = useState(false);
  return (
    <Drawer onOpenChange={setOnOpenChange} open={onOpenChange}>
      <Button
        asChild
        size={"icon"}
        className="z-10 fixed bottom-4 left-1/2 -translate-x-1/2 rounded-full"
      >
        <DrawerTrigger>
          <Plus />
        </DrawerTrigger>
      </Button>

      <DrawerContent className="space-y-4 screen-padding">
        <DrawerTitle className="font-black text-xl text-center">
          Add Money Form
        </DrawerTitle>
        <AddMoneyForm mutated={() => setOnOpenChange(false)}>
          <DrawerClose className="flex-1">
            <Button variant="outline" className="w-full">
              Cancel.
            </Button>
          </DrawerClose>
        </AddMoneyForm>
      </DrawerContent>
    </Drawer>
  );
}
