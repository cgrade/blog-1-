import { NextResponse } from "next/server"
import prisma from "../../../lib/prisma"
import { cloudinary } from "../../../lib/cloudinary"
import { PostSchema } from "../../../lib/schemas"

// Add type for Cloudinary upload result
interface CloudinaryUploadResult {
  secure_url: string
  public_id: string
}

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
    const image = formData.get("image") as File | null

    const validationResult = PostSchema.safeParse({ title, content })

    if (!validationResult.success) {
      return NextResponse.json({ error: validationResult.error.errors }, { status: 400 })
    }

    let imageUrl = null
    if (image) {
      const buffer = await image.arrayBuffer()
      const base64Image = Buffer.from(buffer).toString("base64")
      const dataURI = `data:${image.type};base64,${base64Image}`

      // Type the result as CloudinaryUploadResult
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "blog_images",
      }) as CloudinaryUploadResult

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

