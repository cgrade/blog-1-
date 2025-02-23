"use client"

import { useEffect } from "react"

/**
 * @notice Error boundary component
 * @dev Catches and displays errors that occur in the application
 * @param error - The error object
 * @param reset - Function to reset the error boundary
 */
export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <button
        onClick={() => reset()}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
      >
        Try again
      </button>
    </div>
  )
}

