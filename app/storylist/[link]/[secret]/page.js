"use client";
import { use, useState, useEffect } from "react";

export default function SecretEditor({ params }) {

  
  const { link, secret } = use(params);

  // Secret depuis .env
  const SECRET_KEY = process.env.NEXT_PUBLIC_EDITOR_SECRET;

  // Check secret
  if (secret !== SECRET_KEY) {
    return <p style={{ padding: "2rem", color: "red" }}>Unauthorized ❌</p>;
  }

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load .md from public/books
  useEffect(() => {
    const fetchMD = async () => {
      try {
        const res = await fetch(`/books/${link}.md`);
        if (!res.ok) throw new Error("Failed to fetch the file");

        let text = await res.text();
        setContent(text);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMD();
  }, [link]);

  // Send email
  const sendMail = async () => {
    try {
      const res = await fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (res.ok) alert("Mail sent ✅");
      else {
        const data = await res.json();
        alert("Error ❌: " + (data.error || "unknown"));
      }
    } catch (err) {
      alert("Error ❌: " + err.message);
    }
  };

  if (loading) return <p style={{ padding: "2rem" }}>Loading…</p>;
  if (error) return <p style={{ padding: "2rem", color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Now reading: {link}</h1>
      <textarea
        style={{
          width: "100%",
          height: "800px",
          boxSizing: "border-box",
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
          backgroundColor: "transparent", // transparent
          color: "transparent", // texte invisible
          border: "none",
          cursor: "default",
        }}
      >
        .
      </button>
    </div>
  );
}
