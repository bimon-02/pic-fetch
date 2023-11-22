import { NextRequest, NextResponse } from "next/server";
import { APIRESPONSE } from "../_lib/api-response";

export async function POST(request: NextRequest) {
  try {
    throw new Error("This is a test error");
  } catch (error: any) {
    return APIRESPONSE({
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
