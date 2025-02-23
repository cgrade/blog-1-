import { NextResponse } from "next/server"
import prisma from "../../../../../lib/prisma"

/**
 * @notice Handles PUT requests to publish a post
 * @param request - The incoming request object
 * @param params - The route parameters, including the post ID
 */
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const post = await prisma.post.update({
      where: { id: Number.parseInt(params.id) },
      data: { published: true },
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error publishing post:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

