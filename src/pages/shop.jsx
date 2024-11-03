import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Data } from "../data/data"
import { ShopItems } from "../components/shopitems"
import heroimage from "../images/hero.jpg"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaSearch, FaFilter } from 'react-icons/fa'

export const Shop = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredData, setFilteredData] = useState(Data)
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [isFilterOpen, setIsFilterOpen] = useState(false)

    const categories = ['All', ...new Set(Data.map(item => item.category))]

    const discount = () => toast.success("You have claimed a 20% discount!")

    useEffect(() => {
        const results = Data.filter(item =>
            item.item.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCategory === 'All' || item.category === selectedCategory)
        )
        setFilteredData(results)
    }, [searchTerm, selectedCategory])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Hero Section */}
            <div className="relative h-[450px] bg-gradient-to-r from-blue-500 to-purple-600 overflow-hidden">
                <motion.img
                    src={heroimage}
                    alt="Hero Image"
                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
                    <motion.h1
                        className="text-4xl md:text-6xl font-bold mb-4 text-center"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Welcome to LKH Store
                    </motion.h1>
                    <motion.p
                        className="text-xl md:text-2xl text-center max-w-2xl mb-8"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Reward yourself with amazing items and products. Experience the best online shopping with awesome items at reasonable prices.
                    </motion.p>
                    <motion.button
                        onClick={discount}
                        className="px-6 py-3 bg-yellow-400 text-gray-900 rounded-full font-semibold text-lg shadow-lg hover:bg-yellow-300 transition duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Claim 20% Discount
                    </motion.button>
                </div>
            </div>

            {/* Search and Filter Section */}
            <div className="bg-gray-100 py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                        <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full py-2 px-4 pr-10 rounded-full border-2 border-gray-300 focus:outline-none focus:border-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                        <motion.button
                            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-full"
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaFilter className="mr-2" />
                            Filter
                        </motion.button>
                    </div>
                    <AnimatePresence>
                        {isFilterOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="flex flex-wrap justify-center gap-2 mb-4">
                                    {categories.map((category) => (
                                        <motion.button
                                            key={category}
                                            className={`px-4 py-2 rounded-full ${
                                                selectedCategory === category
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-white text-gray-700'
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
                </div>
            </div>

            {/* Items Section */}
            <div className="container mx-auto px-4 py-8">
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, staggerChildren: 0.1 }}
                >
                    {filteredData.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <ShopItems {...item} />
                        </motion.div>
                    ))}
                </motion.div>
                {filteredData.length === 0 && (
                    <motion.p
                        className="text-center text-gray-500 mt-8 text-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        No products found. Try adjusting your search or filters.
                    </motion.p>
                )}
            </div>

            <ToastContainer position="bottom-right" autoClose={3000} />
        </motion.div>
    )
}