import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "SanSuBagier",
  description: "Why a book when you can App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-gray-900 text-white flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Contenu principal avec footer en bas */}
        <div className="flex flex-col flex-1 min-h-screen ml-64">
          <main className="flex-1 p-8">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
