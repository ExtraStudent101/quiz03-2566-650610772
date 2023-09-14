import { DB, originalDB, readDB, writeDB } from "@/app/libs/DB";
import { checkToken } from "@/app/libs/checkToken";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import { headers } from "../../../../next.config";

export const GET = async () => {
  readDB();
  return NextResponse.json({
    ok: true,
    rooms: originalDB.rooms,
    totalRooms: originalDB.rooms.length,
  });
};

export const POST = async (request) => {
  const payload = checkToken();
  if (payload !== "ADMIN" || payload !== "SUPER_ADMIN")
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },

      { status: 401 }
    );

  readDB();
  const roomName = headers().get("roomName");
  const foundRoom = originalDB.rooms.find((x) => x.roomName === roomName);
  if (roomName === foundRoom)
    return NextResponse.json(
      {
        ok: false,
        message: `Room ${roomName} already exists`,
      },
      { status: 400 }
    );

  const roomId = nanoid();

  //call writeDB after modifying Database
  writeDB();

  return NextResponse.json({
    ok: true,
    roomId,
    message: `Room ${roomName} has been created`,
  });
};
