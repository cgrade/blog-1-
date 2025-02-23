"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * @title Navigation Component
 * @author Abraham Elijah (Mr Grade)
 * @notice Main navigation bar for the blog
 * @dev Uses client-side rendering for dynamic navigation state
 */
export default function Navigation() {
  const [posts, setPosts] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPostsDropdownOpen, setIsPostsDropdownOpen] = useState(false);
  const pathname = usePathname();

  // Fetch posts for the dropdown menu
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPosts();
  }, []);

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Home Link */}
          <Link
            href="/"
            className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
          >
            Chef Amos's Kitchen
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-gray-600 hover:text-blue-600 transition-colors ${
                pathname === "/" ? "text-blue-600" : ""
              }`}
            >
              Home
            </Link>

            {/* Posts Dropdown */}
            <div className="relative group">
              <button
                onClick={() => setIsPostsDropdownOpen(!isPostsDropdownOpen)}
                className={`text-gray-600 hover:text-blue-600 transition-colors flex items-center ${
                  isPostsDropdownOpen ? "text-blue-600" : ""
                }`}
              >
                Posts
                <svg
                  className={`ml-2 h-4 w-4 transition-transform ${
                    isPostsDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Posts Dropdown Menu */}
              {isPostsDropdownOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-50">
                  {posts.length > 0 ? (
                    posts.map((post: any) => (
                      <Link
                        key={post.id}
                        href={`/post/${post.id}`}
                        className="block px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-600"
                      >
                        {post.title}
                      </Link>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500">No posts yet</div>
                  )}
                </div>
              )}
            </div>

            <Link
              href="/about"
              className={`text-gray-600 hover:text-blue-600 transition-colors ${
                pathname === "/about" ? "text-blue-600" : ""
              }`}
            >
              About
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            <svg
              className="h-6 w-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <Link
              href="/"
              className="block py-2 text-gray-600 hover:text-blue-600"
            >
              Home
            </Link>
            <button
              onClick={() => setIsPostsDropdownOpen(!isPostsDropdownOpen)}
              className="w-full text-left py-2 text-gray-600 hover:text-blue-600"
            >
              Posts
            </button>
            {isPostsDropdownOpen && (
              <div className="pl-4">
                {posts.map((post: any) => (
                  <Link
                    key={post.id}
                    href={`/post/${post.id}`}
                    className="block py-2 text-gray-600 hover:text-blue-600"
                  >
                    {post.title}
                  </Link>
                ))}
              </div>
            )}
            <Link
              href="/about"
              className="block py-2 text-gray-600 hover:text-blue-600"
            >
              About
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
