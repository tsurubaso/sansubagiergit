"use client";
import { useState, useEffect } from "react";

export default function MarkdownEditor() {
  const [content, setContent] = useState("");

  // charge un texte par défaut au démarrage (optionnel)
  useEffect(() => {
    setContent("# Hello\nÉditez ce Markdown !");
  }, []);

  const sendMail = async () => {
    const res = await fetch("/api/sendMail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (res.ok) alert("Mail envoyé ✅");
    else {
      const data = await res.json();
      alert("Erreur ❌ : " + (data.error || "inconnue"));
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <textarea
        style={{
          width: "100%",
          height: "320px",
          padding: "0.5rem",
          fontFamily: "monospace",
          border: "1px solid #ccc",
        }}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={sendMail}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#0070f3",
          color: "white",
          borderRadius: "4px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Envoyer par email
      </button>
    </div>
  );
}
