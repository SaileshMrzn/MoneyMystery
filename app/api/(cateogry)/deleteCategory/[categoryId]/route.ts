import { connect } from "@/src/dbConfig/dbConfig";
import Category from "@/src/models/categoryModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function DELETE(
  request: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  const { categoryId } = params;
  console.log(categoryId);
  try {
    const deleteCategory = await Category.findByIdAndDelete(categoryId);
    if (!deleteCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Category deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unknown error occured" },
      { status: 500 }
    );
  }
}
