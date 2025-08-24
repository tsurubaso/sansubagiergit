export default function Footer() {
  return (
    <footer className="w-full text-center py-4 border-t border-gray-700 text-sm text-gray-400">
      © {new Date().getFullYear()} SanSuBagier — All rights reserved
    </footer>
  );
}