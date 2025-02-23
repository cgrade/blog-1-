"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * @notice Admin login component
 * @dev Handles admin authentication
 */
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch("/api/csrf-token", {
          credentials: "include",
        });
        const data = await response.json();
        console.log(
          "CSRF token fetched:",
          data.csrfToken?.slice(0, 10) + "..."
        );
        setCsrfToken(data.csrfToken);
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
        setError("Failed to initialize login. Please refresh the page.");
      }
    };

    fetchCsrfToken();
  }, []);

  /**
   * @notice Handles form submission for admin login
   * @param e - The form submission event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!csrfToken) {
      setError("Please wait for the page to initialize...");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      console.log("1. Starting login submission");
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password, csrfToken }),
      });

      const data = await response.json();
      console.log("2. Server response:", {
        status: response.status,
        ok: response.ok,
        success: data.success,
      });

      if (response.ok && data.success) {
        console.log("3. Login successful");
        localStorage.setItem("token", data.token);
        console.log("4. Token stored in localStorage");

        // Simple redirect
        router.push("/admin");
      } else {
        console.log("Login failed:", data.error);
        setError(data.error || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full mb-4 p-2 border rounded"
            required
            disabled={isLoading}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full mb-6 p-2 border rounded"
            required
            disabled={isLoading}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            disabled={isLoading || !csrfToken}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
