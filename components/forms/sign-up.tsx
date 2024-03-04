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
import { signup } from "@/app/actions/auth/sign-up";

const SignUpSchema = z
  .object({
    username: z.string().min(2).max(50),
    password: z.string().min(6),
    cpassword: z.string().min(1),
  })
  .refine((data) => data.password === data.cpassword, {
    path: ["cpassword"],
    message: "Password did not match.",
  });

export type SignUpFormTypes = z.infer<typeof SignUpSchema>;

export function SignUpForm() {
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      password: "",
      cpassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignUpSchema>) {
    const response = await signup(values);
    if (response?.authError)
      return form.setError("cpassword", {
        message: response?.authError.message,
      });
    if (response?.dbError)
      return form.setError("cpassword", {
        message: response?.dbError.message,
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="username." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="password." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cpassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="confirm password."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          className="w-full"
        >
          Sign Up.
        </Button>
      </form>
    </Form>
  );
}
