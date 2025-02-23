"use client";

import type React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  // Don't show admin header on login page
  const isLoginPage = pathname === "/admin/login";

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!isLoginPage && (
        <header className="bg-white shadow">
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-8">
                <Link
                  href="/"
                  className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
                >
                  Amos Blog
                </Link>
                <span className="text-sm font-medium text-gray-500">
                  Admin Dashboard
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href="/"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  View Blog
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>
      )}
      <main className={isLoginPage ? "" : "container mx-auto px-4 py-8"}>
        {children}
      </main>
    </div>
  );
}
