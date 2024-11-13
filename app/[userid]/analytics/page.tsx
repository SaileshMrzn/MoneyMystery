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
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

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

interface GroupedExpenses {
  [yearMonth: string]: Expense[];
}

const chartConfig = {
  amount: {
    label: "Amount",
  },
  Personal: {
    label: "Personal",
    color: "#ede21c",
  },
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
  const [currentMonth, setCurrentMonth] = useState<string>(""); // Current year-month
  const [groupedExpenses, setGroupedExpenses] = useState<GroupedExpenses>({}); // All grouped expenses

  const {
    data: expenses,
    error,
    isLoading,
  } = useQuery<Expense[]>({
    queryKey: ["expensesData"],
    queryFn: () =>
      axios
        .get(`/api/getExpenses/${params.userid}`)
        .then((res) => res.data.expenses),
  });

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Group expenses by year and month
  useEffect(() => {
    if (expenses && expenses.length > 0) {
      const grouped: GroupedExpenses = expenses.reduce((acc, expense) => {
        const yearMonth = new Date(expense.createdAt).toISOString().slice(0, 7); // YYYY-MM format
        if (!acc[yearMonth]) acc[yearMonth] = [];
        acc[yearMonth].push(expense);
        return acc;
      }, {} as GroupedExpenses);

      setGroupedExpenses(grouped);

      // Set current month as default
      const currentDate = new Date().toISOString().slice(0, 7);
      setCurrentMonth(currentDate);
    }
  }, [expenses]);

  // Update chart data when current month changes
  useEffect(() => {
    if (currentMonth && groupedExpenses[currentMonth]) {
      const grouped = groupedExpenses[currentMonth].reduce<
        Record<string, ChartDataItem>
      >((acc, expense) => {
        const category = expense.category;
        const amount = parseFloat(expense.amount);

        if (acc[category]) {
          acc[category].amount += amount;
        } else {
          acc[category] = {
            category,
            amount,
            fill: getRandomColor(),
          };
        }

        return acc;
      }, {});

      // Convert grouped object to array
      setChartData(Object.values(grouped));
    }
  }, [currentMonth, groupedExpenses]);

  const totalExpense: number = chartData.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );

  // Handlers for navigation
  const handlePreviousMonth = () => {
    if (!currentMonth) return;
    const date = new Date(currentMonth + "-01");
    date.setMonth(date.getMonth() - 1);
    const prevMonth = date.toISOString().slice(0, 7);

    // Check if data exists for the previous month
    if (groupedExpenses[prevMonth]) {
      setCurrentMonth(prevMonth);
    }
  };

  const handleNextMonth = () => {
    if (!currentMonth) return;
    const date = new Date(currentMonth + "-01");
    date.setMonth(date.getMonth() + 1);
    const nextMonth = date.toISOString().slice(0, 7);

    // Check if data exists for the next month
    if (groupedExpenses[nextMonth]) {
      setCurrentMonth(nextMonth);
    }
  };

  // Check if the previous and next buttons should be disabled
  const isPreviousDisabled =
    !groupedExpenses[currentMonth] ||
    !groupedExpenses[
      new Date(
        new Date(currentMonth + "-01").setMonth(
          new Date(currentMonth + "-01").getMonth() - 1
        )
      )
        .toISOString()
        .slice(0, 7)
    ];
  const isNextDisabled =
    !groupedExpenses[currentMonth] ||
    !groupedExpenses[
      new Date(
        new Date(currentMonth + "-01").setMonth(
          new Date(currentMonth + "-01").getMonth() + 1
        )
      )
        .toISOString()
        .slice(0, 7)
    ];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading expenses</div>;

  return (
    <Card className="flex flex-col w-[75vw]">
      <CardHeader className="items-center pb-0">
        <div className="flex justify-between items-center mb-4 w-full">
          <button
            onClick={handlePreviousMonth}
            className="btn"
            disabled={isPreviousDisabled}
          >
            <MdKeyboardArrowLeft
              size={25}
              color={`${isPreviousDisabled ? "gray" : "black"}`}
            />
          </button>
          <div className="flex flex-col justify-center items-center gap-4">
            <CardTitle>Expense Chart - {currentMonth}</CardTitle>
          </div>
          <button
            onClick={handleNextMonth}
            className="btn"
            disabled={isNextDisabled}
          >
            <MdKeyboardArrowRight
              size={25}
              color={`${isNextDisabled ? "gray" : "black"}`}
            />
          </button>
        </div>
      </CardHeader>
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
