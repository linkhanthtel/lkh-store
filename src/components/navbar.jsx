import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { FcGoogle } from "react-icons/fc"
import { ImHome3 } from "react-icons/im"
import { FaShoppingBag, FaSearch, FaMoon, FaSun, FaUserCircle, FaShoppingCart } from "react-icons/fa"
import { BsMinecart } from "react-icons/bs"
import { MdSell, MdExpandMore, MdKeyboardArrowRight } from "react-icons/md"
import { CiMenuFries } from "react-icons/ci"
import { RxCross2 } from "react-icons/rx"

const categories = ["Electronics", "Clothing", "Books", "Home & Garden"]

export const Navbar = () => {
  const [toggle, setToggle] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [showCategories, setShowCategories] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setToggle(false)
    setShowCategories(false)
  }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  // Animation variants
  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  const mobileMenuVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  }

  const menuItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.2 },
    },
    exit: {
      x: -20,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  }

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  }

  const dropdownItemVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.2 },
    },
    exit: {
      x: -10,
      opacity: 0,
      transition: { duration: 0.1 },
    },
  }

  return (
    <div className={`${darkMode ? "dark" : ""} sticky top-0 z-50`}>
      <motion.div
        className={`bg-white dark:bg-gray-900 shadow-md transition-all duration-300 ${scrolled ? "shadow-lg" : ""}`}
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Mobile Menu */}
        <div className="md:hidden flex justify-between items-center p-3 bg-gradient-to-r from-purple-700 to-blue-700">
          <div className="flex items-center">
            <motion.button onClick={() => setToggle(!toggle)} whileTap={{ scale: 0.95 }} className="mr-3 p-1">
              {toggle ? <RxCross2 className="text-2xl text-white" /> : <CiMenuFries className="text-2xl text-white" />}
            </motion.button>
            <Link to="/" className="flex items-center">
              <motion.img
                src="/logo.png"
                alt="Logo"
                className="w-8 h-8 mr-2"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              />
              <h1 className="text-lg font-bold text-white">LKH Store</h1>
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            <motion.button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-white/10 backdrop-blur-sm text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-white" />}
            </motion.button>
            <Link to="/cart">
              <motion.div className="relative p-2" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <FaShoppingCart className="text-xl text-white" />
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-xs text-gray-900 font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </motion.div>
            </Link>
          </div>
        </div>

        <AnimatePresence>
          {toggle && (
            <motion.nav
              className="w-full bg-gradient-to-b from-blue-800 to-purple-900 text-white overflow-hidden"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="p-4 mb-2">
                <div className="relative flex items-center bg-white/10 backdrop-blur-sm rounded-full overflow-hidden mb-4">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full py-2 px-4 bg-transparent text-white placeholder-gray-300 focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <motion.button
                    className="bg-white/20 text-white p-2 rounded-full mr-1"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaSearch />
                  </motion.button>
                </div>

                <motion.button
                  className="flex items-center justify-center w-full px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FcGoogle className="mr-2 text-lg" />
                  <span>Sign In with Google</span>
                </motion.button>
              </div>

              <motion.div className="border-t border-white/10 pt-2" variants={menuItemVariants}>
                <Link
                  to="/"
                  className="flex items-center justify-between px-6 py-3 hover:bg-white/10 transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <ImHome3 className="mr-3 text-lg" />
                    <span>Home</span>
                  </div>
                  <MdKeyboardArrowRight className="text-gray-400" />
                </Link>
              </motion.div>

              <motion.div className="border-t border-white/10" variants={menuItemVariants}>
                <Link
                  to="/shop"
                  className="flex items-center justify-between px-6 py-3 hover:bg-white/10 transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <FaShoppingBag className="mr-3 text-lg" />
                    <span>Shop</span>
                  </div>
                  <MdKeyboardArrowRight className="text-gray-400" />
                </Link>
              </motion.div>

              <motion.div className="border-t border-white/10" variants={menuItemVariants}>
                <Link
                  to="/cart"
                  className="flex items-center justify-between px-6 py-3 hover:bg-white/10 transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <BsMinecart className="mr-3 text-lg" />
                    <span>Cart</span>
                  </div>
                  <MdKeyboardArrowRight className="text-gray-400" />
                </Link>
              </motion.div>

              <motion.div className="border-t border-white/10" variants={menuItemVariants}>
                <Link
                  to="/bestsellers"
                  className="flex items-center justify-between px-6 py-3 hover:bg-white/10 transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <MdSell className="mr-3 text-lg" />
                    <span>Best Sellers</span>
                  </div>
                  <MdKeyboardArrowRight className="text-gray-400" />
                </Link>
              </motion.div>

              <motion.div className="border-t border-white/10 pb-2" variants={menuItemVariants}>
                <div className="px-6 py-3 text-gray-300 text-sm">
                  <h3 className="font-semibold mb-2">Categories</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category, index) => (
                      <Link
                        key={index}
                        to={`/shop?category=${category}`}
                        className="px-3 py-1.5 bg-white/5 rounded-md hover:bg-white/10 transition-colors duration-200"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.nav>
          )}
        </AnimatePresence>

        {/* Desktop Menu */}
        <div className="hidden md:flex md:flex-col">
          <div
            className={`flex justify-between items-center p-3 bg-gradient-to-r from-purple-700 to-blue-700 text-white transition-all duration-300 ${
              scrolled ? "py-2" : "py-3"
            }`}
          >
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <motion.img
                  src="/logo.png"
                  alt="Logo"
                  className="w-8 h-8 mr-2"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                />
                <h1 className="text-xl font-bold">LKH Store</h1>
              </Link>
            </div>

            <div className="relative">
              <motion.div
                className={`flex items-center bg-white/10 backdrop-blur-sm rounded-full overflow-hidden transition-all duration-300`}
                animate={{ width: searchFocused ? 384 : 256 }}
              >
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full py-2 px-4 bg-transparent text-white placeholder-gray-300 focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
                <motion.button
                  className="bg-white/20 text-white p-2 rounded-full mr-1"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaSearch />
                </motion.button>
              </motion.div>
            </div>

            <div className="flex items-center space-x-4">
              <motion.button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-white/10 backdrop-blur-sm text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-white" />}
              </motion.button>

              <Link to="/cart">
                <motion.div className="relative p-2" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <FaShoppingCart className="text-xl text-white" />
                  <span className="absolute -top-1 -right-1 bg-yellow-400 text-xs text-gray-900 font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                </motion.div>
              </Link>

              <motion.button
                className="flex items-center px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FcGoogle className="mr-2 text-lg" />
                <span>Sign In</span>
              </motion.button>
            </div>
          </div>

          <nav
            className={`flex justify-between items-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-sm transition-all duration-300 ${
              scrolled ? "py-2" : "py-3"
            }`}
          >
            <div className="flex space-x-8">
              <Link
                to="/"
                className={`flex items-center hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 ${
                  location.pathname === "/" ? "text-purple-600 dark:text-purple-400 font-medium" : ""
                }`}
              >
                <ImHome3 className="mr-1.5" />
                <span>Home</span>
              </Link>

              <div className="relative">
                <motion.button
                  className={`flex items-center hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 ${
                    location.pathname === "/shop" ? "text-purple-600 dark:text-purple-400 font-medium" : ""
                  }`}
                  onClick={() => setShowCategories(!showCategories)}
                  onMouseEnter={() => setShowCategories(true)}
                  onMouseLeave={() => setShowCategories(false)}
                >
                  <FaShoppingBag className="mr-1.5" />
                  <span>Shop</span>
                  <MdExpandMore
                    className={`ml-1 transform transition-transform duration-200 ${showCategories ? "rotate-180" : ""}`}
                  />
                </motion.button>

                <AnimatePresence>
                  {showCategories && (
                    <motion.div
                      className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 z-10 shadow-lg rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 min-w-[180px]"
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      onMouseEnter={() => setShowCategories(true)}
                      onMouseLeave={() => setShowCategories(false)}
                    >
                      <div className="py-1">
                        <Link
                          to="/shop"
                          className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-purple-50 dark:hover:bg-gray-700 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
                        >
                          All Products
                        </Link>

                        {categories.map((category, index) => (
                          <motion.div key={index} variants={dropdownItemVariants}>
                            <Link
                              to={`/shop?category=${category}`}
                              className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-purple-50 dark:hover:bg-gray-700 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
                            >
                              {category}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to="/cart"
                className={`flex items-center hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 ${
                  location.pathname === "/cart" ? "text-purple-600 dark:text-purple-400 font-medium" : ""
                }`}
              >
                <BsMinecart className="mr-1.5" />
                <span>Cart</span>
              </Link>

              <Link
                to="/bestsellers"
                className={`flex items-center hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 ${
                  location.pathname === "/bestsellers" ? "text-purple-600 dark:text-purple-400 font-medium" : ""
                }`}
              >
                <MdSell className="mr-1.5" />
                <span>Best Sellers</span>
              </Link>
            </div>

            <div className="flex items-center">
              <Link
                to="/"
                className="flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
              >
                <FaUserCircle className="mr-1.5 text-lg" />
                <span>My Account</span>
              </Link>
            </div>
          </nav>
        </div>
      </motion.div>
    </div>
  )
}
