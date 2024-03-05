"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ReactNode } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editMoney } from "@/app/actions/edit-money";
import { useListState } from "@/store";

const EditMoneySchema = z.object({
  name: z.string(),
  amount: z.any(),
  id: z.string(),
});

export type EditMoneyTypes = z.infer<typeof EditMoneySchema>;

export function EditMoneyForm({
  children,
  mutated,
  money,
}: {
  children: ReactNode;
  mutated: () => void;
  money: EditMoneyTypes | null;
}) {
  const lastValues = {
    amount: money?.amount!,
    name: money?.name!,
    id: money?.id!,
  };
  const queryClient = useQueryClient();
  const listState = useListState();
  const form = useForm<z.infer<typeof EditMoneySchema>>({
    resolver: zodResolver(EditMoneySchema),
    defaultValues: {
      name: money?.name,
      amount: money?.amount,
      id: money?.id,
    },
  });

  const { mutate: mutateMoney, isPending } = useMutation({
    mutationFn: async (values: z.infer<typeof EditMoneySchema>) => {
      const { error, success } = await editMoney(values, lastValues);
      if (error) {
        form.setError("amount", { message: error });
        return error;
      }
      queryClient.invalidateQueries({
        queryKey: ["moneys", listState.sort.asc, listState.sort.by],
      });
      form.reset();
      mutated();
      return success;
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values: z.infer<typeof EditMoneySchema>) =>
          mutateMoney(values)
        )}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="amount." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className=" flex flex-row gap-4">
          {children}
          <Button
            disabled={isPending}
            type="submit"
            className={`flex-1 ${isPending && "animate-pulse"}`}
          >
            {isPending ? "Editing..." : "Edit."}
          </Button>
        </div>
      </form>
    </Form>
  );
}
