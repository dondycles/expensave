import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../../../../components/ui/button";
import { Plus } from "lucide-react";
import { AddMoneyForm } from "./add-money-form";
import { useState } from "react";

export default function AddMoneyDrawer() {
  const [onOpenChange, setOnOpenChange] = useState(false);
  return (
    <Drawer onOpenChange={setOnOpenChange} open={onOpenChange}>
      <Button
        asChild
        size={"icon"}
        className="rounded-full"
        variant={"outline"}
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
            <Button type="button" variant="outline" className="w-full">
              Cancel
            </Button>
          </DrawerClose>
        </AddMoneyForm>
      </DrawerContent>
    </Drawer>
  );
}
