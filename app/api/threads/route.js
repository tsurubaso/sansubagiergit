//no use of node fetch I am in next


import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { content = "" } = await req.json();
    const text = content.trim();

    if (!text) {
      return NextResponse.json(
        { success: false, error: "Content is required" },
        { status: 400 }
      );
    }

    // Utilise ton token & user id (⚠️ ne jamais exposer côté client)
    const token = process.env.THREADS_ACCESS_TOKEN;
    const userId = process.env.THREADS_USER_ID || "me"; // "me" fonctionne si le token correspond à ton compte

    const url = new URL(`https://graph.threads.net/v1.0/${userId}/threads`);
    url.searchParams.set("media_type", "TEXT"); // ✅ string!
    url.searchParams.set("text", text);
    url.searchParams.set("access_token", token);
    url.searchParams.set("auto_publish_text", "true"); // optional: publish in one call

    const res = await fetch(url.toString(), { method: "POST" });
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
