import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { CiCircleCheck } from "react-icons/ci"
import { FaShoppingCart, FaSearch, FaStar, FaArrowRight, FaQuoteLeft } from "react-icons/fa"
import { IoIosArrowDown } from "react-icons/io"
import appScreenShot from "../images/appScreenShot.png"

const includedFeatures = [
  "Private forum access",
  "Member resources",
  "Entry to annual conference",
  "Official member t-shirt",
]

const stats = [
  { id: 1, name: "Products", value: "+100" },
  { id: 2, name: "Customer Satisfaction", value: "5 Stars" },
  { id: 3, name: "Number of users", value: "1K" },
]

const featuredProducts = [
  { id: 1, name: "Samsung Galaxy S23 Ultra", price: 1200, image: "/images/samsungs23ultra.jpg" },
  { id: 2, name: 'Macbook Pro 13" (M3 Pro)', price: 3100, image: "/images/mbpm3max.jpg" },
  { id: 3, name: 'Macbook Pro 16" (M3 Max)', price: 3900, image: "/images/mbpm3max16.jpg" },
]

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
}

function HomePage() {
  const [hoveredProduct, setHoveredProduct] = useState(null)
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState({
    hero: false,
    products: false,
    testimonial: false,
    pricing: false,
    stats: false,
  })

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Set visibility based on scroll position
      setIsVisible({
        hero: window.scrollY > 0,
        products: window.scrollY > 300,
        testimonial: window.scrollY > 800,
        pricing: window.scrollY > 1200,
        stats: window.scrollY > 1600,
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Parallax effect calculation
  const heroParallax = scrollY * 0.2
  const productParallax = (scrollY - 400) * 0.1

  return (
    <div className="overflow-hidden">
      {/* Hero Section with Parallax */}
      <motion.div
        className="relative min-h-screen flex items-center bg-gradient-to-b from-blue-900 to-purple-900"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* Background Elements */}
        <motion.div className="absolute inset-0 overflow-hidden" style={{ y: -heroParallax }}>
          <div className="absolute top-0 left-0 w-full h-full">
            <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            >
              <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
              <defs>
                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                  <stop stopColor="#7775D6" />
                  <stop offset={1} stopColor="#E935C1" />
                </radialGradient>
              </defs>
            </svg>
          </div>

          {/* Floating Elements */}
          <motion.div
            className="absolute top-20 right-20 w-20 h-20 rounded-full bg-purple-500 opacity-20"
            animate={{
              y: [0, 20, 0],
              x: [0, 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 5,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-40 left-20 w-32 h-32 rounded-full bg-blue-400 opacity-20"
            animate={{
              y: [0, -30, 0],
              x: [0, -15, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 7,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        <div className="container mx-auto px-6 py-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <motion.div className="lg:w-1/2 text-center lg:text-left" variants={fadeInUp}>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
                variants={fadeInUp}
              >
                Discover Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                  Style
                </span>
                <br />
                <span className="text-3xl md:text-4xl">Start using our app today.</span>
              </motion.h1>

              <motion.p className="mt-6 text-lg md:text-xl text-gray-200 max-w-lg mx-auto lg:mx-0" variants={fadeInUp}>
                Stay connected and entertained on the go with our versatile tablets. Perfect for work, study, or
                leisure.
              </motion.p>

              <motion.div
                className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                variants={fadeInUp}
              >
                <Link
                  to="/shop"
                  className="w-full sm:w-auto rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 text-base font-medium text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center"
                >
                  Shop Now
                </Link>
                <Link
                  to="#"
                  className="w-full sm:w-auto mt-3 sm:mt-0 group flex items-center justify-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-6 py-3 text-base font-medium text-white hover:bg-white/20 transition-all duration-300 text-center"
                >
                  Learn more
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>

              <motion.div className="mt-8 flex justify-center lg:justify-start" variants={fadeInUp}>
                <motion.a
                  href="#featured"
                  className="flex flex-col items-center text-white/70 hover:text-white transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  animate={{
                    y: [0, 10, 0],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 2,
                    ease: "easeInOut",
                  }}
                >
                  <span className="text-sm mb-2">Scroll to discover</span>
                  <IoIosArrowDown className="text-2xl" />
                </motion.a>
              </motion.div>
            </motion.div>

            <motion.div className="lg:w-1/2 relative" variants={scaleIn}>
              <motion.div
                className="relative z-10 rounded-2xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <img
                  alt="App screenshot"
                  src={appScreenShot || "/placeholder.svg"}
                  className="w-full h-auto rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500 rounded-full filter blur-3xl opacity-20" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500 rounded-full filter blur-3xl opacity-20" />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Featured Products */}
      <motion.div
        id="featured"
        className="py-24 bg-gradient-to-b from-white to-gray-50"
        initial={{ opacity: 0 }}
        animate={isVisible.products ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible.products ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible.products ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Featured Products
            </motion.h2>
            <motion.div
              className="h-1 w-20 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={isVisible.products ? { width: 80 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            variants={staggerContainer}
            initial="hidden"
            animate={isVisible.products ? "visible" : "hidden"}
          >
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                variants={scaleIn}
                whileHover={{
                  y: -10,
                  transition: { type: "spring", stiffness: 400, damping: 10 },
                }}
              >
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="h-64 w-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                    {product.name}
                  </h3>
                  <div className="mt-2 flex justify-between items-center">
                    <p className="text-xl font-bold text-gray-900">${product.price}</p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400 w-4 h-4" />
                      ))}
                    </div>
                  </div>
                </div>

                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <div className="flex gap-4">
                    <motion.button
                      className="bg-white text-purple-600 p-3 rounded-full hover:bg-purple-600 hover:text-white transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaShoppingCart className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      className="bg-white text-purple-600 p-3 rounded-full hover:bg-purple-600 hover:text-white transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaSearch className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      className="bg-white text-purple-600 p-3 rounded-full hover:bg-purple-600 hover:text-white transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaStar className="w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible.products ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              View All Products
              <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Testimonial Section */}
      <motion.section
        className="relative py-24 bg-gradient-to-b from-purple-900 to-blue-950 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={isVisible.testimonial ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,theme(colors.purple.400),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,theme(colors.blue.400),transparent_70%)]" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible.testimonial ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="mb-8 flex justify-center"
              initial={{ opacity: 0, y: -20 }}
              animate={isVisible.testimonial ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <FaQuoteLeft className="text-5xl text-purple-300 opacity-50" />
            </motion.div>

            <motion.blockquote
              className="text-xl md:text-2xl font-medium text-white leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isVisible.testimonial ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p>
                "The customer service was exceptional. I had a question about my order and received a prompt and helpful
                response. The product arrived well-packaged and in perfect condition."
              </p>
            </motion.blockquote>

            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible.testimonial ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="h-0.5 w-12 bg-purple-400 mx-auto mb-6" />
              <p className="text-lg font-semibold text-white">David</p>
              <p className="text-purple-300">Verified Customer</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.div
        className="py-24 bg-gradient-to-b from-white to-gray-50"
        initial={{ opacity: 0 }}
        animate={isVisible.pricing ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible.pricing ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible.pricing ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Simple no-tricks pricing
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={isVisible.pricing ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Choose the Membership That's Right for You
            </motion.p>
            <motion.div
              className="h-1 w-20 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto rounded-full mt-6"
              initial={{ width: 0 }}
              animate={isVisible.pricing ? { width: 80 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible.pricing ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              y: -5,
              transition: { type: "spring", stiffness: 300, damping: 15 },
            }}
          >
            <div className="lg:flex">
              <div className="p-8 lg:p-12 lg:w-7/12">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Lifetime membership</h3>
                <div className="h-1 w-12 bg-purple-600 rounded-full mb-6" />

                <p className="text-gray-600 mb-8">
                  Enjoy unlimited access to the latest tech gadgets and accessories, without ever having to pay full
                  price again.
                </p>

                <div className="flex items-center gap-x-4 mb-6">
                  <h4 className="text-sm font-semibold text-purple-600">What's included</h4>
                  <div className="h-px flex-auto bg-gray-200" />
                </div>

                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-8">
                  {includedFeatures.map((feature) => (
                    <motion.li
                      key={feature}
                      className="flex items-center gap-3"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <CiCircleCheck className="h-6 w-6 flex-none text-purple-600" />
                      <span className="text-gray-700">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-600 to-pink-500 p-8 lg:p-12 lg:w-5/12 flex flex-col justify-center text-white">
                <p className="text-lg font-semibold text-white/90 mb-4">Pay once, own it forever</p>
                <div className="flex items-end gap-2 mb-8">
                  <span className="text-5xl font-bold">$100</span>
                  <span className="text-xl mb-1 text-white/80">SGD</span>
                </div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="#"
                    className="block w-full py-3 px-6 text-center font-medium bg-white text-purple-600 rounded-full hover:bg-gray-100 transition-colors duration-300"
                  >
                    Get access
                  </Link>
                </motion.div>

                <p className="mt-6 text-sm text-white/80">
                  Invoices and receipts available for easy company reimbursement
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="py-24 bg-gradient-to-b from-blue-950 to-purple-900 text-white"
        initial={{ opacity: 0 }}
        animate={isVisible.stats ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
            variants={staggerContainer}
            initial="hidden"
            animate={isVisible.stats ? "visible" : "hidden"}
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.id}
                className="text-center"
                variants={scaleIn}
                whileHover={{
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300, damping: 10 },
                }}
              >
                <motion.div
                  className="text-5xl md:text-6xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible.stats ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {stat.value}
                </motion.div>
                <motion.div
                  className="h-1 w-12 bg-purple-400 mx-auto mb-4 rounded-full"
                  initial={{ width: 0 }}
                  animate={isVisible.stats ? { width: 48 } : { width: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                />
                <motion.div
                  className="text-xl text-gray-300"
                  initial={{ opacity: 0 }}
                  animate={isVisible.stats ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {stat.name}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to transform your shopping experience?
            </h2>
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have already discovered our premium products and exceptional
              service.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-medium text-lg hover:shadow-lg transition-all duration-300"
              >
                Start Shopping Now
                <FaArrowRight />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default HomePage
