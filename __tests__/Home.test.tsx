import { render, screen } from "@testing-library/react"
import Home from "../app/page"
import { describe, it, expect } from "@jest/globals"

jest.mock("../lib/prisma", () => ({
  post: {
    findMany: jest.fn().mockResolvedValue([
      {
        id: 1,
        title: "Test Post",
        content: "This is a test post",
        createdAt: new Date(),
        imageUrl: "/placeholder.svg",
      },
    ]),
    count: jest.fn().mockResolvedValue(1),
  },
}))

describe("Home", () => {
  it("renders the blog title", async () => {
    render(await Home({ searchParams: {} }))
    const heading = screen.getByRole("heading", { name: /Sleek Blog/i })
    expect(heading).toBeInTheDocument()
  })

  it("renders blog posts", async () => {
    render(await Home({ searchParams: {} }))
    const postTitle = screen.getByText("Test Post")
    expect(postTitle).toBeInTheDocument()
  })

  it("displays the correct number of posts", async () => {
    render(await Home({ searchParams: {} }))
    const postCount = await screen.findByText("1 post") //This is added to check for the post count
    expect(postCount).toBeInTheDocument()
  })

  it("renders a message if there are no posts", async () => {
    jest.mock("../lib/prisma", () => ({
      post: {
        findMany: jest.fn().mockResolvedValue([]),
        count: jest.fn().mockResolvedValue(0),
      },
    }))
    render(await Home({ searchParams: {} }))
    const noPostsMessage = screen.getByText("No posts found.")
    expect(noPostsMessage).toBeInTheDocument()
  })
})

