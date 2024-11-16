"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/src/components/ui/button";
import {
  Form,
  FormControl,
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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const formSchema = z.object({
  amount: z.string(),
  selectCategory: z.string(),
  addCategory: z.string().optional(),
});

const Expense = ({ params }: { params: { userid: string } }) => {
  const queryClient = useQueryClient();

  console.log(params.userid);

  // fetch category data
  const {
    isPending,
    error,
    data: categories,
  } = useQuery({
    queryKey: ["categoryData"],
    queryFn: () =>
      axios.get(`/api/getCategories/${params.userid}`).then((res) => res.data.categories),
  });

  const [addCategory, setAddCategory] = useState(false);
  const [addCategoryValue, setAddCategoryValue] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      selectCategory: "",
      addCategory: "",
    },
  });

  // add new category
  const mutation = useMutation({
    mutationFn: (newCategory: { name: string, userId:string }) => {
      return axios.post("/api/addCategory", newCategory);
    },
    onSuccess: () => {
      toast.success("Category added successfully");
      setAddCategoryValue("")
      form.setValue("addCategory", "");
      queryClient.invalidateQueries({ queryKey: ["categoryData"] });
    },
    onError: (error:any) => {
      if (
        error.response.data
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  // add new expense
  const addExpense = useMutation({
    mutationFn: (newExpense: { amount: string; category: string, userId:string }) => {
      return axios.post("/api/addExpense", newExpense);
    },
    onSuccess: () => {
      toast.success("Expense added successfully");
      setCategory("");
      setAmount("")
      form.reset(); 
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    addExpense.mutate({ amount, category, userId:params.userid });
  }

  const handleAddCategory = () => {
    if (addCategoryValue) {
      mutation.mutate({ name: addCategoryValue, userId:params.userid });
    }
    setAddCategory(false);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* amount input */}
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
                    onChange={(e) => {
                      setAmount(e.target.value);
                      field.onChange(e);
                    }}
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
                        onValueChange={(value) => {
                          field.onChange(value);
                          setCategory(value);
                        }}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-[180px] focus:!ring-transparent">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {/* {error && (
                            <p className="text-sm p-2">Error occured</p>
                          )} */}
                          {isPending && (
                            <p className="text-sm p-2">Fetching...</p>
                          )}

                          {categories?.map(
                            (category: { name: string; id: string }) => (
                              <SelectItem
                                key={category.id}
                                value={category.name}
                                className="cursor-pointer"
                              >
                                {category.name}
                              </SelectItem>
                            )
                          )}

                          {!isPending && !categories && (
                            <p className="text-sm p-2">No categories</p>
                          )}
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
                          onClick={handleAddCategory}
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
                      <Input
                        placeholder="Add new category"
                        {...field}
                        className="focus:!ring-transparent"
                        onChange={(e) => {
                          setAddCategoryValue(e.target.value);
                          field.onChange(e);
                        }}
                      />
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
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "text-sm",
        }}
      />
    </div>
  );
};

export default Expense;
