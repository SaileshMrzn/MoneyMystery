"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/src/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { GoPlus, GoCheck } from "react-icons/go";

const formSchema = z.object({
  amount: z.string(),
  selectCategory: z.string(),
  addCategory: z.string(),
});

const Expense = () => {
  const [addCategory, setAddCategory] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter amount"
                    {...field}
                    className="focus:!ring-transparent"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* category row */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* dropdown */}
            <FormField
              control={form.control}
              name="selectCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-4">
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-[180px] focus:!ring-transparent">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                      {!addCategory && (
                        <GoPlus
                          size={30}
                          className="rounded-full hover:bg-green p-1 hover:text-white cursor-pointer ease-in-out transition-all duration-300 z-20"
                          onClick={() => setAddCategory(true)}
                        />
                      )}
                      {addCategory && (
                        <GoCheck
                          size={30}
                          className="rounded-full hover:bg-purple p-1 hover:text-white text-purple cursor-pointer ease-in-out transition-all duration-300 z-20"
                          onClick={() => setAddCategory(false)}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* add category */}
            <div
              className={`${
                addCategory
                  ? "max-[768px]:translate-y-0 md:translate-x-0 max-[768px]:block md:opacity-1"
                  : "max-[768px]:-translate-y-10 md:-translate-x-10 max-[768px]:hidden md:opacity-0 -z-50"
              } transition-all ease-in-out duration-300 w-full`}
            >
              <FormField
                control={form.control}
                name="addCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Category</FormLabel>
                    <FormControl>
                      <Input placeholder="Add new category" {...field} className="focus:!ring-transparent"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type="submit">Done</Button>
        </form>
      </Form>
    </div>
  );
};

export default Expense;
