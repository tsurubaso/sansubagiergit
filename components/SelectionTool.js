import { useState } from "react";

export default function SelectionTool() {
  const [selection, setSelection] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Capture la sélection de texte dans la page
  function handleMouseUp() {
    const text = window.getSelection().toString().trim();
    setSelection(text);
    setResult(null); // Réinitialise le résultat
  }

  // Envoie le texte sélectionné à LanguageTool via le backend Next.js
  async function handleCorrection() {
    if (!selection) return;
    setLoading(true);
    setResult(null);
    const res = await fetch("/api/languagetool", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: selection, language: "fr" }),
    });
    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <div onMouseUp={handleMouseUp}>
      <p>
        Sélectionne une partie de ce texte avec ta souris.<br/>
      </p>
      <p>
        Exemple : <br/>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dictum.
      </p>
      {selection && (
        <div style={{ marginTop: 20 }}>
          <strong>Texte sélectionné :</strong>
          <blockquote>{selection}</blockquote>
          <button onClick={handleCorrection} disabled={loading}>
            {loading ? "Correction en cours..." : "Corriger avec LanguageTool"}
          </button>
        </div>
      )}
      {result && (
        <div style={{ marginTop: 20 }}>
          <strong>Résultat LanguageTool&nbsp;:</strong>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}