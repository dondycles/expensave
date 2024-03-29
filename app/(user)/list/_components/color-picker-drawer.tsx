"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../../../../components/ui/button";
import { useEffect, useState } from "react";
import {
  useAvailableMoneyColors,
  useEditMoney,
  useListPageState,
} from "@/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setMoneyColor } from "@/actions/set-money-color";
import { useDebounce } from "@/lib/useDebouce";
import { HexColorPicker } from "react-colorful";
import { FaPesoSign } from "react-icons/fa6";
import { UsePhpPeso } from "@/lib/php-formatter";

export default function ColorPickerDrawer() {
  const listPageState = useListPageState();
  const availableMoneyColors = useAvailableMoneyColors();
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
    setSelectedColor({
      opaque: editMoney.money.opaque_color ?? "",
      transparent: editMoney.money.trans_color ?? "",
    });

    // sets the drawer's open status
    editMoney.setOpenColorPicker(status);

    // if the drawer is closed, reset the selected color and the money
    if (!status) {
      editMoney.setMoney({
        id: "",
        name: "",
        amount: 0,
        opaque_color: null,
        trans_color: null,
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
    <Drawer
      dismissible={false}
      onOpenChange={handleOnOpenChange}
      open={editMoney.openColorPicker}
    >
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
        <div className="flex justify-center flex-col gap-4">
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
          <div className="flex gap-1 flex-wrap">
            {availableMoneyColors.colors.map((color) => {
              return (
                <Button
                  onClick={() => {
                    setSelectedColor({
                      transparent: color.trans_color,
                      opaque: color.opaque_color,
                    });
                  }}
                  key={color.opaque_color}
                  className="text-xs w-fit h-fit p-2 rounded-[--radius] line-clamp-1"
                  style={{
                    color: color.opaque_color,
                    backgroundColor: color.trans_color,
                    border: `1px solid ${color.opaque_color}`,
                  }}
                >
                  {color.names.concat().join(", ")}
                </Button>
              );
            })}
          </div>
        </div>
        <div className="flex gap-4">
          <Button
            onClick={() => {
              setSelectedColor({
                opaque: "",
                transparent: "#00000000",
              });
            }}
            type="button"
            variant="outline"
            className="flex-1"
          >
            Clear color
          </Button>
          <Button
            onClick={() => editMoney.setOpenColorPicker(false)}
            className="flex-1"
          >
            Close
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
