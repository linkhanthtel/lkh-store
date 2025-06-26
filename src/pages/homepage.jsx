import { useState, useEffect, useRef, useCallback } from "react"
import { Link } from "react-router-dom"
import {
  FaShoppingCart,
  FaSearch,
  FaStar,
  FaArrowRight,
  FaRocket,
  FaGem,
  FaPlay,
  FaHeart,
  FaUsers,
  FaTrophy,
} from "react-icons/fa"
import { HiSparkles, HiLightningBolt } from "react-icons/hi"
import { IoIosArrowDown } from "react-icons/io"
import appScreenShot from "../images/appScreenShot.png"

// Optimized Background Component
const OptimizedBackground = () => {
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
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = []
      const particleCount = Math.min(40, Math.floor((canvas.width * canvas.height) / 15000))

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          hue: Math.random() * 60 + 240, // Purple to blue range
          opacity: Math.random() * 0.4 + 0.2,
        })
      }
    }

    initParticles()

    // Animation loop
    const animate = () => {
      time += 0.005

      // Clear canvas with gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, `hsl(${240 + Math.sin(time) * 10}, 50%, 3%)`)
      gradient.addColorStop(0.5, `hsl(${260 + Math.cos(time * 0.7) * 8}, 45%, 5%)`)
      gradient.addColorStop(1, `hsl(${280 + Math.sin(time * 1.2) * 12}, 55%, 4%)`)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw subtle grid
      ctx.strokeStyle = "rgba(147, 51, 234, 0.03)"
      ctx.lineWidth = 1

      const gridSize = 100
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle
        ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, ${particle.opacity})`
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

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />
}

// Smooth Product Showcase
const ProductShowcase = ({ products }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % products.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [products.length, isAutoPlay])

  const handleProductClick = useCallback((index) => {
    setActiveIndex(index)
    setIsAutoPlay(false)
    setTimeout(() => setIsAutoPlay(true), 8000)
  }, [])

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Main Product Display */}
      <div className="relative h-96 lg:h-[500px] bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-cyan-500/5" />

        {/* Product Content */}
        <div className="relative h-full flex items-center justify-between p-8 lg:p-12">
          {/* Product Info */}
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 bg-purple-500/20 backdrop-blur-sm rounded-full px-4 py-2">
              <span
                className="w-2 h-2 bg-purple-400 rounded-full"
                style={{
                  animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                }}
              />
              <span className="text-purple-300 text-sm font-medium">
                {products[activeIndex]?.category || "Featured"}
              </span>
            </div>

            <h3 className="text-2xl lg:text-4xl font-bold text-white leading-tight">
              {products[activeIndex]?.name || "Premium Product"}
            </h3>

            <p className="text-gray-300 text-lg leading-relaxed max-w-md">
              {products[activeIndex]?.description || "Experience the future of technology"}
            </p>

            <div className="flex items-center gap-6">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                ${products[activeIndex]?.price?.toLocaleString() || "999"}
              </div>

              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(products[activeIndex]?.rating || 5) ? "text-yellow-400" : "text-gray-600"
                    }`}
                  />
                ))}
                <span className="text-gray-400 text-sm ml-2">
                  ({products[activeIndex]?.reviews?.toLocaleString() || "1000"}+ reviews)
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold flex items-center gap-2 hover:scale-105 transition-transform duration-200">
                <FaShoppingCart />
                Add to Cart
              </button>
              <button className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-colors duration-200">
                <FaSearch />
              </button>
            </div>
          </div>

          {/* Product Image */}
          <div className="hidden lg:flex flex-1 items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl blur-2xl" />
              <div className="relative w-64 h-64 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <img
                  src={products[activeIndex]?.image || "/placeholder.svg?height=300&width=300"}
                  alt={products[activeIndex]?.name || "Product"}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Navigation */}
      <div className="flex justify-center mt-8 gap-3">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => handleProductClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "bg-gradient-to-r from-purple-500 to-pink-500 scale-125"
                : "bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

// Stats Component
const StatsSection = () => {
  const stats = [
    { icon: FaUsers, label: "Happy Customers", value: "10K+", color: "#3b82f6" },
    { icon: FaTrophy, label: "Awards Won", value: "25+", color: "#f59e0b" },
    { icon: FaGem, label: "Premium Products", value: "500+", color: "#8b5cf6" },
    { icon: FaHeart, label: "Customer Love", value: "99%", color: "#ef4444" },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:scale-105 transition-transform duration-300"
        >
          <div
            className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: stat.color }}
          >
            <stat.icon className="text-white text-2xl" />
          </div>
          <div className="text-2xl lg:text-3xl font-bold text-white mb-2">{stat.value}</div>
          <div className="text-gray-400 font-medium">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}

// Animated Text Component
const AnimatedText = ({ children, className = "" }) => {
  return (
    <span
      className={`${className}`}
      style={{
        background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
        backgroundSize: "400% 400%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        animation: "gradientShift 4s ease infinite",
      }}
    >
      {children}
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </span>
  )
}

// Floating Element Component
const FloatingElement = ({ children, delay = 0, duration = 3 }) => {
  return (
    <div
      style={{
        animation: `float ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      {children}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  )
}

function HomePage() {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState({})

  const featuredProducts = [
    {
      id: 1,
      name: "Samsung Galaxy S23 Ultra",
      price: 1200,
      image: "/images/samsungs23ultra.jpg",
      category: "Smartphones",
      rating: 4.9,
      reviews: 2847,
      description: "Revolutionary camera system with AI-powered photography",
    },
    {
      id: 2,
      name: 'MacBook Pro 13" (M3 Pro)',
      price: 3100,
      image: "/images/mbpm3max.jpg",
      category: "Laptops",
      rating: 4.8,
      reviews: 1923,
      description: "Unleash your creativity with M3 Pro chip performance",
    },
    {
      id: 3,
      name: 'MacBook Pro 16" (M3 Max)',
      price: 3900,
      image: "/images/mbpm3max16.jpg",
      category: "Laptops",
      rating: 4.9,
      reviews: 1456,
      description: "Ultimate power for professionals and creators",
    },
  ]

  // Optimized scroll handler
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }))
        })
      },
      { threshold: 0.1 },
    )

    document.querySelectorAll("[data-animate]").forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden">
      <OptimizedBackground />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <FloatingElement delay={0} duration={20}>
            <div
              className="absolute top-20 left-20 w-32 h-32 border border-purple-400/20 rounded-full"
              style={{ animation: "spin 20s linear infinite" }}
            />
          </FloatingElement>
          <FloatingElement delay={1} duration={4}>
            <div className="absolute bottom-40 right-20 w-24 h-24 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg transform rotate-45" />
          </FloatingElement>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          {/* Hero Badge */}
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl rounded-full px-6 py-3 mb-8 border border-white/20">
            <div
              className="w-2 h-2 bg-green-400 rounded-full"
              style={{ animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }}
            />
            <HiSparkles className="text-yellow-400 text-lg" />
            <span className="text-white font-medium">Welcome to the Future of Shopping</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight mb-8">
            Shop Beyond
            <br />
            <AnimatedText className="text-transparent bg-clip-text">Imagination</AnimatedText>
          </h1>

          {/* Subtitle */}
          <p className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Experience next-generation e-commerce with{" "}
            <span className="text-purple-400 font-semibold">AI-powered recommendations</span>,{" "}
            <span className="text-cyan-400 font-semibold">immersive 3D previews</span>, and seamless transactions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <Link
              to="/shop"
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold text-lg shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-3">
                <FaRocket />
                Start Exploring
                <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Link>

            <button className="group flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-xl text-white rounded-full font-bold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <FaPlay className="text-sm ml-1" />
              </div>
              Watch Demo
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="flex flex-col items-center text-white/60 hover:text-white transition-colors duration-300">
            <span className="text-sm mb-2">Discover More</span>
            <div style={{ animation: "bounce 1s infinite" }}>
              <IoIosArrowDown className="text-2xl" />
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div
          className="absolute right-8 top-1/2 transform -translate-y-1/2 hidden xl:block opacity-20 hover:opacity-40 transition-opacity duration-500"
          style={{
            transform: `translateY(${-scrollY * 0.3}px) translateX(${scrollY * 0.1}px)`,
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-3xl blur-3xl" />
            <img
              src={appScreenShot || "/placeholder.svg?height=600&width=400"}
              alt="App Preview"
              className="relative w-80 h-auto rounded-3xl border border-white/10"
            />
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section
        id="featured"
        data-animate
        className="relative py-20 lg:py-32 px-4 sm:px-6 lg:px-8"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 lg:mb-24">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <HiLightningBolt className="text-purple-400" />
              <span className="text-purple-300 font-medium">Featured Collection</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Cutting-Edge{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                Technology
              </span>
            </h2>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Discover our handpicked selection of premium products with immersive previews
            </p>
          </div>

          <ProductShowcase products={featuredProducts} />

          {/* Explore Button */}
          <div className="text-center mt-16">
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-full font-bold text-lg shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <FaGem />
              Explore All Products
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        data-animate
        className="relative py-20 lg:py-32 px-4 sm:px-6 lg:px-8"
        style={{
          transform: `translateY(${scrollY * 0.05}px)`,
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Trusted by{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Thousands
              </span>
            </h2>
            <p className="text-xl text-gray-400">Join our growing community of satisfied customers</p>
          </div>

          <StatsSection />
        </div>
      </section>

      {/* Testimonial Section */}
      <section
        data-animate
        className="relative py-20 lg:py-32 px-4 sm:px-6 lg:px-8"
        style={{
          transform: `translateY(${scrollY * 0.03}px)`,
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-white/10">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <span className="text-white text-3xl">"</span>
            </div>

            <blockquote className="text-2xl lg:text-3xl font-medium text-white leading-relaxed mb-8">
              "This platform completely transformed my shopping experience. The interface is intuitive, the products are
              top-quality, and the customer service is exceptional."
            </blockquote>

            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div className="text-left">
                <p className="text-xl font-semibold text-white">Sarah Johnson</p>
                <p className="text-purple-300">Verified Customer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-500/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
            <div
              className="w-2 h-2 bg-green-400 rounded-full"
              style={{ animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }}
            />
            <span className="text-green-300 font-medium">Ready to Start?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Begin Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">Journey</span>{" "}
            Today
          </h2>

          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Join thousands of customers who have discovered the future of online shopping
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/shop"
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-cyan-500 text-white rounded-full font-bold text-lg shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <span className="flex items-center gap-3">
                <FaRocket />
                Get Started Now
                <FaArrowRight />
              </span>
            </Link>

            <Link
              to="/about"
              className="px-8 py-4 bg-white/10 backdrop-blur-xl text-white rounded-full font-bold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Inline Styles for Animations */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(-25%);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            transform: none;
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  )
}

export default HomePage
