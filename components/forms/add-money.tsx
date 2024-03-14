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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addmoney } from "@/app/actions/add-money";
import { ReactNode } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useListState } from "@/store";

const AddMoneySchema = z.object({
  name: z.string().min(1),
  amount: z.string().min(1),
});

export type AddMoneyTypes = z.infer<typeof AddMoneySchema>;

export function AddMoneyForm({
  children,
  mutated,
}: {
  children: ReactNode;
  mutated: () => void;
}) {
  const queryClient = useQueryClient();
  const listState = useListState();

  const form = useForm<z.infer<typeof AddMoneySchema>>({
    resolver: zodResolver(AddMoneySchema),
    defaultValues: {
      name: undefined,
      amount: undefined,
    },
  });

  const { mutate: mutateMoney, isPending } = useMutation({
    mutationFn: async (values: z.infer<typeof AddMoneySchema>) => {
      const { error, success } = await addmoney(values);
      if (error) {
        form.setError("amount", { message: error });
        return error;
      }
      queryClient.invalidateQueries({
        queryKey: ["moneys", listState.sort.asc, listState.sort.by],
      });
      queryClient.invalidateQueries({
        queryKey: ["total"],
      });
      form.reset();
      mutated();
      return success;
    },
    onMutate: (variables) => {
      const name = variables.name;
      const amount = Number(variables.amount);
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values: z.infer<typeof AddMoneySchema>) =>
          mutateMoney(values)
        )}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
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
            {isPending ? "Adding..." : "Add."}
          </Button>
        </div>
      </form>
    </Form>
  );
}
