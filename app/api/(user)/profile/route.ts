import { connect } from "@/src/dbConfig/dbConfig";
import User from "@/src/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { dataFromToken } from "@/src/helpers/dataFromToken";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = dataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");

    if (!user) {
      NextResponse.json({ message: "No user found" }, { status: 400 });
    }

    return NextResponse.json({
      message: "User found",
      success: true,
      data: user,
    });
  } catch (error: any) {
    NextResponse.json({ error: error.message }, { status: 500 });
  }
}
