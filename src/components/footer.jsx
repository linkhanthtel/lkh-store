"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaHeart, FaRocket } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import { ImHome3 } from "react-icons/im"
import { FaShoppingBag } from "react-icons/fa"
import { BsMinecart } from "react-icons/bs"
import { MdSell } from "react-icons/md"
import { HiSparkles } from "react-icons/hi"

// Futuristic Animated Background
const FuturisticBackground = () => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const particlesRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    let time = 0

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = []
      const particleCount = 50

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          hue: Math.random() * 360,
          opacity: Math.random() * 0.5 + 0.3,
        })
      }
    }

    initParticles()

    // Animation loop
    const animate = () => {
      time += 0.01

      // Clear canvas with gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, `hsl(${240 + Math.sin(time) * 20}, 70%, 5%)`)
      gradient.addColorStop(0.5, `hsl(${260 + Math.cos(time * 0.7) * 15}, 60%, 8%)`)
      gradient.addColorStop(1, `hsl(${280 + Math.sin(time * 1.2) * 25}, 65%, 6%)`)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw grid pattern
      ctx.strokeStyle = "rgba(147, 51, 234, 0.1)"
      ctx.lineWidth = 1

      const gridSize = 50
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw animated waves
      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        ctx.strokeStyle = `hsla(${270 + i * 30 + time * 20}, 70%, 60%, 0.2)`
        ctx.lineWidth = 2

        const waveY = canvas.height * (0.2 + i * 0.3)
        const amplitude = 20 + i * 10
        const frequency = 0.01 + i * 0.005

        for (let x = 0; x <= canvas.width; x += 5) {
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
      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Boundary wrapping
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Update hue
        particle.hue += 0.5

        // Draw particle with glow
        const glowSize = particle.radius * 4
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, glowSize)
        gradient.addColorStop(0, `hsla(${particle.hue}, 70%, 60%, ${particle.opacity})`)
        gradient.addColorStop(0.5, `hsla(${particle.hue}, 70%, 60%, ${particle.opacity * 0.3})`)
        gradient.addColorStop(1, `hsla(${particle.hue}, 70%, 60%, 0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2)
        ctx.fill()

        // Draw core
        ctx.fillStyle = `hsla(${particle.hue}, 80%, 70%, ${particle.opacity})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}

const socialLinks = [
  { icon: <FaFacebookF />, url: "#", color: "#1877F2" },
  { icon: <FaTwitter />, url: "#", color: "#1DA1F2" },
  { icon: <FaInstagram />, url: "#", color: "#E4405F" },
  { icon: <FaLinkedinIn />, url: "#", color: "#0A66C2" },
]

const quickLinks = [
  { name: "Home", url: "/", icon: ImHome3 },
  { name: "Shop", url: "/shop", icon: FaShoppingBag },
  { name: "Cart", url: "/cart", icon: BsMinecart },
  { name: "Best Sellers", url: "/bestsellers", icon: MdSell },
]

export const Footer = () => {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      console.log("Subscribed with email:", email)
      setIsSubscribed(true)
      setEmail("")

      // Auto-hide success message after 4 seconds
      setTimeout(() => setIsSubscribed(false), 4000)
    },
    [email],
  )

  const handleEmailChange = useCallback((e) => {
    setEmail(e.target.value)
  }, [])

  return (
    <motion.footer
      className="relative overflow-hidden"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Futuristic Animated Background */}
      <FuturisticBackground />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-purple-900/40 to-transparent" />

      {/* Holographic Border */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        animate={{
          opacity: [0.5, 1, 0.5],
          scaleX: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and Description */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Futuristic Logo */}
            <motion.div
              className="relative group"
              whileHover={{
                scale: 1.1,
                rotateY: 15,
                rotateX: 5,
              }}
              transition={{ duration: 0.5 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="relative">
                {/* Glow Effect */}
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-purple-500/30 via-cyan-400/30 to-pink-500/30 rounded-2xl blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />

                {/* Logo Container */}
                <div className="relative bg-black/50 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-6 shadow-2xl">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-r from-purple-600 to-cyan-400 rounded-xl flex items-center justify-center"
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        rotate: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                        scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                      }}
                    >
                      <HiSparkles className="text-white text-xl" />
                    </motion.div>
                    <div>
                      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                        LKH Store
                      </h2>
                      <p className="text-xs text-cyan-300">Future of Shopping</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <p className="text-gray-300 leading-relaxed">
                  Experience the future of shopping with{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-semibold">
                    LKH Store
                  </span>
                  . We provide cutting-edge products with immersive 3D experiences and AI-powered recommendations.
                </p>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group"
                  whileHover={{
                    scale: 1.2,
                    rotateY: 180,
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: link.color }}
                    animate={{
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Icon Container */}
                  <div
                    className="relative w-12 h-12 rounded-full flex items-center justify-center border-2 border-white/20 backdrop-blur-sm transition-all duration-300 group-hover:border-white/50"
                    style={{
                      background: `linear-gradient(135deg, ${link.color}20, ${link.color}40)`,
                    }}
                  >
                    <span className="text-white text-lg">{link.icon}</span>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.h3
              className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Navigation Hub
            </motion.h3>

            <div className="space-y-4">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{
                    x: 10,
                    scale: 1.05,
                  }}
                  className="group"
                >
                  <a
                    href={link.url}
                    className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Hover Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                    />

                    {/* Icon */}
                    <motion.div
                      className="relative w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center"
                      whileHover={{
                        rotate: 360,
                        scale: 1.1,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <link.icon className="text-white text-lg" />
                    </motion.div>

                    {/* Text */}
                    <span className="text-white font-medium group-hover:text-cyan-300 transition-colors duration-300">
                      {link.name}
                    </span>

                    {/* Arrow */}
                    <motion.div
                      className="ml-auto text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      animate={{
                        x: [0, 5, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      →
                    </motion.div>
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.h3
              className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Neural Network
            </motion.h3>

            <motion.div
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-6"
              whileHover={{
                borderColor: "rgba(34, 211, 238, 0.5)",
                boxShadow: "0 0 30px rgba(34, 211, 238, 0.2)",
              }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-gray-300 leading-relaxed mb-6">
                Connect to our <span className="text-cyan-400 font-semibold">quantum newsletter</span> for exclusive
                updates, futuristic deals, and early access to next-gen products.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div className="relative" whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <div className="flex relative overflow-hidden rounded-xl border border-white/20 backdrop-blur-sm">
                    {/* Input Glow Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 opacity-0"
                      animate={{
                        opacity: email ? [0, 0.5, 0] : 0,
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />

                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="Enter your neural ID..."
                      className="flex-grow px-6 py-4 bg-transparent text-white placeholder-gray-400 focus:outline-none relative z-10"
                      required
                    />

                    <motion.button
                      type="submit"
                      className="relative px-6 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold overflow-hidden"
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 0 30px rgba(34, 211, 238, 0.5)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Button Animation */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0"
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />

                      <span className="relative flex items-center gap-2">
                        <MdEmail className="text-xl" />
                        <FaRocket className="text-sm" />
                      </span>
                    </motion.button>
                  </div>
                </motion.div>

                {/* Success Message */}
                <AnimatePresence>
                  {isSubscribed && (
                    <motion.div
                      initial={{ opacity: 0, y: -20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.8 }}
                      transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                      className="relative"
                    >
                      <motion.div
                        className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-xl p-4 backdrop-blur-sm"
                        animate={{
                          boxShadow: [
                            "0 0 20px rgba(34, 197, 94, 0.3)",
                            "0 0 40px rgba(34, 197, 94, 0.5)",
                            "0 0 20px rgba(34, 197, 94, 0.3)",
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          >
                            ✓
                          </motion.div>
                          <span className="text-green-300 font-medium">Neural connection established!</span>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </motion.div>
        </div>

        {/* Copyright Section */}
        <motion.div
          className="mt-16 pt-8 border-t border-white/10 text-center relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-30"
                style={{
                  left: `${20 + i * 15}%`,
                  top: "50%",
                }}
                animate={{
                  y: [-20, 20, -20],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>

          <motion.p
            className="text-gray-400 flex items-center justify-center gap-3 text-lg relative z-10"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            © {new Date().getFullYear()} LKH Store. Crafted with
            <motion.span
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <FaHeart className="text-red-400" />
            </motion.span>
            in the digital realm. All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  )
}
