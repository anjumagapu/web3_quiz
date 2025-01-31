"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import Question from "./Question"
import Results from "./Results"

// Define the questions array outside the component
const quizQuestions = [
  {
    id: 1,
    question: "What is Web3?",
    options: [
      "A new web browser",
      "The next evolution of the internet focused on decentralization and user ownership",
      "A social media platform",
      "A type of cryptocurrency",
    ],
    correctAnswer: "The next evolution of the internet focused on decentralization and user ownership",
    explanation:
      "Web3 is like giving power back to internet users instead of big companies. Imagine if instead of Facebook owning all your photos and posts, you actually owned them and could take them anywhere. That's Web3 - it's about making the internet more fair and giving control back to users. For example, you could own your game items and sell them on any marketplace, not just within the game.",
  },
  {
    id: 2,
    question: "What is a blockchain?",
    options: [
      "A type of computer hardware",
      "A digital chain of blocks containing transaction records that can't be changed",
      "A programming language",
      "A type of cryptocurrency wallet",
    ],
    correctAnswer: "A digital chain of blocks containing transaction records that can't be changed",
    explanation:
      "Think of a blockchain like a giant shared diary that everyone can see, but no one can rip out or change the pages. When you write something in it (like sending money to a friend), it's there forever and everyone can verify it happened. It's like having thousands of people watching and confirming every transaction to make sure it's real.",
  },
  {
    id: 3,
    question: "What is a Smart Contract?",
    options: [
      "A legal document written by lawyers",
      "An AI-powered contract reader",
      "Self-executing code that automatically runs when certain conditions are met",
      "A digital signature",
    ],
    correctAnswer: "Self-executing code that automatically runs when certain conditions are met",
    explanation:
      "A smart contract is like a vending machine for digital agreements. Just like how a vending machine automatically gives you a snack when you put in money, a smart contract automatically does something when certain conditions are met. For example, if you're buying a concert ticket, the smart contract automatically sends you the ticket when you send the payment - no middle person needed!",
  },
  {
    id: 4,
    question: "What is a Cryptocurrency Wallet?",
    options: [
      "A physical wallet that holds digital coins",
      "A software or hardware device that stores your private keys to access crypto",
      "A bank account for Bitcoin",
      "An app that only shows crypto prices",
    ],
    correctAnswer: "A software or hardware device that stores your private keys to access crypto",
    explanation:
      "A crypto wallet is like your email account - it has a public address (like your email address that people can send stuff to) and a private key (like your password). It doesn't actually 'store' coins - it stores the keys that prove you own those coins on the blockchain. Think of it like a key to your safe rather than the safe itself.",
  },
  {
    id: 5,
    question: "What is a Token?",
    options: [
      "A physical coin",
      "A digital asset created and managed on an existing blockchain",
      "A password",
      "A type of NFT",
    ],
    correctAnswer: "A digital asset created and managed on an existing blockchain",
    explanation:
      "A token is like a concert ticket or arcade token, but digital. Just like how an arcade token can only be used in that arcade, different tokens can represent different things in Web3 - like membership to a club, voting rights in a project, or even ownership of digital art. For example, a token might give you access to exclusive content or let you vote on project decisions.",
  },
  {
    id: 6,
    question: "What is Decentralization?",
    options: [
      "Having no internet connection",
      "Spreading control and decision-making across many participants instead of a central authority",
      "Using multiple computers",
      "Having many cryptocurrency wallets",
    ],
    correctAnswer: "Spreading control and decision-making across many participants instead of a central authority",
    explanation:
      "Decentralization is like having a potluck dinner instead of going to a restaurant. In a restaurant, one chef (central authority) controls all the food. At a potluck, everyone brings dishes (participates) and shares control. In Web3, instead of one company controlling everything, power and decisions are shared among many people.",
  },
  {
    id: 7,
    question: "What is an NFT?",
    options: [
      "A new file type",
      "A unique digital token that represents ownership of a specific item",
      "A type of cryptocurrency",
      "A digital art program",
    ],
    correctAnswer: "A unique digital token that represents ownership of a specific item",
    explanation:
      "An NFT is like a digital certificate of authenticity. Just like how each baseball card in your collection is unique, NFTs prove that you own a specific digital item. For example, if you buy an NFT of a digital artwork, it's like having the original painting - there might be copies, but you own the real one, and the blockchain proves it.",
  },
  {
    id: 8,
    question: "What is DeFi?",
    options: [
      "A type of wifi connection",
      "Decentralized Finance - financial services without traditional banks",
      "Digital Filing system",
      "A cryptocurrency exchange",
    ],
    correctAnswer: "Decentralized Finance - financial services without traditional banks",
    explanation:
      "DeFi is like having a bank that runs on computer code instead of people. Instead of going to a bank for a loan or to earn interest, you can do these things directly through apps on the blockchain. For example, you could lend your crypto to others and earn interest, or borrow crypto by putting up collateral - all without a bank in the middle.",
  },
  {
    id: 9,
    question: "What is Mining in Web3?",
    options: [
      "Digging for digital coins",
      "The process of validating transactions and adding them to the blockchain",
      "Creating new cryptocurrencies",
      "Finding NFTs",
    ],
    correctAnswer: "The process of validating transactions and adding them to the blockchain",
    explanation:
      "Mining is like being a referee in a game. Miners check that all transactions are valid (like a referee checking if a goal is valid) and add them to the blockchain. They use powerful computers to solve complex puzzles, and when they do, they're rewarded with new cryptocurrency. It's how new transactions get confirmed and added to the blockchain's history.",
  },
  {
    id: 10,
    question: "What is Gas Fee?",
    options: [
      "Fee for refueling your car",
      "Cost paid to process a transaction on the blockchain",
      "Monthly subscription fee",
      "Fee for creating NFTs",
    ],
    correctAnswer: "Cost paid to process a transaction on the blockchain",
    explanation:
      "Gas fees are like paying for shipping when you buy something online. Just like how you need to pay extra to have your package delivered, you need to pay gas fees to have your transaction processed on the blockchain. These fees go to the miners/validators who do the work of processing and confirming your transaction.",
  },
]

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<string[]>([])
  const [showResults, setShowResults] = useState(false)

  const handleAnswer = (answer: string) => {
    setUserAnswers([...userAnswers, answer])
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setShowResults(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setUserAnswers([])
    setShowResults(false)
  }

  return (
    <div className="w-full max-w-2xl">
      <AnimatePresence mode="wait">
        {showResults ? (
          <Results questions={quizQuestions} userAnswers={userAnswers} onRestart={handleRestart} />
        ) : (
          <Question
            question={quizQuestions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={quizQuestions.length}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

