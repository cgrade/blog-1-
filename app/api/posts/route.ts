import { NextResponse } from "next/server"
import prisma from "../../../lib/prisma"
import { cloudinary } from "../../../lib/cloudinary"
import { PostSchema } from "../../../lib/schemas"

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const title = formData.get("title") as string
    const content = formData.get("content") as string
    const imageFile = formData.get("image") as File | null

    const validationResult = PostSchema.safeParse({ title, content })

    if (!validationResult.success) {
      return NextResponse.json({ error: validationResult.error.errors }, { status: 400 })
    }

    let imageUrl = null
    if (imageFile) {
      // Convert File to Buffer
      const bytes = await imageFile.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Upload to Cloudinary
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "auto",
              folder: "blog_images",
            },
            (error, result) => {
              if (error) reject(error)
              else resolve(result)
            }
          )
          .end(buffer)
      })

      imageUrl = result.secure_url
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        imageUrl,
      },
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error creating post:", error)
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}

