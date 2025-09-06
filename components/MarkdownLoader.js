"use client";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

/**
 * MarkdownLoader
 * Props:
 *   - link : nom du fichier markdown (sans extension)
 *   - editable (optionnel) : si true, montre un textarea au lieu du rendu
 *   - onChange (optionnel) : callback quand le texte change (utile si editable)
 */
export default function MarkdownLoader({ link, editable = false, onChange }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMD = async () => {
      try {
        const res = await fetch(`/books/${link}.md`);
        if (!res.ok) throw new Error("Failed to fetch the file");

        let text = await res.text();
        // Optionnel : garder ou supprimer front matter
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

  if (loading) return <p>Loading…</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // Mode lecture
  if (!editable) {
    return (
      <div className="markdown-content">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#1e1e1e] text-gray-100">
      {/* Side Navigation */}
      <SideNav />

      {/* Main Content */}
      <main className="flex-1 p-2 bg-[#2a2a2a]">
        {loading && (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-300" />
            <p className="mt-4 text-gray-400">Loading your story...</p>
          </div>
        )}

        {error && (
          <div className="text-center text-red-400">
            <h1 className="text-2xl font-bold mb-2">Story not found</h1>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          
            <div className="p-8">
              <div className="markdown-content">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                  {fileContent}
                </ReactMarkdown>
              </div>
            </div>
          
        )}
      </main>
    </div>
  );
}