"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X } from "lucide-react"

interface QuestionProps {
  question: {
    question: string
    options: string[]
    correctAnswer: string
    explanation: string
  }
  onAnswer: (answer: string) => void
  questionNumber: number
  totalQuestions: number
}

export default function Question({ question, onAnswer, questionNumber, totalQuestions }: QuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)

  const handleOptionClick = (option: string) => {
    if (isAnswered) return
    setSelectedAnswer(option)
    setIsAnswered(true)
  }

  const handleNext = () => {
    if (selectedAnswer) {
      onAnswer(selectedAnswer)
      setSelectedAnswer(null)
      setIsAnswered(false)
    }
  }

  const getOptionStyle = (option: string) => {
    if (!isAnswered) {
      return "bg-white border-gray-200"
    }

    if (option === question.correctAnswer) {
      return "bg-[#E7F9F3] border-[#A3E4D7] text-[#2D8B72]"
    }

    if (option === selectedAnswer && selectedAnswer !== question.correctAnswer) {
      return "bg-[#FFE5EC] border-[#FFB1C5] text-[#FF4777]"
    }

    return "bg-white border-gray-200 opacity-50"
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      

      {/* Question Card */}
      <div className="px-4 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white rounded-3xl p-8 shadow-lg mb-6"
        >
          <div className="mb-6">
            <h2 className="text-gray-500 mb-2">Question {questionNumber}/{totalQuestions}</h2>
            <h3 className="text-2xl font-bold text-gray-900">{question.question}</h3>
          </div>
          
          <div className="space-y-4">
            {question.options.map((option) => (
              <button
                key={option}
                onClick={() => handleOptionClick(option)}
                className="w-full text-left p-4 rounded-xl border-2 border-gray-200 
                         hover:border-[#4A4AF4] hover:bg-blue-50 transition-all duration-200
                         text-gray-700 font-medium"
              >
                {option}
              </button>
            ))}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className={`mt-6 p-4 rounded-xl ${
                  selectedAnswer === question.correctAnswer
                    ? "bg-[#E7F9F3] text-[#2D8B72]"
                    : "bg-[#FFE5EC] text-[#FF4777]"
                }`}
              >
                <p className="text-sm">
                  <span className="font-semibold">
                    {selectedAnswer === question.correctAnswer ? "Correct! " : "Incorrect. "}
                  </span>
                  {question.explanation}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Next Button */}
      <div className="px-4 pb-8">
        <button
          className={`w-full py-4 rounded-2xl font-medium transition-all duration-200 ${
            isAnswered ? "bg-[#FF69B4] text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
          onClick={handleNext}
          disabled={!isAnswered}
        >
          Next Question
        </button>
      </div>

      {/* LinkedIn Link */}
      <div className="text-center pb-8 text-white/80">
        <a 
          href="https://www.linkedin.com/in/uma-magapu-077100189/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-white transition-colors duration-200"
        >
          built by uma magapu
        </a>
      </div>
    </div>
  )
}

