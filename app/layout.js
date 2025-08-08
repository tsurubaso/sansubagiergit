import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "SanSuBagier",
  description: "Why a book when you can App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-gray-900 text-white">
        <Sidebar />
        <main className="ml-64 p-8">{children}</main>
      </body>
    </html>
  );
}
