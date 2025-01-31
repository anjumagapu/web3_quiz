'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl mb-4">Something went wrong!</h2>
      <button
        className="bg-white text-blue-600 px-4 py-2 rounded"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  )
} 