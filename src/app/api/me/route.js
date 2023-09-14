import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    ok: true,
    fullName: "Theerapat Lumtan",
    studentId: "650610772",
  });
};
