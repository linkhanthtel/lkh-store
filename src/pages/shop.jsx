import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Data } from "../data/data"
import { ShopItems } from "../components/shopitems"
import heroimage from "../images/hero.jpg"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {
  FaSearch,
  FaFilter,
  FaArrowUp,
  FaChevronDown,
  FaChevronRight,
  FaTags,
  FaChevronLeft,
  FaStar,
  FaShoppingCart,
  FaHeart,
  FaEye,
  FaRocket,
  FaGem,
  FaShieldAlt,
  FaCube,
} from "react-icons/fa"
import { HiSparkles } from "react-icons/hi"

// 3D Carousel Component
const Carousel3D = ({ products, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const carouselRef = useRef(null)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [products.length, isAutoPlaying])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)
  }

  const getVisibleProducts = () => {
    const visible = []
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + products.length) % products.length
      visible.push({ ...products[index], position: i })
    }
    return visible
  }

  return (
    <div
      className="relative w-full h-96 perspective-1000"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {getVisibleProducts().map((product, index) => {
          const { position } = product
          const isCenter = position === 0
          const translateX = position * 200
          const translateZ = isCenter ? 0 : -100
          const rotateY = position * 25
          const scale = isCenter ? 1 : 0.8
          const opacity = Math.abs(position) > 1 ? 0.3 : 1

          return (
            <motion.div
              key={`${product.id}-${position}`}
              className="absolute w-64 h-80 cursor-pointer"
              style={{
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity,
                zIndex: isCenter ? 10 : 5 - Math.abs(position),
              }}
              whileHover={isCenter ? { scale: 1.05 } : {}}
              onClick={() => {
                if (!isCenter) {
                  setCurrentIndex((currentIndex + position + products.length) % products.length)
                }
              }}
            >
              <div className="w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                {/* Product Image */}
                <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                  <img
                    src={product.imageURL || `/placeholder.svg?height=200&width=200`}
                    alt={product.item}
                    className="w-full h-full object-cover"
                  />

                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Featured
                    </span>
                  </div>

                  {/* Overlay for non-center items */}
                  {!isCenter && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
                        Click to view
                      </div>
                    </div>
                  )}

                  {/* Center item overlay */}
                  {isCenter && (
                    <motion.div
                      className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                      whileHover={{ opacity: 1 }}
                    >
                      <div className="flex gap-2">
                        <motion.button
                          className="w-10 h-10 bg-white text-purple-600 rounded-full flex items-center justify-center"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaShoppingCart />
                        </motion.button>
                        <motion.button
                          className="w-10 h-10 bg-white text-purple-600 rounded-full flex items-center justify-center"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaHeart />
                        </motion.button>
                        <motion.button
                          className="w-10 h-10 bg-white text-purple-600 rounded-full flex items-center justify-center"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaEye />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">{product.item}</h3>
                  <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-purple-600">${product.price}</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="w-3 h-3 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Navigation */}
      <motion.button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm text-purple-600 rounded-full flex items-center justify-center shadow-lg z-20"
        onClick={prevSlide}
        whileHover={{ scale: 1.1, backgroundColor: "rgba(147, 51, 234, 0.1)" }}
        whileTap={{ scale: 0.9 }}
      >
        <FaChevronLeft />
      </motion.button>

      <motion.button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm text-purple-600 rounded-full flex items-center justify-center shadow-lg z-20"
        onClick={nextSlide}
        whileHover={{ scale: 1.1, backgroundColor: "rgba(147, 51, 234, 0.1)" }}
        whileTap={{ scale: 0.9 }}
      >
        <FaChevronRight />
      </motion.button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {products.map((_, index) => (
          <motion.button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-purple-600 w-6" : "bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(index)}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>
    </div>
  )
}

// Floating Product Card Component
const FloatingProductCard = ({ product, index, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{
        y: -10,
        rotateX: 5,
        rotateY: 5,
        scale: 1.02,
        transition: { duration: 0.3 },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500" />

      <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 transform-gpu">
        {/* Floating elements */}
        <motion.div
          className="absolute top-2 right-2 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full z-10"
          animate={{
            y: [0, -5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <ShopItems {...product} />

        {/* Hover overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-transparent flex items-end justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="flex gap-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <motion.button
                  className="w-10 h-10 bg-white/90 text-purple-600 rounded-full flex items-center justify-center backdrop-blur-sm"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaShoppingCart />
                </motion.button>
                <motion.button
                  className="w-10 h-10 bg-white/90 text-purple-600 rounded-full flex items-center justify-center backdrop-blur-sm"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaHeart />
                </motion.button>
                <motion.button
                  className="w-10 h-10 bg-white/90 text-purple-600 rounded-full flex items-center justify-center backdrop-blur-sm"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaEye />
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredData, setFilteredData] = useState(Data)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [sortOption, setSortOption] = useState("default")
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [viewMode, setViewMode] = useState("grid") // grid or carousel

  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])

  const categories = ["All", ...new Set(Data.map((item) => item.category))]
  const productsRef = useRef(null)

  // Featured products (first 6 items for carousel)
  const featuredProducts = Data.slice(0, 6)

  const discount = () => toast.success("🎉 You have claimed a 20% discount! Use code SHOP20 at checkout.")

  // Handle scroll events for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // Scroll to products function
  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Filter and sort products
  useEffect(() => {
    setIsLoading(true)

    const timer = setTimeout(() => {
      let results = Data.filter(
        (item) =>
          item.item.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (selectedCategory === "All" || item.category === selectedCategory),
      )

      // Sort based on selected option
      switch (sortOption) {
        case "price-asc":
          results = results.sort((a, b) => a.price - b.price)
          break
        case "price-desc":
          results = results.sort((a, b) => b.price - a.price)
          break
        case "name-asc":
          results = results.sort((a, b) => a.item.localeCompare(b.item))
          break
        case "name-desc":
          results = results.sort((a, b) => b.item.localeCompare(a.item))
          break
        default:
          break
      }

      setFilteredData(results)
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm, selectedCategory, sortOption])

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Enhanced Hero Section */}
      <motion.section
        className="relative h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black overflow-hidden"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        {/* Animated background */}
        <motion.img
          src={heroimage}
          alt="Hero Image"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
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
        </div>

        {/* Geometric shapes */}
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 border border-purple-400/30 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        <motion.div
          className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-lg"
          animate={{
            rotate: [0, 45, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
        />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4 z-10">
          <motion.div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <HiSparkles className="text-yellow-400" />
            <span className="text-sm">Premium Shopping Experience</span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Welcome to{" "}
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
              LKH Store
            </motion.span>
          </motion.h1>

          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-pink-400 to-purple-400 mb-8 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          />

          <motion.p
            className="text-xl md:text-2xl text-center max-w-3xl mb-12 text-gray-200"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Experience the future of shopping with immersive 3D product previews, AI-powered recommendations, and
            seamless transactions in our digital universe.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <motion.button
              onClick={discount}
              className="group relative px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 rounded-full font-semibold text-lg shadow-2xl overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-2">
                <FaGem />
                Claim 20% Discount
              </span>
            </motion.button>

            <motion.button
              onClick={scrollToProducts}
              className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-full font-semibold text-lg shadow-2xl hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                <FaRocket />
                Explore Products
                <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
                  <FaChevronRight />
                </motion.div>
              </span>
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <p className="text-sm mb-2">Scroll to explore</p>
          <FaChevronDown />
        </motion.div>
      </motion.section>

      {/* 3D Featured Products Carousel */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
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

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-purple-500/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <FaCube className="text-purple-600" />
              <span className="text-purple-600 text-sm font-medium">3D Featured Collection</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Immersive{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                Product Experience
              </span>
            </h2>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Navigate through our premium collection with our revolutionary 3D carousel interface
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <Carousel3D products={featuredProducts} title="Featured Products" />
          </motion.div>
        </div>
      </section>

      {/* Enhanced Search and Filter Section */}
      <section ref={productsRef} className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Search Bar */}
            <div className="relative w-full lg:w-1/2">
              <motion.input
                type="text"
                placeholder="Search for amazing products..."
                className="w-full py-4 px-6 pr-14 rounded-2xl border-2 border-gray-200 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                whileFocus={{ scale: 1.02 }}
              />
              <motion.div
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaSearch className="text-white" />
              </motion.div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-4 items-center">
              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-xl p-1">
                <motion.button
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    viewMode === "grid" ? "bg-white text-purple-600 shadow-md" : "text-gray-600 hover:text-purple-600"
                  }`}
                  onClick={() => setViewMode("grid")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Grid View
                </motion.button>
                <motion.button
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    viewMode === "carousel"
                      ? "bg-white text-purple-600 shadow-md"
                      : "text-gray-600 hover:text-purple-600"
                  }`}
                  onClick={() => setViewMode("carousel")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  3D View
                </motion.button>
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="appearance-none bg-white border-2 border-gray-200 text-gray-700 py-3 px-4 pr-10 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300"
                >
                  <option value="default">Sort By: Default</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                  <FaChevronDown className="h-4 w-4" />
                </div>
              </div>

              {/* Filter Button */}
              <motion.button
                className="flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <FaFilter className="mr-2" />
                Filters
              </motion.button>
            </div>
          </motion.div>

          {/* Filter Panel */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 mb-12 border border-purple-100"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <FaTags className="text-purple-600" />
                  Filter by Categories
                </h3>
                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <motion.button
                      key={category}
                      className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                        selectedCategory === category
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                          : "bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-300 hover:text-purple-600"
                      }`}
                      onClick={() => setSelectedCategory(category)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results count */}
          <motion.div
            className="flex justify-between items-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-gray-600 text-lg">
              Showing <span className="font-bold text-purple-600">{filteredData.length}</span>{" "}
              {filteredData.length === 1 ? "product" : "products"}
              {selectedCategory !== "All" && (
                <span>
                  {" "}
                  in <span className="font-medium text-purple-600">{selectedCategory}</span>
                </span>
              )}
              {searchTerm && (
                <span>
                  {" "}
                  matching "<span className="font-medium text-purple-600">{searchTerm}</span>"
                </span>
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white min-h-[600px]">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-32">
              <motion.div
                className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
              <motion.p
                className="mt-4 text-gray-600 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Loading amazing products...
              </motion.p>
            </div>
          ) : (
            <>
              {filteredData.length > 0 ? (
                viewMode === "grid" ? (
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    {filteredData.map((item, index) => (
                      <FloatingProductCard key={item.id} product={item} index={index} delay={index * 0.1} />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <Carousel3D products={filteredData.slice(0, 10)} title="All Products" />
                  </motion.div>
                )
              ) : (
                <motion.div
                  className="text-center py-32"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center"
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
                    <FaSearch className="text-4xl text-purple-400" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4">No products found</h3>
                  <p className="text-gray-500 mb-8 max-w-md mx-auto">
                    We couldn't find any products matching your criteria. Try adjusting your search or filters.
                  </p>

                  <motion.button
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedCategory("All")
                      setSortOption("default")
                    }}
                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Reset All Filters
                  </motion.button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.4, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center text-white"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="w-20 h-20 mx-auto mb-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center"
              whileHover={{
                scale: 1.1,
                rotate: 360,
                boxShadow: "0 25px 50px -12px rgba(251, 191, 36, 0.4)",
              }}
              transition={{ duration: 0.6 }}
            >
              <FaShieldAlt className="text-3xl text-white" />
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Experience the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Future?
              </span>
            </h2>

            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Join thousands of satisfied customers and discover premium products with our revolutionary 3D shopping
              experience. Free shipping on orders over $50!
            </p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.button
                onClick={discount}
                className="group relative px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 rounded-full font-semibold text-lg shadow-2xl overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center gap-2">
                  <FaGem />
                  Claim 20% Discount
                  <FaChevronRight />
                </span>
              </motion.button>

              <motion.button
                onClick={scrollToTop}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Back to Top
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-2xl z-50 flex items-center justify-center"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0, rotate: 180 }}
            whileHover={{
              scale: 1.1,
              boxShadow: "0 20px 40px -10px rgba(147, 51, 234, 0.4)",
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <FaArrowUp className="text-xl" />
          </motion.button>
        )}
      </AnimatePresence>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  )
}
