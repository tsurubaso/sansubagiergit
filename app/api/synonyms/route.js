// app/api/synonyms/route.js

import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const word = searchParams.get("word");

  // dictionary
  if (!word) {
    return NextResponse.json({ error: "No word provided" }, { status: 400 });
  }

  const frdicokey = process.env.FRDICOKEY;
  try {
    
    const res = await fetch(
      `https://api.dicolink.com/v1/mot/${encodeURIComponent(
        word
      )}/synonymes?limite=200&api_key=${frdicokey}`
    );
    const data = await res.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
