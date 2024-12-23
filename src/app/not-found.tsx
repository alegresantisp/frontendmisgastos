'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { PiPiggyBankBold, PiArrowFatLinesUpBold, PiArrowFatLinesDownBold } from 'react-icons/pi'

// This is a mock function. Replace it with your actual authentication check.
const isAuthenticated = () => {
  // For demonstration, we're randomly deciding if the user is authenticated
  return Math.random() < 0.5
}

export default function NotFound() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer) // Limpieza del intervalo
  }, [])

  useEffect(() => {
    if (countdown <= 0) {
      const authenticated = isAuthenticated()
      router.push(authenticated ? '/dashboard' : '/login')
    }
  }, [countdown, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex flex-col items-center justify-center text-center px-6 font-sans">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
          404: Page Not Found
        </h1>
        <p className="text-blue-200 text-xl mb-8">
          Oops! Looks like your money took a wrong turn!
        </p>
      </motion.div>

      <motion.div
        className="relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <PiPiggyBankBold className="text-blue-300 text-9xl" />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-4xl font-bold text-yellow-400">404</span>
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-8 flex justify-center space-x-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <PiArrowFatLinesUpBold className="text-green-400 text-4xl animate-bounce" />
        <PiArrowFatLinesDownBold className="text-red-400 text-4xl animate-bounce" style={{ animationDelay: '0.5s' }} />
      </motion.div>

      <motion.p
        className="mt-8 text-blue-200 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        Don&apos;t worry, we&apos;re redirecting you in {countdown} seconds...
      </motion.p>
    </div>
  )
}
