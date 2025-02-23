import { NextResponse } from "next/server"
import prisma from "../../../../lib/prisma"
import { cloudinary } from "../../../../lib/cloudinary"
import { PostSchema } from "../../../../lib/schemas"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
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

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "blog_images",
      })
      imageUrl = result.secure_url
    }

    const post = await prisma.post.update({
      where: { id: Number.parseInt(params.id) },
      data: {
        title,
        content,
        ...(imageUrl && { imageUrl }),
      },
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error updating post:", error)
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(params.id),
        published: true,
      },
    });

    if (!post) {
      return new NextResponse("Post not found", { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.post.delete({
      where: {
        id: parseInt(params.id),
      },
    });

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}

