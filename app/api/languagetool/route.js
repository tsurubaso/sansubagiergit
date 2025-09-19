import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log("📩 Requête reçue côté serveur");

    // Parse incoming JSON
    const { text } = await req.json();
    if (!text) throw new Error("No text provided in request body.");
    console.log("➡️ Texte reçu:", text);

    // Prepare params
    const params = new URLSearchParams();
    params.append("language", "fr");
    params.append("text", text);

    // Call LanguageTool
    console.log("🌐 Envoi vers LanguageTool API...");
    const response = await fetch("https://api.languagetool.org/v2/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`LanguageTool API error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log("✅ Réponse reçue de LanguageTool:", data);

    // Optionally simulate delay
    // await new Promise((res) => setTimeout(res, 5000));

    return NextResponse.json({
      status: "ok",
      steps: [
        "Requête reçue",
        "Texte extrait",
        "Envoi API",
        "Réponse reçue",
        // "Attente 5s",
        "JSON prêt",
      ],
      data,
    });
  } catch (err) {
    console.error("❌ API Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}