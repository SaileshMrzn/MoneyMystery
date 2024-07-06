import nodemailer from "nodemailer";
import User from "../models/userModel";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    const mailHtml =
      emailType === "verify"
        ? `<p>Click <a href="localhost:3000/verifyemail?token=${hashedToken}"> here</a>  to verify your email`
        : `<p>Click <a href="localhost:3000/forgotPassword?token=${hashedToken}"> here</a> to reset your password`;

    if (emailType === "verify") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 4 * 60 * 60 * 1000,
      });
    } else if (emailType === "reset") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 4 * 60 * 60 * 1000,
      });
    }

    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "fe47078a7e53a9",
        pass: "90b741e38dec79",
      },
    });

    const mailOptions = {
      from: "shailesh.mrzn@gmail.com",
      to: email,
      subject:
        emailType === "verify" ? "Verify your email" : "Reset your password",
      html: mailHtml,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
