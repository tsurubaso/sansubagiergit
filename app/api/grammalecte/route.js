import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { text } = await req.json();

    const response = await fetch("https://tsurubaso.pythonanywhere.com/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}