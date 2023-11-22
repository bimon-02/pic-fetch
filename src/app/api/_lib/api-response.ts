import { NextResponse } from "next/server";
type APIResponseType = {
  message: string;
  status: number;
  data?: any;
  error?: any;
  token?: any;
  code?: string;
};
export const APIRES = ({
  message,
  status,
  data,
  error,
  code,
}: APIResponseType) => {
  return NextResponse.json({
    message: message,
    status: status,
    data: data,
    code: code,
    error: error,
  });
};
