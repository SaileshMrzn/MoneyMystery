import { connect } from "@/src/dbConfig/dbConfig";
import Category from "@/src/models/categoryModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const { name, userId } = await request.json();

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "User ID is required",
      });
    }

    const categoryAlredyExists = await Category.findOne({ name, userId });

    if (categoryAlredyExists) {
      return NextResponse.json(
        { error: "Category already exists" },
        { status: 400 }
      );
    }

    const newCategory = new Category({ name, userId });
    await newCategory.save();

    return NextResponse.json({
      success: true,
      message: "Category added",
      newCategory,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" });
    }
  }
}
