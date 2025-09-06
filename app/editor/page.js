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

Au Lecteur

La sottise, l'erreur, le péché, la lésine,
Occupent nos esprits et travaillent nos corps,
Et nous alimentons nos aimables remords,
Comme les mendiants nourrissent leur vermine.

Nos péchés sont têtus, nos repentirs sont lâches;
Nous nous faisons payer grassement nos aveux,
Et nous rentrons gaiement dans le chemin bourbeux,
Croyant par de vils pleurs laver toutes nos taches.

Sur l'oreiller du mal c'est Satan Trismégiste
Qui berce longuement notre esprit enchanté,
Et le riche métal de notre volonté
Est tout vaporisé par ce savant chimiste.

C'est le Diable qui tient les fils qui nous remuent!
Aux objets répugnants nous trouvons des appas;
Chaque jour vers l'Enfer nous descendons d'un pas,
Sans horreur, à travers des ténèbres qui puent.

Ainsi qu'un débauché pauvre qui baise et mange
Le sein martyrisé d'une antique catin,
Nous volons au passage un plaisir clandestin
Que nous pressons bien fort comme une vieille orange.

Serré, fourmillant, comme un million d'helminthes,
Dans nos cerveaux ribote un peuple de Démons,
Et, quand nous respirons, la Mort dans nos poumons
Descend, fleuve invisible, avec de sourdes plaintes.

Si le viol, le poison, le poignard, l'incendie,
N'ont pas encor brodé de leurs plaisants dessins
Le canevas banal de nos piteux destins,
C'est que notre âme, hélas! n'est pas assez hardie.

Mais parmi les chacals, les panthères, les lices,
Les singes, les scorpions, les vautours, les serpents,
Les monstres glapissants, hurlants, grognants, rampants,
Dans la ménagerie infâme de nos vices,

II en est un plus laid, plus méchant, plus immonde!
Quoiqu'il ne pousse ni grands gestes ni grands cris,
Il ferait volontiers de la terre un débris
Et dans un bâillement avalerait le monde;

C'est l'Ennui! L'oeil chargé d'un pleur involontaire,
II rêve d'échafauds en fumant son houka.
Tu le connais, lecteur, ce monstre délicat,
— Hypocrite lecteur, — mon semblable, — mon frère!

— Charles Baudelaire`);
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
