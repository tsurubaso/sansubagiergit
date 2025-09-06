"use client";
import { useState, useEffect } from "react";

export default function MarkdownEditor() {
  const [content, setContent] = useState("");
  const [canSend, setCanSend] = useState(false);

  useEffect(() => {
    // vérifie si l’URL contient le secret
    const params = new URLSearchParams(window.location.search);
    if (params.get("secret") === process.env.NEXT_PUBLIC_EDITOR_SECRET) {
      setCanSend(true);
    }

    // texte par défaut
   setContent(`
#La géante

Du temps que la Nature en sa verve puissante
Concevait chaque jour des enfants monstrueux,
J'eusse aimé vivre auprès d'une jeune géante,
Comme aux pieds d'une reine un chat voluptueux.

J'eusse aimé voir son corps fleurir avec son âme
Et grandit librement dans ses terribles jeux ;
Deviner si son cœur couve une sombre flamme
Aux humides brouillards qui nagent dans ses yeux ;

Parcourir à loisir ses magnifiques formes ;
Ramper sur le versant de ses genoux énormes,
Et parfois en été, quand les soleils malsains,

Lasse, la font s'étendre à travers la campagne,
Dormir nonchalamment à l'ombre de ses seins,
Comme un hameau paisible au pied d'une montagne.

Charles Baudelaire`);
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
      {canSend && (
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
      )}
    </div>
  );
}
