import { connect } from "@/src/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Expense from "@/src/models/expenseModel";
import mongoose from "mongoose";

connect();

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { error: "Invalid user ID format" },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const expenses = await Expense.find({ userId });

    if (expenses.length === 0) {
      return NextResponse.json(
        { success: false, message: "No expenses found for this user" },
        { status: 404 }
      );
    }

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
