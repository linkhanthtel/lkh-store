"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { FcGoogle } from "react-icons/fc"
import { ImHome3 } from "react-icons/im"
import { FaShoppingBag, FaSearch, FaUserCircle, FaShoppingCart } from "react-icons/fa"
import { BsMinecart } from "react-icons/bs"
import { MdSell } from "react-icons/md"
import { CiMenuFries } from "react-icons/ci"
import { RxCross2 } from "react-icons/rx"
import { HiSparkles } from "react-icons/hi"

export const Navbar = () => {
  const [toggle, setToggle] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setToggle(false)
  }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Futuristic animation variants
  const navbarVariants = {
    hidden: {
      y: -100,
      opacity: 0,
      boxShadow: "0 0 0 rgba(147, 51, 234, 0)",
    },
    visible: {
      y: 0,
      opacity: 1,
      boxShadow: scrolled
        ? "0 25px 50px -12px rgba(147, 51, 234, 0.25), 0 0 100px rgba(59, 130, 246, 0.15)"
        : "0 10px 25px -5px rgba(147, 51, 234, 0.1)",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  const mobileMenuVariants = {
    hidden: {
      height: 0,
      opacity: 0,
      backdropFilter: "blur(0px)",
    },
    visible: {
      height: "auto",
      opacity: 1,
      backdropFilter: "blur(20px)",
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      backdropFilter: "blur(0px)",
      transition: {
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  }

  const menuItemVariants = {
    hidden: { x: -30, opacity: 0, scale: 0.9 },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 200,
      },
    },
    exit: {
      x: -30,
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.2 },
    },
  }

  const glowEffect = {
    boxShadow: `0 0 20px rgba(147, 51, 234, 0.4), 0 0 40px rgba(59, 130, 246, 0.2)`,
  }

  return (
    <div className="fixed top-0 w-full z-50">
      <motion.div
        className="relative backdrop-blur-xl bg-white/90 border-b border-purple-200/20"
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
        style={{
          background: scrolled
            ? "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(147,51,234,0.05) 50%, rgba(59,130,246,0.05) 100%)"
            : "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(147,51,234,0.02) 50%, rgba(59,130,246,0.02) 100%)",
        }}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-cyan-500/5 animate-pulse" />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: "50%",
              }}
              animate={{
                y: [-10, 10, -10],
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

        {/* Mobile Menu */}
        <div className="md:hidden flex justify-between items-center p-3">
          <div className="flex items-center">
            <motion.button
              onClick={() => setToggle(!toggle)}
              className="mr-2 p-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              {toggle ? <RxCross2 className="text-lg" /> : <CiMenuFries className="text-lg" />}
            </motion.button>

            <Link to="/" className="flex items-center">
              <motion.div
                className="relative w-8 h-8 mr-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center shadow-lg"
                whileHover={{
                  rotate: 360,
                  boxShadow: "0 0 30px rgba(147, 51, 234, 0.6)",
                }}
                transition={{ duration: 0.6 }}
              >
                <HiSparkles className="text-white text-sm" />
              </motion.div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                LKH Store
              </h1>
            </Link>
          </div>

          <div className="flex items-center">
            <Link to="/cart">
              <motion.div
                className="relative p-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg"
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.4)",
                }}
                whileTap={{ scale: 0.9 }}
              >
                <FaShoppingCart className="text-white text-lg" />
                <motion.span
                  className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-xs text-gray-900 font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  3
                </motion.span>
              </motion.div>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Content */}
        <AnimatePresence>
          {toggle && (
            <motion.nav
              className="md:hidden overflow-hidden bg-gradient-to-b from-purple-900/90 via-blue-900/90 to-indigo-900/90 backdrop-blur-xl border-t border-purple-500/20"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="p-4">
                {/* Search Bar */}
                <motion.div
                  className="relative mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="relative flex items-center bg-white/10 backdrop-blur-sm rounded-xl border border-purple-300/20 overflow-hidden">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-full py-2 px-3 bg-transparent text-white placeholder-purple-200 focus:outline-none text-sm"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <motion.button
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 m-1 rounded-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaSearch className="text-sm" />
                    </motion.button>
                  </div>
                </motion.div>

                {/* Sign In Button */}
                <motion.button
                  className="flex items-center justify-center w-full px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl text-white border border-purple-300/20 mb-4"
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <FcGoogle className="mr-2 text-lg" />
                  <span className="font-medium text-sm">Sign In with Google</span>
                </motion.button>

                {/* Navigation Links */}
                <div className="space-y-2">
                  {[
                    { to: "/", icon: ImHome3, label: "Home" },
                    { to: "/shop", icon: FaShoppingBag, label: "Shop" },
                    { to: "/cart", icon: BsMinecart, label: "Cart" },
                    { to: "/bestsellers", icon: MdSell, label: "Best Sellers" },
                  ].map((item, index) => (
                    <motion.div key={item.to} variants={menuItemVariants}>
                      <Link
                        to={item.to}
                        className="flex items-center px-3 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-purple-300/10 text-white hover:bg-white/10 transition-all duration-300"
                        onClick={() => setToggle(false)}
                      >
                        <item.icon className="mr-3 text-base text-purple-300" />
                        <span className="font-medium text-sm">{item.label}</span>
                        <div className="ml-auto w-1.5 h-1.5 bg-purple-400 rounded-full opacity-50" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.div
              className="relative w-10 h-10 mr-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center shadow-xl"
              whileHover={{
                rotate: 360,
                boxShadow: "0 0 40px rgba(147, 51, 234, 0.6)",
              }}
              transition={{ duration: 0.6 }}
            >
              <HiSparkles className="text-white text-lg" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 blur opacity-50" />
            </motion.div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              LKH Store
            </h1>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-6">
            {[
              { to: "/", icon: ImHome3, label: "Home" },
              { to: "/shop", icon: FaShoppingBag, label: "Shop" },
              { to: "/cart", icon: BsMinecart, label: "Cart" },
              { to: "/bestsellers", icon: MdSell, label: "Best Sellers" },
            ].map((item) => (
              <Link key={item.to} to={item.to} className="group relative">
                <motion.div
                  className={`flex items-center px-3 py-2 rounded-lg transition-all duration-300 ${
                    location.pathname === item.to
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                      : "text-gray-100 hover:text-purple-600"
                  }`}
                  whileHover={
                    location.pathname !== item.to
                      ? {
                          scale: 1.05,
                          backgroundColor: "rgba(147, 51, 234, 0.1)",
                        }
                      : {}
                  }
                  whileTap={{ scale: 0.95 }}
                  style={location.pathname === item.to ? glowEffect : {}}
                >
                  <item.icon className="mr-2 text-base" />
                  <span className="font-medium text-sm">{item.label}</span>
                </motion.div>

                {/* Animated underline */}
                {location.pathname === item.to && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-3">
            {/* Search Bar */}
            <motion.div
              className="relative"
              animate={{ width: searchFocused ? 280 : 200 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative flex items-center bg-white/10 backdrop-blur-sm rounded-xl border border-purple-200/20 overflow-hidden">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full py-2 px-3 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
                <motion.button
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 m-1 rounded-lg"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 5px 15px rgba(147, 51, 234, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaSearch className="text-sm" />
                </motion.button>
              </div>
            </motion.div>

            {/* Cart */}
            <Link to="/cart">
              <motion.div
                className="relative p-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg"
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.4)",
                }}
                whileTap={{ scale: 0.9 }}
              >
                <FaShoppingCart className="text-white text-lg" />
                <motion.span
                  className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-xs text-gray-900 font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  3
                </motion.span>
              </motion.div>
            </Link>

            {/* Sign In */}
            <motion.button
              className="flex items-center px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-purple-200/20 text-gray-700"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(147, 51, 234, 0.1)",
                boxShadow: "0 5px 15px rgba(147, 51, 234, 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <FcGoogle className="mr-2 text-base" />
              <span className="font-medium text-sm">Sign In</span>
            </motion.button>

            {/* Account */}
            <Link to="/account">
              <motion.div
                className="flex items-center text-gray-600 hover:text-purple-600 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaUserCircle className="text-xl" />
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
