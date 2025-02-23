"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

interface Post {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  published?: boolean;
  createdAt: Date;
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    fetchPosts();
  }, [router]);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      if (!response.ok) throw new Error("Failed to fetch posts");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to fetch posts");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    try {
      const url = editingId ? `/api/posts/${editingId}` : "/api/posts";
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to save post");

      // Reset form
      setTitle("");
      setContent("");
      setImage(null);
      setImagePreview(null);
      setEditingId(null);

      // Refresh posts list
      fetchPosts();
    } catch (error) {
      console.error("Error saving post:", error);
      setError("Failed to save post");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (post: Post) => {
    setTitle(post.title);
    setContent(post.content);
    setEditingId(post.id);
    setImagePreview(post.imageUrl || null);
  };

  const handlePublish = async (id: number) => {
    try {
      const response = await fetch(`/api/posts/${id}/publish`, {
        method: "PUT",
      });
      if (!response.ok) throw new Error("Failed to publish post");
      fetchPosts();
    } catch (error) {
      console.error("Error publishing post:", error);
      setError("Failed to publish post");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/admin/login");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            Total Posts
          </h3>
          <p className="text-3xl font-bold text-gray-900">{posts.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            Published Posts
          </h3>
          <p className="text-3xl font-bold text-gray-900">
            {posts.filter((p) => p.published).length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            Draft Posts
          </h3>
          <p className="text-3xl font-bold text-gray-900">
            {posts.filter((p) => !p.published).length}
          </p>
        </div>
      </div>

      {/* Create/Edit Post Form */}
      <div className="bg-white rounded-xl shadow-lg mb-8">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {editingId ? "Edit Post" : "Create New Post"}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-lg">
              {error}
            </div>
          )}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <ReactQuill
              value={content}
              onChange={setContent}
              className="h-64 mb-12 bg-white"
              theme="snow"
              modules={modules}
              formats={formats}
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Featured Image
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full"
              accept="image/*"
            />
            {imagePreview && (
              <div className="mt-4 relative h-48 w-full md:w-96">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            )}
          </div>
          <div className="flex justify-end">
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setTitle("");
                  setContent("");
                  setImage(null);
                  setImagePreview(null);
                }}
                className="mr-4 px-6 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {isLoading
                ? "Saving..."
                : editingId
                ? "Update Post"
                : "Create Post"}
            </button>
          </div>
        </form>
      </div>

      {/* Posts List */}
      <div className="bg-white rounded-xl shadow-lg">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">All Posts</h2>
        </div>
        <div className="divide-y">
          {posts.map((post) => (
            <div key={post.id} className="p-6 flex items-center">
              <div className="flex-shrink-0 mr-6">
                <div className="relative h-24 w-24">
                  <Image
                    src={post.imageUrl || "/placeholder.jpg"}
                    alt={post.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleEdit(post)}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    Edit
                  </button>
                  {!post.published && (
                    <button
                      onClick={() => handlePublish(post.id)}
                      className="text-green-500 hover:text-green-600"
                    >
                      Publish
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="flex-shrink-0 ml-6">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    post.published
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {post.published ? "Published" : "Draft"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
