import Quiz from "@/components/Quiz"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#4A4AF4] flex flex-col items-center justify-center p-4 text-white">
      <h1 className="text-3xl font-bold mb-8">Web3 101 Quiz</h1>
      <div className="w-full max-w-md">
        <Quiz />
      </div>
    </main>
  )
}

