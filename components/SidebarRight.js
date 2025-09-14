"use client";

import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [word, setWord] = useState("");
  const [result, setResult] = useState(null);

  const searchWord = async () => {
    if (!word.trim()) return;
    try {
      const res = await fetch(`/api/dictionary?word=${word}`);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Error fetching dictionary:", err);
      setResult(null);
    }
  };

  return (
    <>
      {/* Bouton menu flottant (☰) quand la sidebar est fermée */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed top-4 right-4 z-50 p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
        >
          ☰
        </button>
      )}

      {/* Sidebar */}
      <nav
        className={`h-screen fixed top-0 right-0 p-6 bg-black text-white transition-all duration-300
          ${open ? "w-64" : "w-0 overflow-hidden"}
        `}
        style={{
          borderRight: open ? "1px solid #444" : "none",
        }}
      >
        {open && (
          <>
            {/* Bouton de fermeture ✖ au-dessus du titre */}
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-white text-lg p-1"
                aria-label="Close sidebar"
              >
                ✖
              </button>
            </div>

            {/* Titre */}
            <div className="mb-4">
              <h2 className="text-xl font-bold">📖 Dictionnaire</h2>
            </div>

            {/* Formulaire de recherche */}
            <div className="p-2 w-full">
              <input
                type="text"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="Tapez un mot"
                className="border border-gray-600 bg-black text-white p-2 w-full rounded"
              />
              <button
                onClick={searchWord}
                className="mt-2 p-2 bg-blue-500 text-white rounded w-full hover:bg-blue-600"
              >
                Rechercher
              </button>
            </div>

            {/* Résultats */}
            <div className="mt-4 overflow-y-auto max-h-[70vh]">
              {result && (
                <>
                  {Array.isArray(result) ? (
                    result.map((entry, idx) => (
                      <div
                        key={idx}
                        className="mb-4 border-b border-gray-700 pb-2"
                      >
                        {/* Mot */}
                        <h3 className="font-bold text-lg">{entry.mot}</h3>

                        {/* Nature grammaticale */}
                        {entry.nature && (
                          <p className="italic text-gray-300">{entry.nature}</p>
                        )}

                        {/* Définition */}
                        <p className="text-sm mt-1">{entry.definition}</p>

                        {/* Attribution / Source */}
                        <div className="mt-1 text-xs text-gray-400">
                          <span>Source: </span>
                          <a
                            href={entry.attributionUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-blue-400"
                          >
                            {entry.source}
                          </a>
                        </div>

                        {/* Lien Dicolink */}
                        <a
                          href={entry.dicolinkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-400 underline hover:text-blue-300"
                        >
                          Voir plus
                        </a>
                      </div>
                    ))
                  ) : (
                    <p>Aucun résultat trouvé</p>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </nav>
    </>
  );
}
