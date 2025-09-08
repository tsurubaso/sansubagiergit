import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { success: false, error: "Message is required" },
        { status: 400 }
      );
    }

    // Utilise ton token & user id (⚠️ ne jamais exposer côté client)
    const token = process.env.THREADS_ACCESS_TOKEN;
    const userId = process.env.THREADS_USER_ID || "me"; // "me" fonctionne si le token correspond à ton compte

    const url = `https://graph.threads.net/v1.0/${userId}/threads`;

    const payload = {
      text: message,
      access_token: token,
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { success: false, error: data.error?.message || "Unknown error" },
        { status: res.status }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("❌ Error posting to Threads:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
