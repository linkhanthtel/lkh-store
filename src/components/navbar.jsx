"use client"

import { useState, useEffect, useContext } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ImHome3 } from "react-icons/im"
import { FaShoppingBag, FaSearch, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa"
import { BsMinecart } from "react-icons/bs"
import { MdSell } from "react-icons/md"
import { HiSparkles } from "react-icons/hi"
import { ShopContext } from "../contexts/shopcontext"

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { cartQuantity } = useContext(ShopContext)

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // 3D Animation variants
  const navbarVariants = {
    hidden: {
      y: -100,
      opacity: 0,
      rotateX: -90,
      transformPerspective: 1000,
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transformPerspective: 1000,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8,
      },
    },
  }

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotateX: -90,
      transformPerspective: 1000,
      transformOrigin: "top center",
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transformPerspective: 1000,
      transformOrigin: "top center",
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      rotateX: -90,
      transformPerspective: 1000,
      transformOrigin: "top center",
      transition: {
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  }

  const menuItemVariants = {
    hidden: {
      opacity: 0,
      x: -50,
      rotateY: -45,
      transformPerspective: 1000,
    },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transformPerspective: 1000,
      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 200,
      },
    },
    exit: {
      opacity: 0,
      x: -50,
      rotateY: -45,
      transformPerspective: 1000,
      transition: { duration: 0.2 },
    },
  }

  const navigationItems = [
    { to: "/", icon: ImHome3, label: "Home" },
    { to: "/shop", icon: FaShoppingBag, label: "Shop" },
    { to: "/cart", icon: BsMinecart, label: "Cart" },
    { to: "/bestsellers", icon: MdSell, label: "Best Sellers" },
  ]

  return (
    <motion.div className="fixed top-0 w-full z-50" variants={navbarVariants} initial="hidden" animate="visible">
      {/* Main Navbar Container */}
      <motion.div
        className={`relative backdrop-blur-2xl border-b transition-all duration-500 ${
          scrolled
            ? "bg-black/20 border-purple-500/30 shadow-2xl shadow-purple-500/20"
            : "bg-black/10 border-purple-300/20 shadow-lg shadow-purple-500/10"
        }`}
        style={{
          background: scrolled
            ? "linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(147,51,234,0.1) 50%, rgba(59,130,246,0.1) 100%)"
            : "linear-gradient(135deg, rgba(0,0,0,0.2) 0%, rgba(147,51,234,0.05) 50%, rgba(59,130,246,0.05) 100%)",
        }}
        whileHover={{
          boxShadow: "0 25px 50px -12px rgba(147, 51, 234, 0.3)",
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating Orbs */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full opacity-30"
              style={{
                left: `${10 + i * 12}%`,
                top: "50%",
              }}
              animate={{
                y: [-15, 15, -15],
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
                rotateZ: [0, 180, 360],
              }}
              transition={{
                duration: 4 + i * 0.3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          ))}

          {/* Gradient Lines */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between p-4">
            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative p-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
              whileHover={{
                scale: 1.1,
                rotateY: 180,
                boxShadow: "0 15px 30px -5px rgba(147, 51, 234, 0.5)",
              }}
              whileTap={{ scale: 0.9 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotateZ: -90, opacity: 0 }}
                    animate={{ rotateZ: 0, opacity: 1 }}
                    exit={{ rotateZ: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaTimes className="text-lg" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotateZ: 90, opacity: 0 }}
                    animate={{ rotateZ: 0, opacity: 1 }}
                    exit={{ rotateZ: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaBars className="text-lg" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile Logo */}
            <Link to="/" className="flex items-center">
              <motion.div
                className="relative w-10 h-10 mr-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center shadow-xl"
                whileHover={{
                  rotateY: 360,
                  scale: 1.1,
                  boxShadow: "0 0 40px rgba(147, 51, 234, 0.8)",
                }}
                transition={{ duration: 0.8 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <HiSparkles className="text-white text-lg" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 blur opacity-50" />
              </motion.div>
              <motion.h1
                className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                LKH Store
              </motion.h1>
            </Link>

            {/* Mobile Cart */}
            <Link to="/cart">
              <motion.div
                className="relative p-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg"
                whileHover={{
                  scale: 1.1,
                  rotateY: 15,
                  rotateX: 15,
                  boxShadow: "0 15px 30px -5px rgba(147, 51, 234, 0.5)",
                }}
                whileTap={{ scale: 0.9 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <FaShoppingCart className="text-white text-lg" />
                {cartQuantity > 0 && (
                  <motion.span
                    className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-xs text-black font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg"
                    animate={{
                      scale: [1, 1.3, 1],
                      rotateZ: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    {cartQuantity}
                  </motion.span>
                )}
              </motion.div>
            </Link>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="absolute top-full left-0 right-0 bg-black/90 backdrop-blur-2xl border-t border-purple-500/30"
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="p-6 space-y-4">
                  {/* Mobile Search */}
                  <motion.div className="relative" variants={menuItemVariants}>
                    <div className="relative flex items-center bg-white/10 backdrop-blur-sm rounded-xl border border-purple-300/30 overflow-hidden">
                      <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full py-3 px-4 bg-transparent text-white placeholder-purple-200 focus:outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <motion.button
                        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 m-1 rounded-lg"
                        whileHover={{
                          scale: 1.05,
                          rotateZ: 360,
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                      >
                        <FaSearch />
                      </motion.button>
                    </div>
                  </motion.div>

                  {/* Mobile Navigation Links */}
                  <div className="space-y-3">
                    {navigationItems.map((item, index) => (
                      <motion.div key={item.to} variants={menuItemVariants}>
                        <Link
                          to={item.to}
                          className={`flex items-center px-4 py-3 rounded-xl backdrop-blur-sm border transition-all duration-300 ${
                            location.pathname === item.to
                              ? "bg-gradient-to-r from-purple-600/50 to-blue-600/50 border-purple-400/50 text-white"
                              : "bg-white/5 border-purple-300/20 text-purple-200 hover:bg-white/10 hover:border-purple-400/40"
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <motion.div
                            className="mr-4 p-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500"
                            whileHover={{
                              rotateY: 180,
                              scale: 1.1,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <item.icon className="text-white" />
                          </motion.div>
                          <span className="font-medium text-lg">{item.label}</span>
                          {item.to === "/cart" && cartQuantity > 0 && (
                            <motion.span
                              className="ml-auto bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-sm font-bold px-2 py-1 rounded-full"
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                            >
                              {cartQuantity}
                            </motion.span>
                          )}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-between px-8 py-4">
          {/* Desktop Logo */}
          <Link to="/" className="flex items-center">
            <motion.div
              className="relative w-12 h-12 mr-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center shadow-xl"
              whileHover={{
                rotateY: 360,
                scale: 1.1,
                boxShadow: "0 0 50px rgba(147, 51, 234, 0.8)",
              }}
              transition={{ duration: 0.8 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <HiSparkles className="text-white text-xl" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 blur opacity-50" />
            </motion.div>
            <motion.h1
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              LKH Store
            </motion.h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="flex items-center space-x-2">
            {navigationItems.map((item) => (
              <Link key={item.to} to={item.to} className="relative group">
                <motion.div
                  className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
                    location.pathname === item.to
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                      : "text-purple-200 hover:text-white"
                  }`}
                  whileHover={{
                    scale: 1.05,
                    rotateY: location.pathname !== item.to ? 5 : 0,
                    rotateX: location.pathname !== item.to ? 5 : 0,
                    boxShadow:
                      location.pathname !== item.to
                        ? "0 10px 25px -5px rgba(147, 51, 234, 0.3)"
                        : "0 15px 35px -5px rgba(147, 51, 234, 0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.div className="mr-2" whileHover={{ rotateZ: 360 }} transition={{ duration: 0.5 }}>
                    <item.icon className="text-lg" />
                  </motion.div>
                  <span className="font-medium">{item.label}</span>
                  {item.to === "/cart" && cartQuantity > 0 && (
                    <motion.span
                      className="ml-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded-full"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      {cartQuantity}
                    </motion.span>
                  )}
                </motion.div>

                {/* Active Tab Indicator */}
                {location.pathname === item.to && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Search & Cart */}
          <div className="flex items-center space-x-4">
            {/* Desktop Search */}
            <motion.div
              className="relative"
              animate={{ width: searchFocused ? 320 : 240 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative flex items-center bg-white/10 backdrop-blur-sm rounded-xl border border-purple-200/30 overflow-hidden">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full py-3 px-4 bg-transparent text-white placeholder-purple-200 focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
                <motion.button
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 m-1 rounded-lg"
                  whileHover={{
                    scale: 1.05,
                    rotateZ: 360,
                    boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaSearch />
                </motion.button>
              </div>
            </motion.div>

            {/* Desktop Cart */}
            <Link to="/cart">
              <motion.div
                className="relative p-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg"
                whileHover={{
                  scale: 1.1,
                  rotateY: 15,
                  rotateX: 15,
                  boxShadow: "0 20px 40px -10px rgba(147, 51, 234, 0.6)",
                }}
                whileTap={{ scale: 0.9 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <FaShoppingCart className="text-white text-xl" />
                {cartQuantity > 0 && (
                  <motion.span
                    className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-sm font-bold rounded-full w-7 h-7 flex items-center justify-center shadow-lg"
                    animate={{
                      scale: [1, 1.3, 1],
                      rotateZ: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    {cartQuantity}
                  </motion.span>
                )}
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
