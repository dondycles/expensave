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
import { useEditMoney, useListPageState } from "@/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setMoneyColor } from "@/app/actions/set-money-color";
import { useDebounce } from "@/lib/useDebouce";
import { HexColorPicker } from "react-colorful";
import { FaPesoSign } from "react-icons/fa6";
import { UsePhpPeso } from "@/lib/php-formatter";
export type Color = {
  opaque: string;
  transparent: string;
};
export default function ColorPickerDrawer() {
  const listPageState = useListPageState();
  const editMoney = useEditMoney();
  const [selectedColor, setSelectedColor] = useState<Color>({
    opaque: "",
    transparent: "",
  });
  const queryClient = useQueryClient();
  const { mutate: setColor } = useMutation({
    mutationFn: async (money: {
      id: string;
      color: { opaque: string; transparent: string };
    }) => await setMoneyColor(money.id, money.color),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["moneys", listPageState.sort.asc, listPageState.sort.by],
      });
    },
  });

  const debouncedSelectedColor = useDebounce(selectedColor);

  const handleOnOpenChange = (status: boolean) => {
    // sets selected color based from the selected money's color
    setSelectedColor(editMoney.money.color as Color);

    // sets the drawer's open status
    editMoney.setOpenColorPicker(status);

    // if the drawer is closed, reset the selected color and the money
    if (!status) {
      editMoney.setMoney({
        id: "",
        name: "",
        amount: 0,
        color: { opaque: "", transparent: "" },
      });
    }
  };

  useEffect(() => {
    setColor({
      color: selectedColor,
      id: editMoney.money.id,
    });
  }, [debouncedSelectedColor]);

  return (
    <Drawer onOpenChange={handleOnOpenChange} open={editMoney.openColorPicker}>
      <DrawerTrigger hidden className="hidden" />
      <DrawerContent className="space-y-4 screen-padding">
        <DrawerTitle className="font-black text-xl text-center">
          Color Picker
        </DrawerTitle>
        <div
          style={{
            backgroundColor: selectedColor.transparent,
            borderColor: selectedColor.opaque,
            color: selectedColor?.opaque,
          }}
          className={`rounded-[0.5rem] border p-2 scale-100 duration-150 grid grid-cols-2 xs:grid-cols-3  font-bold 

        `}
        >
          <p className=" truncate xs:col-span-2">{editMoney.money.name}</p>
          <div className="flex items-center gap-1 truncate">
            <FaPesoSign className="text-base  min-w-fit" />
            <p className="truncate">
              {UsePhpPeso(Number(editMoney.money.amount))}
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <HexColorPicker
            color={selectedColor.opaque}
            onChange={(color) => {
              setSelectedColor({
                transparent: `${color}20`,
                opaque: color,
              });
            }}
            style={{ width: "100%" }}
          />
        </div>
        <Button
          onClick={() => {
            setSelectedColor({
              opaque: "",
              transparent: "",
            });
          }}
          type="button"
          variant="outline"
          className="w-full"
        >
          Clear color
        </Button>
        <Button
          onClick={() => editMoney.setOpenColorPicker(false)}
          className="w-full"
        >
          Close
        </Button>
      </DrawerContent>
    </Drawer>
  );
}
