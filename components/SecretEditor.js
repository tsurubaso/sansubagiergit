"use client";
import { useState, useEffect } from "react";

export default function SecretEditor({ link, secret }) {
  const SECRET_KEY = process.env.NEXT_PUBLIC_EDITOR_SECRET;

  // Vérifie le secret
  if (secret !== SECRET_KEY) {
    return <p style={{ padding: "2rem", color: "red" }}>Unauthorized </p>;
  }

  const [content, setContent] = useState("");
  const [status, setStatus] = useState("");

  // Charge le Markdown depuis public/books
  useEffect(() => {
    const fetchMD = async () => {
      try {
        const res = await fetch(`/books/${link}.md`);
        if (!res.ok) throw new Error("Failed to fetch the file");

        let text = await res.text();
        // garde le front matter pour pouvoir modifier les tags
        setContent(text);
      } catch (err) {
        setStatus(err.message);
      }
    };

    fetchMD();
  }, [link]);

  // Envoi par mail
  const sendMail = async () => {
    try {
      const res = await fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (res.ok) setStatus("Mail sent ");
      else {
        const data = await res.json();
        setStatus("Error : " + (data.error || "unknown"));
      }
    } catch (err) {
      setStatus("Error : " + err.message);
    }
  };

    // Efface le status après 30 secondes
  useEffect(() => {
    if (!status) return; // rien à faire si vide
    const timer = setTimeout(() => setStatus(null), 30_000); // 30s
    return () => clearTimeout(timer); // cleanup si status change avant la fin
  }, [status]);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Editing: {link}</h1>
      <textarea
        lang="fr"
        spellCheck={true}
        //spellCheck={false} // désactive la correction orthographique
        style={{
          width: "100%",
          height: "800px",
          //height: "calc(100vh - 200px)", // occupe la page mais ne déborde pas
          fontFamily: "monospace",
          padding: "0.5rem",
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
          backgroundColor: "transparent",
          color: "transparent",
          border: "none",
          cursor: "default", // pas de main au hover
        }}
      >
        .
      </button>
        <p
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "transparent", // invisible
          color: "transparent", // text hidden
          border: "none",
          cursor: "default",
        }}
      >
        {status}
      </p>
    </div>
  );
}
