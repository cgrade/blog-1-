import type React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

/**
 * @notice Metadata for the application
 * @dev This object is used by Next.js for SEO optimization
 */
export const metadata = {
  title: "Chef Amos's Kitchen",
  description: "Thoughts, stories and ideas",
  openGraph: {
    title: "Chef Amos's Kitchen",
    description: "Exploring culinary arts, recipes, and food innovation",
    url: "https://blog-eosin-psi-26.vercel.app/",
    siteName: "Chef Amos's Kitchen",
    images: [
      {
        url: "https://your-blog-url.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  generator: "v0.dev",
};

/**
 * @notice Root layout component
 * @dev This component wraps all pages in the application
 * @param children - The child components to be rendered within the layout
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if the current path is in the admin section
  const headersList = headers();
  const pathname = headersList.get("x-pathname") || "";
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <html lang="en">
      <body className={inter.className}>
        {!isAdminRoute && <Navigation />}
        <main>{children}</main>
        {!isAdminRoute && (
          <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                  <h3 className="text-xl font-bold mb-4">
                    Chef Amos's Kitchen
                  </h3>
                  <p className="text-gray-400">
                    Exploring the art of cooking, culinary techniques, and food
                    innovation.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/about"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        About
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Newsletter</h3>
                  <form className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
              <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                © {new Date().getFullYear()} Chef Amos's Kitchen. All rights
                reserved.
              </div>
            </div>
          </footer>
        )}
      </body>
    </html>
  );
}

import "./globals.css";
