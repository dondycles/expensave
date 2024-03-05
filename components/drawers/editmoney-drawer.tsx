"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { EditMoneyForm } from "../forms/edit-money";
import { useEffect, useState } from "react";
import { useEditMoney } from "@/store";

export default function EditMoneyDrawer() {
  const [onOpenChange, setOnOpenChange] = useState(false);
  const editMoney = useEditMoney();

  useEffect(() => {
    setOnOpenChange(Boolean(editMoney.money));
  }, [editMoney.money]);

  useEffect(() => {
    if (!onOpenChange) {
      editMoney.setMoney(null);
    }
  }, [onOpenChange]);

  return (
    <Drawer onOpenChange={setOnOpenChange} open={onOpenChange}>
      <DrawerTrigger hidden className="hidden" />
      <DrawerContent className="space-y-4 screen-padding">
        <DrawerTitle className="font-black text-xl text-center">
          Edit Money Form
        </DrawerTitle>
        <EditMoneyForm
          money={editMoney.money}
          mutated={() => setOnOpenChange(false)}
        >
          <DrawerClose className="flex-1">
            <Button type="button" variant="ghost" className="w-full">
              Cancel.
            </Button>
          </DrawerClose>
        </EditMoneyForm>
      </DrawerContent>
    </Drawer>
  );
}
