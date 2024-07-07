import { connect } from "@/src/dbConfig/dbConfig";
import User from "@/src/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "No user found" }, { status: 400 });
    }

    const credentials = await bcrypt.compare(email, user.password);

    if (!credentials) {
      return NextResponse.json(
        { message: "Credentials do not match" },
        { status: 400 }
      );
    }

    const tokenData = {
      id: user._id,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_KEY!, {
      expiresIn: "4hr",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
