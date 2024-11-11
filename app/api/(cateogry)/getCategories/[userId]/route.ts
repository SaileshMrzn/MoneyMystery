import { connect } from "@/src/dbConfig/dbConfig";
import Category from "@/src/models/categoryModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

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

    const categories = await Category.find({ userId });

    if (categories.length === 0) {
      return NextResponse.json(
        { success: false, message: "No categories found for this user" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Categories fetched",
        categories,
      },
      { status: 200 }
    );
  } catch (error) {
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
