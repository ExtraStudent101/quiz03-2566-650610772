import jwt from "jsonwebtoken";

import { DB, originalDB, readDB } from "@/app/libs/DB";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  readDB();
  const body = await request.json();
  const foundUser = originalDB.users.find((x) => x.username === body.username);
  const foundPass = originalDB.users.find((x) => x.password === body.password);
  if (foundUser === null && foundPass === null)
    return NextResponse.json(
      {
        ok: false,
        message: "Username or Password is incorrect",
      },
      { status: 400 }
    );

  const token = "Replace this with token creation";

  return NextResponse.json({ ok: true, token });
};
