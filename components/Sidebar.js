"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "🏠 Home" },
  { href: "/about", label: "📘 About" },
  { href: "/contact", label: "✉️ Contact" },
  // Add more here
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav
      className="w-64 h-screen fixed left-0 top-0 p-6"
      style={{
        borderRight: "1px solid #444", // optional visual separator
      }}
    >
      <h2 className="text-2xl font-bold mb-8">SanSuBagier</h2>
      <ul className="space-y-4">
        {navItems.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={`block px-4 py-2 rounded hover:bg-gray-700 ${
                pathname === href ? "bg-gray-700 font-semibold" : ""
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
