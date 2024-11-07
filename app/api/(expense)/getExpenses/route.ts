import { connect } from "@/src/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import Expense from "@/src/models/expenseModel";

connect();

export async function GET() {
  try {
    const expenses = await Expense.find();
    console.log("expense fetched")
    return NextResponse.json(
      {
        success: true,
        message: "Expenses fetched",
        expenses,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching expenses:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred while fetching categories" },
        { status: 500 }
      );
    }
  }
}
