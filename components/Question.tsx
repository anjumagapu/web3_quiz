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
      <div className="px-4 py-3 text-center">
        <h1 className="text-white text-xl font-semibold">Web3 101 Quiz</h1>
      </div>

      {/* Question Card */}
      <div className="flex-1 px-4 pb-4 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 shadow-lg mb-4"
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-500">
              Question {questionNumber}/{totalQuestions}
            </span>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-[#FF69B4] h-2.5 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
              ></div>
            </div>
          </div>

          <h2 className="text-xl font-medium mb-6">{question.question}</h2>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <motion.button
                key={option}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleOptionClick(option)}
                className={`w-full p-4 text-left border rounded-2xl transition-all duration-200 flex justify-between items-center ${getOptionStyle(option)}`}
                disabled={isAnswered}
              >
                <span className="font-medium">{option}</span>
                {isAnswered && option === question.correctAnswer && <Check className="w-5 h-5 text-[#2D8B72]" />}
                {isAnswered && option === selectedAnswer && selectedAnswer !== question.correctAnswer && (
                  <X className="w-5 h-5 text-[#FF4777]" />
                )}
              </motion.button>
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
      <div className="px-4 pb-2 mt-auto">
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
    </div>
  )
}

