import { NextRequest } from "next/server";
import { APIRES } from "../_lib";

export async function POST(request: NextRequest) {
  try {
    throw new Error("This is a test error");
  } catch (error: any) {
    return APIRES({
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
