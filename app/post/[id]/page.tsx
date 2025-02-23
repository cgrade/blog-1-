"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Post } from "@prisma/client";

export default function PostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/posts/${params.id}`);
        if (!response.ok) notFound();
        const data = await response.json();
        setPost(data);
      } catch (error) {
        notFound();
      }
    }
    fetchPost();
  }, [params.id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <article>
      {/* Hero Section with Image */}
      {post.imageUrl && (
        <div className="relative h-[60vh] w-full">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="container mx-auto max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                {post.title}
              </h1>
              <time className="text-lg text-gray-200">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {!post.imageUrl && (
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              {post.title}
            </h1>
            <time className="text-gray-500">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </header>
        )}

        <div className="prose prose-lg md:prose-xl max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to all posts
            </Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
