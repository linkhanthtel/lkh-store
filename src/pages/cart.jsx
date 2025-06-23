import { useContext, useRef, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShopContext } from "../contexts/shopcontext"
import { CartItem } from "../components/cartitem"
import { Link } from "react-router-dom"
import {
  FaShoppingCart,
  FaArrowRight,
  FaRocket,
  FaChevronLeft,
  FaGem,
  FaShippingFast,
  FaLock,
  FaHeart,
  FaStar,
  FaGift,
} from "react-icons/fa"
import { HiSparkles } from "react-icons/hi"

// Optimized Live Animated Background Component
const OptimizedAnimatedBackground = () => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const particlesRef = useRef([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    let time = 0

    // Set canvas size with device pixel ratio for crisp rendering
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr

      ctx.scale(dpr, dpr)

      setDimensions({ width: rect.width, height: rect.height })
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Initialize particles with reduced count for performance
    const initParticles = () => {
      particlesRef.current = []
      const particleCount = Math.min(30, Math.floor((dimensions.width * dimensions.height) / 15000))

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * dimensions.width,
          y: Math.random() * dimensions.height,
          radius: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          hue: Math.random() * 360,
          opacity: Math.random() * 0.5 + 0.3,
        })
      }
    }

    // Initialize particles when dimensions are set
    if (dimensions.width > 0 && dimensions.height > 0) {
      initParticles()
    }

    // Optimized animation loop
    const animate = () => {
      time += 0.01

      // Clear canvas with gradient background
      const gradient = ctx.createLinearGradient(0, 0, dimensions.width, dimensions.height)
      gradient.addColorStop(0, `hsl(${240 + Math.sin(time * 0.5) * 20}, 70%, 5%)`)
      gradient.addColorStop(0.5, `hsl(${260 + Math.cos(time * 0.3) * 15}, 60%, 8%)`)
      gradient.addColorStop(1, `hsl(${280 + Math.sin(time * 0.7) * 25}, 65%, 6%)`)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, dimensions.width, dimensions.height)

      // Draw animated waves
      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        ctx.strokeStyle = `hsla(${270 + i * 30 + time * 20}, 70%, 60%, 0.1)`
        ctx.lineWidth = 2

        const waveY = dimensions.height * (0.3 + i * 0.2)
        const amplitude = 30 + i * 10
        const frequency = 0.01 + i * 0.005

        for (let x = 0; x <= dimensions.width; x += 10) {
          const y = waveY + Math.sin(x * frequency + time + i) * amplitude
          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.stroke()
      }

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Boundary wrapping
        if (particle.x < 0) particle.x = dimensions.width
        if (particle.x > dimensions.width) particle.x = 0
        if (particle.y < 0) particle.y = dimensions.height
        if (particle.y > dimensions.height) particle.y = 0

        // Update hue for color cycling
        particle.hue += 0.5

        // Draw particle with glow effect
        const glowSize = particle.radius * 3
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, glowSize)
        gradient.addColorStop(0, `hsla(${particle.hue}, 70%, 60%, ${particle.opacity})`)
        gradient.addColorStop(0.5, `hsla(${particle.hue}, 70%, 60%, ${particle.opacity * 0.3})`)
        gradient.addColorStop(1, `hsla(${particle.hue}, 70%, 60%, 0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2)
        ctx.fill()

        // Draw core particle
        ctx.fillStyle = `hsla(${particle.hue}, 80%, 70%, ${particle.opacity})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw subtle grid pattern
      ctx.strokeStyle = "rgba(255, 255, 255, 0.02)"
      ctx.lineWidth = 1

      const gridSize = 50
      for (let x = 0; x < dimensions.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, dimensions.height)
        ctx.stroke()
      }

      for (let y = 0; y < dimensions.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(dimensions.width, y)
        ctx.stroke()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    if (dimensions.width > 0 && dimensions.height > 0) {
      animate()
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [dimensions.width, dimensions.height])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />
}

// Responsive Empty Cart Animation Component
const ResponsiveEmptyCartAnimation = () => {
  return (
    <>
      <OptimizedAnimatedBackground />
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center py-28 max-w-6xl mx-auto w-full"
        >
          {/* Animated Cart */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="relative mb-8 sm:mb-12"
          >
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotateY: [0, 360],
              }}
              transition={{
                y: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                rotateY: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              }}
              className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 mx-auto"
            >
              {/* Glow effect */}
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 0.9, 0.6],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl opacity-60"
              />

              {/* Cart icon container */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="relative w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20"
              >
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <FaShoppingCart className="text-2xl sm:text-3xl lg:text-4xl text-white" />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Floating icons - responsive positioning */}
            {[
              { icon: FaHeart, color: "#ef4444" },
              { icon: FaStar, color: "#f59e0b" },
              { icon: FaGem, color: "#8b5cf6" },
              { icon: FaGift, color: "#10b981" },
              { icon: HiSparkles, color: "#06b6d4" },
              { icon: FaRocket, color: "#ec4899" },
            ].map((item, index) => (
              <motion.div
                key={index}
                animate={{
                  y: [0, -30, 0],
                  rotate: [0, 360],
                  scale: [1, 1.3, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 3 + index * 0.2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: index * 0.5,
                  ease: "easeInOut",
                }}
                className="absolute w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center shadow-lg"
                style={{
                  backgroundColor: item.color,
                  top: `${50 + Math.sin((index * 60 * Math.PI) / 180) * 80}px`,
                  left: `${50 + Math.cos((index * 60 * Math.PI) / 180) * 80}px`,
                }}
              >
                <item.icon className="text-white text-sm sm:text-base lg:text-lg" />
              </motion.div>
            ))}

            {/* Sparkles - reduced for mobile */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -50, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                  ease: "easeInOut",
                }}
                className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full"
                style={{
                  top: `${Math.random() * 200}px`,
                  left: `${Math.random() * 200}px`,
                }}
              />
            ))}
          </motion.div>

          {/* Title - responsive text */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <motion.h1
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 lg:mb-8 bg-gradient-to-r from-red-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
              style={{ backgroundSize: "400% 400%" }}
            >
              Your Cart is Empty
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 lg:mb-12 leading-relaxed px-4"
            >
              But your shopping adventure is just beginning! ✨
              <br className="hidden sm:block" />
              <span className="text-purple-400">Discover amazing products waiting for you</span>
            </motion.p>
          </motion.div>

          {/* Buttons - responsive layout */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center mb-8 sm:mb-12 lg:mb-16 px-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/shop"
                className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold text-base sm:text-lg shadow-2xl w-full sm:w-auto justify-center"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <FaRocket />
                </motion.div>
                Start Shopping Adventure
                <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
                  <FaArrowRight />
                </motion.div>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/"
                className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-full font-bold text-base sm:text-lg w-full sm:w-auto justify-center"
              >
                <FaChevronLeft />
                Back to Home
              </Link>
            </motion.div>
          </motion.div>

          {/* Features - responsive grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto px-4"
          >
            {[
              {
                icon: FaShippingFast,
                title: "Free Shipping",
                desc: "On orders over $50",
                color: "#3b82f6",
              },
              {
                icon: FaGem,
                title: "Premium Quality",
                desc: "Curated products",
                color: "#8b5cf6",
              },
              {
                icon: FaLock,
                title: "Secure Payment",
                desc: "100% protected",
                color: "#10b981",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: index * 0.2,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 sm:p-6 text-center"
              >
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                    scale: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                  }}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg"
                  style={{ backgroundColor: feature.color }}
                >
                  <feature.icon className="text-xl sm:text-2xl text-white" />
                </motion.div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm sm:text-base">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}

export const Cart = ({ id, item, condition, price, imageURL }) => {
  const { cartItem } = useContext(ShopContext)

  // Show empty cart animation if no items
  if (cartItem < 1) {
    return <ResponsiveEmptyCartAnimation />
  }

  return (
    <>
      <OptimizedAnimatedBackground />
      <div className="relative min-h-screen max-w-7xl mx-auto p-4 sm:p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center py-28 gap-3 mb-4 sm:mb-6"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              <FaShoppingCart className="text-lg sm:text-xl text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              Your <span className="text-purple-400">Order</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl text-gray-300"
          >
            {Array.isArray(cartItem) ? cartItem.length : cartItem}{" "}
            {Array.isArray(cartItem) && cartItem.length === 1 ? "item" : "items"} in your cart
          </motion.p>
        </motion.div>

        {/* Cart Items - responsive layout */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 gap-4 sm:gap-6 justify-center max-w-4xl mx-auto"
        >
          <AnimatePresence>
            {Array.isArray(cartItem) ? (
              cartItem.map((item, index) => (
                <motion.div
                  key={item.id || index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <CartItem {...item} />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 sm:p-8 text-center"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <FaShoppingCart className="text-2xl sm:text-3xl text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Cart Items</h2>
                <p className="text-gray-300 mb-6 sm:mb-8">You have {cartItem} items in your cart</p>
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold w-full sm:w-auto justify-center"
                  >
                    <FaRocket />
                    Continue Shopping
                    <FaArrowRight />
                  </Link>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-full font-semibold w-full sm:w-auto justify-center"
                  >
                    <FaChevronLeft />
                    Back to Home
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  )
}
