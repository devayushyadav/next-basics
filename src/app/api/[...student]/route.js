import { NextResponse } from "next/server";

export const GET = async (request, content) => {
    console.log(content)
    return NextResponse(JSON.stringify(content));
  };
  