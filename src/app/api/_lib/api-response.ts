import { NextResponse } from "next/server";
type APIResponseType = {
  status: number;
  message: string;
  error?: any;
  data?: any;
};
export const APIRESPONSE = ({
  error,
  message,
  status,
  data,
}: APIResponseType) => {
  return NextResponse.json({
    status: status,
    message: message,
    error: error,
    data: data,
  });
};
