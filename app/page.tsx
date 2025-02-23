import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";
import Hero from "@/components/Hero";

// Add Post interface
interface Post {
  id: number;
  title: string;
  content: string;
  imageUrl?: string | null;
  published?: boolean;
  createdAt: Date;
}

async function getPublishedPosts() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });
  return posts;
}

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <Hero />

      {/* Featured Post */}
      {posts[0] && (
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Featured Post
            </h2>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="md:flex">
                <div className="md:flex-shrink-0 relative h-64 md:h-auto md:w-1/2">
                  <Image
                    src={posts[0].imageUrl || "/placeholder.jpg"}
                    alt={posts[0].title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8 md:p-12 md:w-1/2">
                  <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                    Featured
                  </div>
                  <Link
                    href={`/post/${posts[0].id}`}
                    className="block mt-1 text-3xl font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
                  >
                    {posts[0].title}
                  </Link>
                  <p className="mt-4 text-gray-500 line-clamp-3">
                    {posts[0].content.replace(/<[^>]*>/g, "")}
                  </p>
                  <div className="mt-6">
                    <Link
                      href={`/post/${posts[0].id}`}
                      className="inline-flex items-center text-indigo-600 hover:text-indigo-500"
                    >
                      Read more
                      <svg
                        className="ml-2 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Latest Posts Grid */}
      <section
        id="latest"
        className="scroll-mt-24 container mx-auto px-4 py-16"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(1).map((post: Post) => (
            <Link
              href={`/post/${post.id}`}
              key={post.id}
              className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48 w-full bg-gray-200">
                {post.imageUrl ? (
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <svg
                      className="w-12 h-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {post.title}
                </h3>
                <p className="mt-3 text-gray-500 line-clamp-2">
                  {post.content.replace(/<[^>]*>/g, "")}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <time className="text-sm text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span className="text-indigo-500 group-hover:text-indigo-600 transition-colors">
                    Read article →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              No posts yet
            </h3>
            <p className="text-gray-600">Check back soon for new content!</p>
          </div>
        )}
      </section>
    </>
  );
}
