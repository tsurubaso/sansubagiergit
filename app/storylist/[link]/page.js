"use client";

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import SideNav from "../../../components/Sidebar"; // your side nav component

export default function BookPage({ params }) {
  const { link } = React.use(params);
  const [fileContent, setFileContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFileContent = async () => {
      try {
        const res = await fetch(`/books/${link}.md`);
        if (!res.ok) {
          throw new Error(`Failed to fetch the book: ${params.title}`);
        }

        let content = await res.text();
        // Strip front matter if present
        content = content.replace(/^---[\s\S]+?---\s*/, "");

        setFileContent(content);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFileContent();
  }, [link]);

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
