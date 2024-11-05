import { connect } from "@/src/dbConfig/dbConfig";
import Expense from "@/src/models/expenseModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const { amount, category } = await request.json();

    const newExpense = new Expense({ amount, category });
    await newExpense.save();

    return NextResponse.json({
      success: true,
      message: "Expense added",
      newExpense,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" });
    }
  }
}
