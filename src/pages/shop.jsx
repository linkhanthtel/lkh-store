import { useState, useEffect, useRef, useContext } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Data } from "../data/data"
import { ShopContext } from "../contexts/shopcontext"
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
  FaShoppingCart,
  FaRocket,
  FaGem,
  FaShieldAlt,
  FaCube,
} from "react-icons/fa"
import { HiSparkles } from "react-icons/hi"

// Smooth Lightweight Carousel
const SmoothCarousel = ({ products, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const { getItemQuantity, increaseItemQuantity } = useContext(ShopContext)

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

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  const handleAddToCart = (product) => {
    increaseItemQuantity(product.id)
    toast.success(`🛒 ${product.item} added to cart!`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  }

  return (
    <div
      className="relative w-full h-[600px] overflow-hidden rounded-2xl"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Simple Background */}

      {/* Carousel Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="absolute w-full max-w-lg mx-auto px-8"
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -300, scale: 0.8 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
          >
            {/* Product Card */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Product Image */}
              <div className="relative h-80 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8">
                <img
                  src={products[currentIndex].imageURL || `/placeholder.svg?height=300&width=300`}
                  alt={products[currentIndex].item}
                  className="max-w-full max-h-full object-contain"
                />

                {/* Cart Quantity Badge */}
                {getItemQuantity(products[currentIndex].id) > 0 && (
                  <div className="absolute top-4 right-4 bg-purple-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                    {getItemQuantity(products[currentIndex].id)}
                  </div>
                )}

                {/* Price Tag */}
                <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  ${products[currentIndex].price}
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="p-6">
                <motion.button
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 shadow-lg"
                  onClick={() => handleAddToCart(products[currentIndex])}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaShoppingCart />
                  Add to Cart
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 text-gray-800 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors z-10"
        onClick={prevSlide}
      >
        <FaChevronLeft />
      </button>

      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 text-gray-800 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors z-10"
        onClick={nextSlide}
      >
        <FaChevronRight />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {products.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/70"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-white/20 rounded-full overflow-hidden z-10">
        <motion.div
          className="h-full bg-white rounded-full"
          animate={{
            width: `${((currentIndex + 1) / products.length) * 100}%`,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  )
}

export const Shop = () => {
  const { cartItem, cartQuantity, getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeItem } =
    useContext(ShopContext)

  const [searchTerm, setSearchTerm] = useState("")
  const [filteredData, setFilteredData] = useState(Data)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [sortOption, setSortOption] = useState("default")
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])

  const categories = ["All", ...new Set(Data.map((item) => item.category))]
  const productsRef = useRef(null)
  const featuredProducts = Data.slice(0, 8)

  const discount = () => toast.success("🎉 You have claimed a 20% discount! Use code SHOP20 at checkout.")

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    setIsLoading(true)

    const timer = setTimeout(() => {
      let results = Data.filter(
        (item) =>
          item.item.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (selectedCategory === "All" || item.category === selectedCategory),
      )

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
    }, 200)

    return () => clearTimeout(timer)
  }, [searchTerm, selectedCategory, sortOption])

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="relative h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black overflow-hidden"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <motion.img
          src={heroimage}
          alt="Hero Image"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4 z-10">
          <motion.div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <HiSparkles className="text-yellow-400 text-lg" />
            <span className="text-sm font-medium">Premium Shopping Experience</span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-8 text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">
              LKH Store
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-center max-w-4xl mb-12 text-gray-200"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Experience smooth shopping with our optimized carousel and seamless cart functionality.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <motion.button
              onClick={discount}
              className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 rounded-full font-semibold text-lg shadow-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                <FaGem />
                Claim 20% Discount
              </span>
            </motion.button>

            <motion.button
              onClick={scrollToProducts}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                <FaRocket />
                Explore Products
                <FaChevronRight />
              </span>
            </motion.button>
          </motion.div>

          {cartQuantity > 0 && (
            <motion.div
              className="mt-8 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 }}
            >
              <FaShoppingCart className="text-yellow-400" />
              <span className="text-white font-medium">
                {cartQuantity} {cartQuantity === 1 ? "item" : "items"} in cart
              </span>
            </motion.div>
          )}
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <p className="text-sm mb-2">Scroll to explore</p>
          <FaChevronDown />
        </motion.div>
      </motion.section>

      {/* Carousel Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div className="inline-flex items-center gap-2 bg-purple-500/10 rounded-full px-6 py-2 mb-6">
              <FaCube className="text-purple-600" />
              <span className="text-purple-600 text-sm font-medium">Featured Collection</span>
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Smooth{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                Product Showcase
              </span>
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse our featured products with smooth transitions and optimized performance
            </p>

            {cartQuantity > 0 && (
              <motion.div
                className="mt-6 inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <FaShoppingCart />
                <span className="font-medium">
                  {cartQuantity} {cartQuantity === 1 ? "item" : "items"} in your cart
                </span>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <SmoothCarousel products={featuredProducts} title="Featured Products" />
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section ref={productsRef} className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative w-full lg:w-1/2">
              <input
                type="text"
                placeholder="Search for amazing products..."
                className="w-full py-4 px-6 pr-14 rounded-2xl border-2 border-gray-200 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <FaSearch className="text-white" />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="appearance-none bg-white border-2 border-gray-200 text-gray-700 py-3 px-4 pr-10 rounded-xl focus:outline-none focus:border-purple-500 transition-all duration-300"
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

              <button
                className="flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <FaFilter className="mr-2" />
                Filters
              </button>

              {cartQuantity > 0 && (
                <div className="flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-3 rounded-xl">
                  <FaShoppingCart />
                  <span className="font-medium">{cartQuantity}</span>
                </div>
              )}
            </div>
          </motion.div>

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
                    <button
                      key={category}
                      className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                        selectedCategory === category
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                          : "bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-300 hover:text-purple-600"
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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

      {/* Grid Products Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white min-h-[600px]">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              All{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                Products
              </span>
            </h2>
            <p className="text-lg text-gray-600">Browse our complete collection</p>
          </motion.div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-32">
              <motion.div
                className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
              <p className="mt-4 text-gray-600 text-lg">Loading products...</p>
            </div>
          ) : (
            <>
              {filteredData.length > 0 ? (
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  {filteredData.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.02 }}
                    >
                      <ShopItems {...item} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  className="text-center py-32"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                    <FaSearch className="text-4xl text-purple-400" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4">No products found</h3>
                  <p className="text-gray-500 mb-8 max-w-md mx-auto">
                    We couldn't find any products matching your criteria. Try adjusting your search or filters.
                  </p>

                  <button
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedCategory("All")
                      setSortOption("default")
                    }}
                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Reset All Filters
                  </button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center text-white"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center">
              <FaShieldAlt className="text-3xl text-white" />
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Experience{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Smooth Shopping?
              </span>
            </h2>

            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Join thousands of satisfied customers and discover premium products with our optimized shopping
              experience. Free shipping on orders over $50!
            </p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <button
                onClick={discount}
                className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 rounded-full font-semibold text-lg shadow-2xl"
              >
                <span className="flex items-center gap-2">
                  <FaGem />
                  Claim 20% Discount
                  <FaChevronRight />
                </span>
              </button>

              <button
                onClick={scrollToTop}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300"
              >
                Back to Top
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-2xl z-50 flex items-center justify-center"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
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
    </div>
  )
}
