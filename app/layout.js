// layout.js (côté serveur)
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle"; // composant client

export const metadata = {
  title: "SanSuBagier",
  description: "Why a book when you can App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar />
        {/* Contenu principal avec footer */}
        <div className="flex flex-col flex-1 min-h-screen ml-64">
          <main className="flex-1 p-8">{children}</main>
          <Footer />
        </div>

        {/* Toggle client pour le thème */}
        <ThemeToggle />
      </body>
    </html>
  );
}
