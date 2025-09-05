"use client";
import { useState, useEffect } from "react";

export default function SecretEditor({ params }) {
  const { link, secret } = params;
  const SECRET_KEY = "x7k9b2a1"; // change to your own secret

  // Check secret
  if (secret !== SECRET_KEY) return <p style={{ padding: "2rem", color: "red" }}>Unauthorized ❌</p>;

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
        // Remove front matter if present
        text = text.replace(/^---[\s\S]+?---\s*/, "");
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
      <h1>Editing: {link}</h1>
      <textarea
        style={{
          width: "100%",
          height: "400px",
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
          backgroundColor: "#0070f3",
          color: "white",
          borderRadius: "4px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Send as Email
      </button>
    </div>
  );
}
