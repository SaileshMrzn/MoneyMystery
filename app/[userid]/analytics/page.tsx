"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/src/components/ui/chart";

// Define the type for an expense
interface Expense {
  _id: string;
  amount: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

// Define the type for chart data
interface ChartDataItem {
  category: string;
  amount: number;
  fill: string;
}

const chartConfig = {
  amount: {
    label: "Amount",
  },
  // Personal: {
  //   label: "personal",
  //   color: "#ede21c",
  // },
  // safari: {
  //   label: "Safari",
  //   color: "#ede21c",
  // },
  // firefox: {
  //   label: "Firefox",
  //   color: "hsl(var(--chart-3))",
  // },
  // edge: {
  //   label: "Edge",
  //   color: "hsl(var(--chart-4))",
  // },
  // other: {
  //   label: "Other",
  //   color: "hsl(var(--chart-5))",
  // },
} satisfies ChartConfig;

const Analytics = ({ params }: { params: { userid: string } }) => {
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);

  const {
    data: expenses,
    error,
    isLoading,
  } = useQuery<Expense[]>({
    queryKey: ["expensesData"],
    queryFn: () =>
      axios.get(`/api/getExpenses/${params.userid}`).then((res) => res.data.expenses),
  });

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

useEffect(() => {
  if (expenses && expenses.length > 0) {
    const groupedExpenses = expenses.reduce<Record<string, ChartDataItem>>(
      (acc, expense) => {
        const category = expense.category;
        const amount = parseFloat(expense.amount);
        

        if (acc[category]) {
          // Add to existing category's amount
          acc[category].amount += amount;
        } else {
          // Create a new entry for the category
          acc[category] = {
            category,
            amount,
            fill: getRandomColor(),
          };
        }

        return acc;
      },
      {} // Initial value of the accumulator
    );
    
    console.log(groupedExpenses)

    // Convert the grouped object back to an array
    const newExpenses: ChartDataItem[] = Object.values(groupedExpenses);

    setChartData(newExpenses);
  }
}, [expenses]);


  const totalExpense: number = chartData.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading expenses</div>;

  return (
    <Card className="flex flex-col">
      {/* <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Donut with Text</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader> */}
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalExpense}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Expense
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
};



export default Analytics;
