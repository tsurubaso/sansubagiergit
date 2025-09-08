"use client";
import { useState } from "react";

export default function SecretEditor() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("");

  const handlePost = async () => {
    setStatus("⏳ Posting...");

    try {
      const res = await fetch("/api/threads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setStatus("✅ Post successful!");
      } else {
        setStatus("❌ Error: " + (result.error || "Unknown error"));
      }
    } catch (err) {
      setStatus("❌ Network error: " + err.message);
    }
  };

  return (
    <div>
      <textarea
        className="w-full h-40 p-2 border rounded"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your Threads post..."
      />
      <button
        onClick={handlePost}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Post to Threads
      </button>
      <p className="mt-2">{status}</p>
    </div>
  );
}
