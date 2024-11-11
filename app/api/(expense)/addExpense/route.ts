import { connect } from "@/src/dbConfig/dbConfig";
import Expense from "@/src/models/expenseModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const { amount, category, userId } = await request.json();

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "User ID is required",
      });
    }
    
    const newExpense = new Expense({ amount, category, userId });
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
