// app/api/synonyms/route.js

import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const word = searchParams.get("word");
    const frdicokey = process.env.FRDICOKEY;

    if (!word) {
      return NextResponse.json({ error: "No word provided" }, { status: 400 });
    }

    const res = await fetch(
      `https://api.dicolink.com/v1/mot/${encodeURIComponent(
        word
      )}/synonymes?limite=200&api_key=${frdicokey}`
    );

        if (!res.ok) {
      return NextResponse.json(
        { error: "Erreur Dicolink" },
        { status: response.status }
      );
    }
    const data = await res.json();
    // ⚠️ Ici pas de "definition", juste mot + URL
    const formatted = data.map((entry) => ({
      mot: entry.mot,
      dicolinkUrl: entry.dicolinkUrl,
    }));

    return NextResponse.json(formatted);


  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
