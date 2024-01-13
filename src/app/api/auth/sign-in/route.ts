import { loginSchema } from "@/models/LoginSchema";
import { NextRequest, NextResponse } from "next/server";
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
    // return NextResponse.json({
    //   status: 200,
    //   message: "Login Success",
    //   data: "token",
    // });
  } catch (error: any) {
    console.log(error);
    // return NextResponse.json({
    //   status: "error",
    //   message: error.message,
    // });
  }
}
