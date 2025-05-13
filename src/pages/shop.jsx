import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Data } from "../data/data"
import { ShopItems } from "../components/shopitems"
import heroimage from "../images/hero.jpg"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { FaSearch, FaFilter, FaArrowUp, FaChevronDown, FaChevronRight, FaTags } from "react-icons/fa"

export const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredData, setFilteredData] = useState(Data)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [sortOption, setSortOption] = useState("default")
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const categories = ["All", ...new Set(Data.map((item) => item.category))]
  const productsRef = useRef(null)

  // Featured products (first 3 items)
  const featuredProducts = Data.slice(0, 3)

  const discount = () => toast.success("You have claimed a 20% discount! Use code SHOP20 at checkout.")

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

    // Simulate loading delay for better UX
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
          // Keep default order
          break
      }

      setFilteredData(results)
      setIsLoading(false)
    }, 300) // Short delay for loading effect

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
        staggerChildren: 0.05,
      },
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50 min-h-screen"
    >
      {/* Hero Section with Parallax Effect */}
      <div className="relative h-[500px] bg-gradient-to-r from-blue-600 to-purple-700 overflow-hidden">
        <motion.img
          src={heroimage}
          alt="Hero Image"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-70"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />

        {/* Animated particles for visual interest */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white opacity-10"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                x: [0, Math.random() * 100 - 50],
                scale: [1, Math.random() + 0.5, 1],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4 text-center"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Welcome to LKH Store
          </motion.h1>

          <motion.div
            className="w-24 h-1 bg-yellow-400 mb-6"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />

          <motion.p
            className="text-xl md:text-2xl text-center max-w-2xl mb-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Reward yourself with amazing items and products. Experience the best online shopping with awesome items at
            reasonable prices.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.button
              onClick={discount}
              className="px-8 py-4 bg-yellow-400 text-gray-900 rounded-full font-semibold text-lg shadow-lg hover:bg-yellow-300 transition duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              Claim 20% Discount
            </motion.button>

            <motion.button
              onClick={scrollToProducts}
              className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white border-2 border-white rounded-full font-semibold text-lg shadow-lg hover:bg-white/30 transition duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              Shop Now
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll down indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <p className="text-sm mb-2">Scroll to explore</p>
          <FaChevronDown />
        </motion.div>
      </div>

      {/* Featured Products Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <motion.div
              className="w-24 h-1 bg-purple-600 mx-auto mb-4"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <p className="text-gray-600 max-w-2xl mx-auto">Check out our handpicked selection of premium products</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {featuredProducts.map((product, index) => (
              <motion.div key={product.id} variants={fadeInUp} className="relative">
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-bold px-3 py-1 rounded-full flex items-center">
                    <FaTags className="mr-1" /> Featured
                  </div>
                </div>
                <ShopItems {...product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div ref={productsRef} className="bg-white py-12 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="relative w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-3 px-5 pr-12 rounded-full border-2 border-gray-300 focus:outline-none focus:border-purple-500 transition-colors duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="appearance-none bg-gray-100 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="default">Sort By: Default</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>

              <motion.button
                className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaFilter className="mr-2" />
                Filters
              </motion.button>
            </div>
          </div>

          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden bg-gray-50 rounded-xl p-6 mb-8"
              >
                <h3 className="text-lg font-semibold mb-4">Categories</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {categories.map((category) => (
                    <motion.button
                      key={category}
                      className={`px-4 py-2 rounded-full ${
                        selectedCategory === category
                          ? "bg-purple-600 text-white"
                          : "bg-white text-gray-700 border border-gray-300"
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
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Showing {filteredData.length} {filteredData.length === 1 ? "product" : "products"}
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </div>
        </div>
      </div>

      {/* Items Section */}
      <div className="bg-gray-50 py-12 min-h-[400px]">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
            </div>
          ) : (
            <>
              {filteredData.length > 0 ? (
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                >
                  {filteredData.map((item) => (
                    <motion.div key={item.id} variants={fadeInUp}>
                      <ShopItems {...item} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  className="text-center py-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <svg
                    className="mx-auto h-16 w-16 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No products found</h3>
                  <p className="mt-2 text-gray-500">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                  <motion.button
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedCategory("All")
                      setSortOption("default")
                    }}
                    className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Reset Filters
                  </motion.button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-purple-700 to-blue-600 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Shop?</h2>
            <p className="mb-8 text-white/80">
              Explore our collection and find the perfect items for you. Free shipping on orders over $50!
            </p>
            <motion.button
              onClick={discount}
              className="px-8 py-4 bg-yellow-400 text-gray-900 rounded-full font-semibold text-lg shadow-lg hover:bg-yellow-300 transition duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              Claim 20% Discount <FaChevronRight className="inline ml-2" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            className="fixed bottom-6 right-6 p-3 bg-purple-600 text-white rounded-full shadow-lg z-40"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </motion.div>
  )
}
