import { WORDS } from "@/lib/constants";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const query = new URL(request.url).searchParams.get('query') || '';
    const words = findWordsThatStartWithString(query);
    return NextResponse.json(words.slice(0, 10), { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

function findWordsThatStartWithString(query: string) {
  return WORDS.filter((word) => word !== query && word.startsWith(query));
}