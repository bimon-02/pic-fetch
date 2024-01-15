import auth from "@/app/config/firebase";
import { hashPassword } from "@/app/utils/hash-password";
import { loginSchema } from "@/models/LoginSchema";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";
import { createUserUsingEmailAndPassword } from "../sign-up/_lib/create-user-with-email-and-password";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const isValidData = loginSchema.safeParse(body);
    if (!isValidData.success) {
      console.log(isValidData.error.issues[0].message);
      return NextResponse.json({
        status: 401,
        message: isValidData.error.issues[0].message,
      });
    }
    const data = isValidData.data;
    const user = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    return NextResponse.json({
      status: 200,
      message: "Login Success",
      data: user.user.toJSON(),
    }); 
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: error.message,
      error: error,
    });
  }
}
