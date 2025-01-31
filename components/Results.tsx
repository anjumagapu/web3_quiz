"use client"

import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import { useEffect } from "react"
import { Trophy, RefreshCw } from "lucide-react"

interface ResultsProps {
  questions: {
    question: string
    correctAnswer: string
    explanation: string
  }[]
  userAnswers: string[]
  onRestart?: () => void
}

export default function Results({ questions, userAnswers, onRestart }: ResultsProps) {
  const correctAnswers = questions.reduce((acc, question, index) => {
    return question.correctAnswer === userAnswers[index] ? acc + 1 : acc
  }, 0)

  const score = Math.round((correctAnswers / questions.length) * 100)

  useEffect(() => {
    if (score >= 60) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }, [score])

  return (
    <div className="flex flex-col min-h-screen">
      <div className="px-4 py-3">
        <h1 className="text-white text-xl font-semibold">Quiz Complete!</h1>
      </div>

      <div className="flex-1 px-4 pb-4 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 shadow-lg flex flex-col items-center justify-center text-center mb-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="mb-8"
          >
            {/* Updated Score Card */}
            <div className="relative w-full aspect-square max-w-sm bg-gradient-to-br from-[#4A4AF4] to-[#FF69B4] rounded-3xl p-8 flex flex-col items-center justify-center text-white">
              <Trophy className="w-24 h-24 mb-4" />
              <h2 className="text-6xl font-bold mb-2">{score}%</h2>
              <p className="text-xl mb-4">Web3 101 Quiz Score</p>
              <p className="text-lg font-medium">
                {score >= 80 ? "Web3 Expert! 🏆" : score >= 60 ? "Web3 Enthusiast! 📚" : "Web3 Learner! 💪"}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Restart Button */}
      <div className="px-4 pb-2 mt-4">
        {" "}
        {/* Updated Restart Button Container */}
        {onRestart && (
          <button
            onClick={onRestart}
            className="w-full bg-[#FF69B4] text-white py-4 rounded-2xl font-medium flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}

