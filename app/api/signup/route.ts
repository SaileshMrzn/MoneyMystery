import { connect } from "@/src/dbConfig/dbConfig";
import User from "@/src/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/src/helpers/mailer";
import bcrypt from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedNewUser = await newUser.save();
    console.log(savedNewUser.email);
    console.log(email);

    //send verification email
    await sendEmail({ email, emailType: "verify", userId: savedNewUser._id });

    return NextResponse.json({
      message: "User registered successfully",
      success: true,
      savedNewUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
