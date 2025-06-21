import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  FaShoppingCart,
  FaSearch,
  FaStar,
  FaArrowRight,
  FaQuoteLeft,
  FaRocket,
  FaGem,
  FaChevronLeft,
  FaChevronRight,
  FaShieldAlt
} from "react-icons/fa"
import { IoIosArrowDown } from "react-icons/io"
import { HiSparkles } from "react-icons/hi"
import appScreenShot from "../images/appScreenShot.png"

const includedFeatures = [
  "Private forum access",
  "Member resources",
  "Entry to annual conference",
  "Official member t-shirt",
]

const stats = [
  { id: 1, name: "Products", value: "+100", icon: FaGem },
  { id: 2, name: "Customer Satisfaction", value: "5 Stars", icon: FaStar },
  { id: 3, name: "Number of users", value: "1K", icon: FaRocket },
]

const featuredProducts = [
  {
    id: 1,
    name: "Samsung Galaxy S23 Ultra",
    price: 1200,
    image: "/images/samsungs23ultra.jpg",
    category: "Smartphones",
    rating: 4.9,
    reviews: 2847,
    badge: "Best Seller",
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
    badge: "Editor's Choice",
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
    badge: "Premium",
    description: "Ultimate power for professionals and creators",
  },
  {
    id: 4,
    name: "iPad Pro 12.9",
    price: 1099,
    image: "/placeholder.svg?height=400&width=400",
    category: "Tablets",
    rating: 4.7,
    reviews: 3241,
    badge: "New",
    description: "Liquid Retina XDR display with M2 chip",
  },
  {
    id: 5,
    name: "AirPods Pro",
    price: 249,
    image: "/placeholder.svg?height=400&width=400",
    category: "Audio",
    rating: 4.6,
    reviews: 5672,
    badge: "Popular",
    description: "Active Noise Cancellation with Spatial Audio",
  },
  {
    id: 6,
    name: "Apple Watch Ultra",
    price: 799,
    image: "/placeholder.svg?height=400&width=400",
    category: "Wearables",
    rating: 4.8,
    reviews: 2134,
    badge: "Featured",
    description: "Built for adventure with titanium case",
  },
]

// Modern Carousel Component
const ModernCarousel = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const carouselRef = useRef(null)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [products.length, isAutoPlaying])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  const getBadgeColor = (badge) => {
    switch (badge) {
      case "Best Seller":
        return "bg-gradient-to-r from-yellow-400 to-orange-500"
      case "Editor's Choice":
        return "bg-gradient-to-r from-purple-500 to-pink-500"
      case "Premium":
        return "bg-gradient-to-r from-gray-700 to-gray-900"
      case "New":
        return "bg-gradient-to-r from-green-400 to-blue-500"
      case "Popular":
        return "bg-gradient-to-r from-red-400 to-pink-500"
      case "Featured":
        return "bg-gradient-to-r from-indigo-500 to-purple-600"
      default:
        return "bg-gradient-to-r from-gray-400 to-gray-600"
    }
  }

  return (
    <div
      className="relative w-full max-w-7xl mx-auto"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Main Carousel Container */}
      <div className="relative h-[600px] overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-purple-900 to-black">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(255, 105, 180, 0.3) 0%, transparent 50%)
              `,
            }}
          />
        </div>

        {/* Slides */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="absolute inset-0 flex items-center"
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 px-8 lg:px-16">
              {/* Product Image */}
              <motion.div
                className="flex items-center justify-center relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="relative">
                  {/* Glow Effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl" />

                  {/* Product Image Container */}
                  <motion.div
                    className="relative w-80 h-80 bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
                    whileHover={{
                      scale: 1.05,
                      rotateY: 5,
                      rotateX: 5,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <img
                      src={products[currentIndex].image || "/placeholder.svg"}
                      alt={products[currentIndex].name}
                      className="w-full h-full object-contain rounded-2xl"
                    />

                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      <span
                        className={`${getBadgeColor(products[currentIndex].badge)} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}
                      >
                        {products[currentIndex].badge}
                      </span>
                    </div>

                    {/* Floating Elements */}
                    <motion.div
                      className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                      animate={{
                        y: [0, -10, 0],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />

                    <motion.div
                      className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full"
                      animate={{
                        y: [0, 10, 0],
                        scale: [1.2, 1, 1.2],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Product Info */}
              <motion.div
                className="flex flex-col justify-center text-white space-y-6"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div>
                  <motion.span
                    className="text-purple-400 text-sm font-semibold uppercase tracking-wider"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    {products[currentIndex].category}
                  </motion.span>

                  <motion.h3
                    className="text-3xl lg:text-4xl font-bold mt-2 leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    {products[currentIndex].name}
                  </motion.h3>
                </div>

                <motion.p
                  className="text-gray-300 text-lg leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  {products[currentIndex].description}
                </motion.p>

                {/* Rating */}
                <motion.div
                  className="flex items-center space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(products[currentIndex].rating) ? "text-yellow-400" : "text-gray-600"}`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-400">
                    {products[currentIndex].rating} ({products[currentIndex].reviews.toLocaleString()} reviews)
                  </span>
                </motion.div>

                {/* Price and Actions */}
                <motion.div
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <div className="text-3xl font-bold text-white">${products[currentIndex].price.toLocaleString()}</div>

                  <div className="flex space-x-3">
                    <motion.button
                      className="w-12 h-12 bg-white/10 backdrop-blur-sm text-white rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300"
                      whileHover={{ scale: 1.1, rotateY: 180 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaSearch />
                    </motion.button>

                    <motion.button
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaShoppingCart />
                      <span>Add to Cart</span>
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <motion.button
          className="absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm text-white rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 z-10"
          onClick={prevSlide}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaChevronLeft />
        </motion.button>

        <motion.button
          className="absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm text-white rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 z-10"
          onClick={nextSlide}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaChevronRight />
        </motion.button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-8 space-x-3">
        {products.map((_, index) => (
          <motion.button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg scale-125"
                : "bg-gray-600 hover:bg-gray-500"
            }`}
            onClick={() => goToSlide(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mt-4 w-full bg-gray-700 rounded-full h-1 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentIndex + 1) / products.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  )
}

function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll()
  const heroRef = useRef(null)

  // Smooth scroll transforms with proper spacing
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95])

  // Mouse tracking for 3D effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Parallax calculations
  const mouseX = (mousePosition.x - (typeof window !== "undefined" ? window.innerWidth : 0) / 2) / 50
  const mouseY = (mousePosition.y - (typeof window !== "undefined" ? window.innerHeight : 0) / 2) / 50

  return (
    <div className="overflow-hidden bg-black">
      {/* Hero Section with proper spacing */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen flex items-center z-10"
        style={{
          opacity: heroOpacity,
          scale: heroScale,
          y: heroY,
        }}
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-black">
          {/* Floating particles */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}

          {/* Geometric shapes */}
          <motion.div
            className="absolute top-20 right-20 w-32 h-32 border border-purple-400/30 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            style={{ transform: `translate(${mouseX}px, ${mouseY}px)` }}
          />

          <motion.div
            className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-lg"
            animate={{
              rotate: [0, 45, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            style={{ transform: `translate(${-mouseX}px, ${-mouseY}px)` }}
          />
        </div>

        <div className="container mx-auto px-6 py-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <motion.div
              className="lg:w-1/2 text-center lg:text-left"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <HiSparkles className="text-yellow-400" />
                <span className="text-white text-sm">Welcome to the Future of Shopping</span>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                Discover Your{" "}
                <motion.span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  style={{ backgroundSize: "200% 200%" }}
                >
                  Digital
                </motion.span>
                <br />
                <span className="text-3xl md:text-4xl lg:text-5xl">Universe</span>
              </motion.h1>

              <motion.p
                className="text-xl text-gray-300 max-w-lg mx-auto lg:mx-0 mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                Experience the next generation of online shopping with immersive 3D interactions, AI-powered
                recommendations, and seamless transactions.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/shop"
                    className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold text-lg shadow-2xl overflow-hidden"
                  >
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative flex items-center gap-2">
                      <FaRocket />
                      Explore Now
                    </span>
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="#featured"
                    className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    <span className="flex items-center gap-2">
                      Watch Demo
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <FaArrowRight />
                      </motion.div>
                    </span>
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                className="mt-12 flex justify-center lg:justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
              >
                <motion.a
                  href="#featured"
                  className="flex flex-col items-center text-white/70 hover:text-white transition-colors duration-300"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <span className="text-sm mb-2">Scroll to explore</span>
                  <IoIosArrowDown className="text-2xl" />
                </motion.a>
              </motion.div>
            </motion.div>

            <motion.div
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <motion.div
                className="relative z-10"
                style={{
                  transform: `perspective(1000px) rotateX(${mouseY * 0.1}deg) rotateY(${mouseX * 0.1}deg)`,
                }}
              >
                <motion.div
                  className="relative rounded-3xl overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <img
                    alt="App screenshot"
                    src={appScreenShot || "/placeholder.svg?height=600&width=400&query=futuristic app interface"}
                    className="w-full h-auto rounded-3xl"
                  />

                  {/* Holographic overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 via-transparent to-blue-900/40 pointer-events-none" />

                  {/* Floating UI elements */}
                  <motion.div
                    className="absolute top-8 right-8 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  >
                    <FaShieldAlt className="text-cyan-400 text-2xl" />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Decorative elements */}
              <motion.div
                className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.6, 0.3, 0.6],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Featured Products Section with proper spacing */}
      <section id="featured" className="relative py-32 bg-gradient-to-b from-black via-gray-900 to-black z-20">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-purple-500/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <HiSparkles className="text-purple-400" />
              <span className="text-purple-300 text-sm font-medium">Featured Collection</span>
            </motion.div>

            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Next-Gen{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Products
              </span>
            </motion.h2>

            <motion.p
              className="text-xl text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover cutting-edge technology with immersive 3D previews and interactive experiences
            </motion.p>
          </motion.div>

          <ModernCarousel products={featuredProducts} />

          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/shop"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
              >
                <FaRocket />
                Explore All Products
                <FaArrowRight />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Stats Section with proper spacing */}
      <section className="relative py-32 bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 overflow-hidden z-20">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, staggerChildren: 0.2 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                className="text-center group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl"
                  whileHover={{
                    rotateY: 180,
                    boxShadow: "0 25px 50px -12px rgba(168, 85, 247, 0.4)",
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <stat.icon className="text-2xl text-white" />
                </motion.div>

                <motion.div
                  className="text-4xl md:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                >
                  {stat.value}
                </motion.div>

                <motion.div
                  className="text-lg text-gray-300 font-medium"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                >
                  {stat.name}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Testimonial Section with proper spacing */}
      <section className="relative py-32 bg-gradient-to-b from-black to-gray-900 overflow-hidden z-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,theme(colors.purple.500),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,theme(colors.blue.500),transparent_70%)]" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="mb-8 flex justify-center"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <FaQuoteLeft className="text-2xl text-white" />
              </div>
            </motion.div>

            <motion.blockquote
              className="text-2xl md:text-3xl font-medium text-white leading-relaxed mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              "This platform revolutionized my shopping experience. The 3D product previews and seamless interface make
              it feel like shopping in the future. Absolutely incredible!"
            </motion.blockquote>

            <motion.div
              className="flex items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <div className="text-left">
                <p className="text-xl font-semibold text-white">David Lin</p>
                <p className="text-purple-300">Tech Enthusiast & Early Adopter</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section with proper spacing */}
      <section className="relative py-32 bg-gradient-to-r from-black via-purple-900 to-black overflow-hidden z-20">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Ready to Enter the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Future?
              </span>
            </motion.h2>

            <motion.p
              className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Join thousands of forward-thinking customers who have already embraced the next generation of online
              shopping
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/shop"
                  className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold text-lg shadow-2xl overflow-hidden"
                >
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center gap-3">
                    <FaRocket />
                    Start Your Journey
                    <FaArrowRight />
                  </span>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
                  Learn More
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
