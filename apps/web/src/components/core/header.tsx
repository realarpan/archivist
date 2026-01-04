"use client";
import Link from "next/link";
import UserMenu from "./user-menu";

export default function Header() {
  const links = [{ to: "/", label: "home" }] as const;

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-row items-center justify-between px-4 py-3 mt-4 border border-[#2A2B2F] rounded-lg bg-[#16161A]">
        <nav className="flex gap-4 text-lg font-medium">
          {links.map(({ to, label }) => {
            return (
              <Link
                key={to}
                href={to}
                className="text-gray-100 hover:text-[#22D3EE] transition-colors"
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <UserMenu />
        </div>
      </div>
    </div>
  );
}
