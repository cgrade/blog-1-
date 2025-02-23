import { Metadata } from "next";
import prisma from "@/lib/prisma";

async function getPost(id: string) {
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(id),
      published: true,
    },
  });
  return post;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const post = await getPost(params.id);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.content.substring(0, 160).replace(/<[^>]*>/g, ""),
    openGraph: {
      title: post.title,
      description: post.content.substring(0, 160).replace(/<[^>]*>/g, ""),
      images: post.imageUrl ? [post.imageUrl] : [],
    },
  };
} 