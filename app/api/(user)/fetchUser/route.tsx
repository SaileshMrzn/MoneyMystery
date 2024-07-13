import { connect } from "@/src/dbConfig/dbConfig";
import User from "@/src/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;
    const user = await User.findOne({email});
    
        if (!user) {
          return NextResponse.json(
            { message: "User not found" },
            { status: 404 }
          );
        }
    return NextResponse.json({ message: "User found", user });
  } catch (error:any) {
    return NextResponse.json({ error: error.message }, {status: 500});
  }
}
