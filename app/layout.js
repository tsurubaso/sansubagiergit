
import "./globals.css";


export const metadata = {
  title: "SanSuBagier",
  description: "Why a book when you can App",
};

export default function RootLayout({ children }) {
  return (
        <html lang="fr">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        
        <meta name="tsurubaso" content="Imagier" />
        <meta metadata/>
      </head>
      <body
        className={`bg-gray-100 text-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}
