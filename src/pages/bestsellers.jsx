import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Data } from "../data/data"
import BestSellingItems from "../components/bestsellingitems"
import { FaTrophy, FaFire, FaStar, FaChartLine, FaGem, FaRocket, FaSearch, FaArrowUp } from "react-icons/fa"
import { HiSparkles } from "react-icons/hi"

// Animated Background Component
const AnimatedBackground = () => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    let time = 0

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const animate = () => {
      time += 0.01

      // Clear canvas with gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, `hsl(${240 + Math.sin(time * 0.5) * 20}, 70%, 3%)`)
      gradient.addColorStop(0.5, `hsl(${260 + Math.cos(time * 0.3) * 15}, 60%, 5%)`)
      gradient.addColorStop(1, `hsl(${280 + Math.sin(time * 0.7) * 25}, 65%, 4%)`)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw floating particles
      for (let i = 0; i < 30; i++) {
        const x = (Math.sin(time + i) * canvas.width) / 4 + canvas.width / 2
        const y = (Math.cos(time * 0.7 + i) * canvas.height) / 6 + canvas.height / 2
        const size = Math.sin(time * 2 + i) * 2 + 3

        const particleGradient = ctx.createRadialGradient(x, y, 0, x, y, size * 3)
        particleGradient.addColorStop(0, `hsla(${270 + i * 10}, 70%, 60%, 0.8)`)
        particleGradient.addColorStop(1, `hsla(${270 + i * 10}, 70%, 60%, 0)`)

        ctx.fillStyle = particleGradient
        ctx.beginPath()
        ctx.arc(x, y, size * 3, 0, Math.PI * 2)
        ctx.fill()
      }

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

// Stats Component
const StatsSection = () => {
  const stats = [
    { icon: FaTrophy, label: "Top Products", value: "50+", color: "#f59e0b" },
    { icon: FaFire, label: "Hot Deals", value: "25", color: "#ef4444" },
    { icon: FaStar, label: "5-Star Rated", value: "40+", color: "#8b5cf6" },
    { icon: FaChartLine, label: "Sales Growth", value: "+150%", color: "#10b981" },
  ]

  return (
    <motion.div
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 mb-12 lg:mb-20"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, staggerChildren: 0.2 }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="relative group"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          whileHover={{
            scale: 1.05,
            rotateY: 10,
            rotateX: 5,
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 lg:p-6 text-center relative overflow-hidden">
            {/* Glow effect */}
            <div
              className="absolute inset-0 rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at center, ${stat.color}40, transparent 70%)`,
              }}
            />

            <motion.div
              className="relative w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-3 lg:mb-4 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: stat.color }}
              animate={{
                rotateY: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotateY: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                scale: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              }}
            >
              <stat.icon className="text-white text-xl lg:text-2xl" />
            </motion.div>

            <motion.div
              className="text-2xl lg:text-3xl font-bold text-white mb-1 lg:mb-2"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
            >
              {stat.value}
            </motion.div>

            <div className="text-sm lg:text-base text-gray-300 font-medium">{stat.label}</div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

// Filter and Sort Component
const FilterSort = ({ sortOption, setSortOption, filterCategory, setFilterCategory }) => {
  const categories = ["All", ...new Set(Data.map((item) => item.category))]

  return (
    <motion.div
      className="flex flex-col lg:flex-row gap-4 lg:gap-6 mb-8 lg:mb-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Category Filter */}
      <div className="flex-1">
        <label className="block text-white text-sm font-medium mb-2">Filter by Category</label>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                filterCategory === category
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                  : "bg-white/10 text-purple-200 border border-white/20 hover:bg-white/20"
              }`}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              whileTap={{ scale: 0.95 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div className="lg:w-64">
        <label className="block text-white text-sm font-medium mb-2">Sort by</label>
        <motion.select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
          whileHover={{ scale: 1.02 }}
          whileFocus={{ scale: 1.02 }}
        >
          <option value="default" className="bg-gray-800">
            Default
          </option>
          <option value="price-low" className="bg-gray-800">
            Price: Low to High
          </option>
          <option value="price-high" className="bg-gray-800">
            Price: High to Low
          </option>
          <option value="name-asc" className="bg-gray-800">
            Name: A to Z
          </option>
          <option value="name-desc" className="bg-gray-800">
            Name: Z to A
          </option>
        </motion.select>
      </div>
    </motion.div>
  )
}

function BestSellers() {
  const [filteredData, setFilteredData] = useState(Data)
  const [sortOption, setSortOption] = useState("default")
  const [filterCategory, setFilterCategory] = useState("All")
  const [showBackToTop, setShowBackToTop] = useState(false)
  const { scrollYProgress } = useScroll()

  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    let results = Data

    // Filter by category
    if (filterCategory !== "All") {
      results = results.filter((item) => item.category === filterCategory)
    }

    // Sort results
    switch (sortOption) {
      case "price-low":
        results = results.sort((a, b) => a.price - b.price)
        break
      case "price-high":
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
  }, [sortOption, filterCategory])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />

      <div className="relative z-10">
        {/* Hero Section */}
        <motion.section
          className="relative pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="container mx-auto px-4 lg:px-8">
            {/* Hero Content */}
            <motion.div
              className="text-center mb-12 lg:mb-20"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-full px-4 lg:px-6 py-2 lg:py-3 mb-6 lg:mb-8 border border-yellow-400/30"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <FaTrophy className="text-yellow-400 text-lg lg:text-xl" />
                </motion.div>
                <span className="text-yellow-300 text-sm lg:text-base font-medium">Best Sellers Collection</span>
              </motion.div>

              {/* Main Title */}
              <motion.h1
                className="text-4xl lg:text-6xl xl:text-7xl font-bold mb-6 lg:mb-8 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="text-white">Best Selling</span>
                <br />
                <motion.span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"
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
                  Items
                </motion.span>
                <span className="text-white"> of the Month</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="text-lg lg:text-xl xl:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 lg:mb-12 leading-relaxed px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Discover our most popular products that customers can't get enough of.
                <br className="hidden lg:block" />
                <span className="text-yellow-400">Premium quality, unbeatable prices, and trending designs.</span>
              </motion.p>

              {/* Floating Icons */}
              <div className="relative">
                {[FaFire, FaStar, FaGem, FaRocket].map((Icon, index) => (
                  <motion.div
                    key={index}
                    className="absolute w-8 h-8 lg:w-12 lg:h-12 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: ["#ef4444", "#f59e0b", "#8b5cf6", "#ec4899"][index],
                      top: `${50 + Math.sin((index * 90 * Math.PI) / 180) * 60}px`,
                      left: `${50 + Math.cos((index * 90 * Math.PI) / 180) * 80}px`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      rotate: [0, 360],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 4 + index,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: index * 0.5,
                      ease: "easeInOut",
                    }}
                  >
                    <Icon className="text-white text-sm lg:text-lg" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Stats Section */}
            <StatsSection />
          </div>
        </motion.section>

        {/* Filter and Products Section */}
        <section className="relative py-8 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Filter and Sort */}
            <FilterSort
              sortOption={sortOption}
              setSortOption={setSortOption}
              filterCategory={filterCategory}
              setFilterCategory={setFilterCategory}
            />

            {/* Results Info */}
            <motion.div
              className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 lg:mb-12 gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-white">
                <h2 className="text-xl lg:text-2xl font-bold mb-2">
                  Showing <span className="text-yellow-400">{filteredData.length}</span> products
                  {filterCategory !== "All" && (
                    <span className="text-gray-300">
                      {" "}
                      in <span className="text-purple-400">{filterCategory}</span>
                    </span>
                  )}
                </h2>
                <p className="text-gray-400">Handpicked bestsellers just for you</p>
              </div>

              <motion.div
                className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/10"
                whileHover={{ scale: 1.02 }}
              >
                <HiSparkles className="text-yellow-400" />
                <span className="text-white text-sm font-medium">Premium Collection</span>
              </motion.div>
            </motion.div>

            {/* Products Grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 lg:gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <AnimatePresence>
                {filteredData.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 100,
                    }}
                    whileHover={{
                      scale: 1.02,
                      rotateY: 5,
                      rotateX: 5,
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <BestSellingItems {...item} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Empty State */}
            {filteredData.length === 0 && (
              <motion.div
                className="text-center py-16 lg:py-24"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-20 h-20 lg:w-24 lg:h-24 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <FaSearch className="text-white text-2xl lg:text-3xl" />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-4">No products found</h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  Try adjusting your filters or browse our complete collection
                </p>
                <motion.button
                  onClick={() => {
                    setFilterCategory("All")
                    setSortOption("default")
                  }}
                  className="px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Reset Filters
                </motion.button>
              </motion.div>
            )}
          </div>
        </section>

        {/* Back to Top Button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              className="fixed bottom-6 lg:bottom-8 right-6 lg:right-8 w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-2xl z-50 flex items-center justify-center"
              onClick={scrollToTop}
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0, rotate: 180 }}
              whileHover={{
                scale: 1.1,
                boxShadow: "0 20px 40px -10px rgba(147, 51, 234, 0.6)",
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <FaArrowUp className="text-lg lg:text-xl" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default BestSellers
