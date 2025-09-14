import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const word = searchParams.get("word");

  if (!word) {
    return NextResponse.json({ error: "No word provided" }, { status: 400 });
  }

  // Example with free dictionary API
  const frdicokey = process.env.FRDICOKEY;

  const res = await fetch(
    `https://api.dicolink.com/v1/mot/${word}/definitions?limite=200&api_key=${frdicokey}`
  );

  // other dico const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
  const data = await res.json();

  return NextResponse.json(data);
}
