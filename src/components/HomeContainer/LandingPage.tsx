'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PiPiggyBankBold, PiArrowFatLinesUpBold, PiArrowFatLinesDownBold } from 'react-icons/pi'
import { useRouter } from 'next/navigation'

const cards = [
  { title: "Organiza tus finanzas", content: "Lleva un control detallado de tus ingresos y gastos." },
  { title: "Maximiza tus ahorros", content: "Identifica patrones y establece metas de ahorro inteligentes." },
  { title: "Analiza con precisión", content: "Accede a gráficos e informes personalizados en tiempo real." },
]

export default function LandingPage() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null)
  const router = useRouter()

  useEffect(() => {
    console.log('LandingPage montado')
  }, [])

  const handleLogin = () => {
    console.log('Botón de login presionado')
    router.push('/auth')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex flex-col items-center text-center px-6 font-sans">
      {/* Header */}
      <header className="mt-10 relative w-full">
        <motion.h1
          className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          POCKETCARE
        </motion.h1>
        <motion.p
          className="text-blue-200 text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          El futuro de la gestión financiera personal.
        </motion.p>
      </header>

      {/* Piggy Bank Animation */}
      <motion.div
        className="relative my-12"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <PiPiggyBankBold className="text-blue-300 text-9xl" />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-4xl font-bold text-yellow-400">$</span>
        </motion.div>
      </motion.div>

      <motion.div
        className="mb-12 flex justify-center space-x-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <PiArrowFatLinesUpBold className="text-green-400 text-4xl animate-bounce" />
        <PiArrowFatLinesDownBold className="text-red-400 text-4xl animate-bounce" style={{ animationDelay: '0.5s' }} />
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="flex flex-wrap gap-6 justify-center mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        {cards.map((card, index) => (
          <motion.div
            key={index}
            onClick={() => setSelectedCard(selectedCard === index ? null : index)}
            className={`cursor-pointer w-80 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-6 rounded-2xl shadow-lg transition-all duration-300 border border-blue-400 border-opacity-30 ${
              selectedCard === index ? "scale-105" : "scale-100"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h3 className="text-xl font-semibold mb-2 text-blue-300">{card.title}</h3>
            <p className="text-blue-100 mt-2 opacity-80">{card.content}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer */}
      <motion.div
        className="mt-8 space-x-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <button 
          onClick={handleLogin}
          className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 mb-4"
        >
          Comenzá tu viaje
        </button>
      </motion.div>
    </div>
  )
}

