import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FcGoogle } from 'react-icons/fc'
import { ImHome3 } from 'react-icons/im'
import { FaShoppingBag, FaSearch, FaMoon, FaSun } from 'react-icons/fa'
import { BsMinecart } from 'react-icons/bs'
import { MdSell, MdExpandMore } from 'react-icons/md'
import { CiMenuFries } from 'react-icons/ci'
import { RxCross2 } from 'react-icons/rx'

const categories = ['Electronics', 'Clothing', 'Books', 'Home & Garden']

export const Navbar = () => {
    const [toggle, setToggle] = useState(false)
    const [darkMode, setDarkMode] = useState(false)
    const [showCategories, setShowCategories] = useState(false)
    const [searchFocused, setSearchFocused] = useState(false)
    const location = useLocation()

    useEffect(() => {
        setToggle(false)
        setShowCategories(false)
    }, [location.pathname])

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
        document.documentElement.classList.toggle('dark')
    }

    return (
        <div className={`${darkMode ? 'dark' : ''}`}>
            <motion.div 
                className="bg-white dark:bg-gray-900 shadow-md"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 120 }}
            >
                {/* Mobile Menu */}
                <div className="md:hidden flex justify-between p-4 bg-slate-800">
                    <motion.button 
                        onClick={() => setToggle(!toggle)}
                        whileTap={{ scale: 0.95 }}
                    >
                        {toggle ? (
                            <RxCross2 className="text-3xl text-white" />
                        ) : (
                            <CiMenuFries className="text-3xl text-white" />
                        )}
                    </motion.button>
                    <motion.img 
                        src="/logo.png" 
                        alt="Logo" 
                        className="w-8 h-8"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                    />
                </div>

                <AnimatePresence>
                    {toggle && (
                        <motion.nav 
                            className="w-full bg-slate-800 text-white"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Link to="/" className="flex items-center px-4 py-3 bg-blue-900">
                                <ImHome3 className="mr-2" />Home
                            </Link>
                            <Link to="/shop" className="flex items-center px-4 py-3 hover:bg-blue-700">
                                <FaShoppingBag className="mr-2" />Shop
                            </Link>
                            <Link to="/cart" className="flex items-center px-4 py-3 hover:bg-blue-700">
                                <BsMinecart className="mr-2" />Cart
                            </Link>
                            <Link to="/bestsellers" className="flex items-center px-4 py-3 hover:bg-blue-700">
                                <MdSell className="mr-2" />Best Sellers
                            </Link>
                        </motion.nav>
                    )}
                </AnimatePresence>

                {/* Desktop Menu */}
                <div className="hidden md:flex flex-col">
                    <div className="flex justify-between items-center p-4 bg-blue-950 text-white">
                        <div className="flex items-center">
                            <motion.img 
                                src="/logo.png" 
                                alt="Logo" 
                                className="w-8 h-8 mr-2"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                            />
                            <h1 className="text-xl font-bold">LKH Store</h1>
                        </div>
                        <div className="relative">
                            <motion.div
                                className={`flex items-center bg-white dark:bg-gray-700 rounded-full ${searchFocused ? 'w-96' : 'w-64'} transition-all duration-300`}
                                animate={{ width: searchFocused ? 384 : 256 }}
                            >
                                <input 
                                    type="text" 
                                    placeholder="Search" 
                                    className="w-full py-2 px-4 rounded-l-full text-gray-800 dark:text-white bg-transparent focus:outline-none"
                                    onFocus={() => setSearchFocused(true)}
                                    onBlur={() => setSearchFocused(false)}
                                />
                                <motion.button 
                                    className="bg-slate-900 text-white p-2 rounded-full"
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
                                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-800" />}
                            </motion.button>
                            <motion.button 
                                className="flex items-center px-4 py-2 text-blue-600 bg-gray-700 rounded-full"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FcGoogle className="mr-2" />
                                <span>Sign In</span>
                            </motion.button>
                        </div>
                    </div>
                    <nav className="flex justify-between items-center p-4 bg-slate-900 text-white">
                        <div className="flex space-x-6">
                            <Link to="/" className="flex items-center hover:text-blue-200">
                                <ImHome3 className="mr-1" />Home
                            </Link>
                            <div className="relative">
                                <motion.button 
                                    className="flex items-center hover:text-blue-200"
                                    onClick={() => setShowCategories(!showCategories)}
                                >
                                    <FaShoppingBag className="mr-1" />
                                    Shop
                                    <MdExpandMore />
                                </motion.button>
                                <AnimatePresence>
                                    {showCategories && (
                                        <motion.div 
                                            className="absolute top-full left-0 bg-blue-800 z-10 shadow-md rounded-md overflow-hidden"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {categories.map((category, index) => (
                                                <Link 
                                                    key={index}
                                                    to="/shop"
                                                    className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-blue-100 dark:hover:bg-blue-900"
                                                >
                                                    {category}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <Link to="/cart" className="flex items-center hover:text-blue-200">
                                <BsMinecart className="mr-1" />Cart
                            </Link>
                            <Link to="/bestsellers" className="flex items-center hover:text-blue-200">
                                <MdSell className="mr-1" />Best Sellers
                            </Link>
                        </div>
                    </nav>
                </div>
            </motion.div>
        </div>
    )
}