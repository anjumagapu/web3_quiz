import Quiz from "@/components/Quiz"

export const metadata = {
  title: 'Web3 101 Quiz',
  description: 'New to blockchain and Web3? Play this quiz to get to know basics',
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#4A4AF4] flex flex-col items-center justify-center p-4 text-white">
      <h1 className="text-3xl font-bold mb-8 mt-8">Take your first steps into Web3! 🚀</h1>
      <p className="text-lg mb-8 text-center max-w-lg">
      Ready to understand blockchain in 5 minutes? This bite-sized quiz helps you learn Web3 basics
      </p>
      <div className="w-full max-w-md">
        <Quiz />
      </div>
    </main>
  )
}

