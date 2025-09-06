"use client";
import SearchBar from "@/components/SearchBar";
import { useEffect, useState } from "react";
import Link from "next/link";

const StoriesList = () => {
  const [stories, setStories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await fetch("/stories.json");
        const data = await res.json();
        setStories(data.filter((story) => story.status === "draft"));
      } catch (error) {
        console.error("Erreur lors du chargement des stories :", error);
      }
    };

    fetchStories();
  }, []);

  // Filter stories based on the search query
  const filteredStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="py-12 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2 tracking-tight">
            LunaTech Library
          </h1>
          <p className="opacity-80 max-w-xl mx-auto">Drafts of stories</p>

          {/* Pass search query setter to the SearchBar */}
          <SearchBar
            placeholder="Rechercher une story..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {filteredStories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredStories.map((story) => (
              <Link key={story.id} href={`/draftlist/${story.link}`} passHref>
                <div
                  className="rounded-2xl p-5 border transition-transform cursor-pointer
                    hover:-translate-y-1 shadow-lg hover:shadow-xl"
                  style={{
                    backgroundColor: "var(--card-background)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  <h3 className="text-xl font-semibold">{story.title}</h3>
                  <p className="mt-2 opacity-80 line-clamp-3">
                    {story.description}
                  </p>
                  <p className="text-sm mt-4 italic opacity-60">{story.type}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 mt-12">
            Aucune story trouvée.
          </p>
        )}
      </div>
    </div>
  );
};

export default StoriesList;
