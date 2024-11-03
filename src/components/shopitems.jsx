import React, { useContext, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShopContext } from "../contexts/shopcontext"
import { BsCart2, BsHeart, BsHeartFill } from "react-icons/bs"
import { MdDeleteForever, MdRemoveRedEye } from "react-icons/md"
import { FaStar } from "react-icons/fa"

export const ShopItems = ({ id, item, condition, price, imageURL, rating }) => {
  const { getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeItem } = useContext(ShopContext)
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showQuickView, setShowQuickView] = useState(false)
  const quantity = getItemQuantity(id)

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <motion.img
          src={imageURL}
          alt={item}
          className="w-full h-64 object-contain"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                className="bg-white text-gray-800 rounded-full p-2 m-1"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowQuickView(true)}
              >
                <MdRemoveRedEye size={20} />
              </motion.button>
              <motion.button
                className="bg-white text-gray-800 rounded-full p-2 m-1"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleWishlist}
              >
                {isWishlisted ? <BsHeartFill size={20} className="text-red-500" /> : <BsHeart size={20} />}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{item}</h2>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xl font-bold text-blue-600">${price}</span>
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <FaStar key={index} className={index < rating ? "text-yellow-400" : "text-gray-300"} />
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-4">{condition}</p>
        {quantity > 0 ? (
          <div className="space-y-2">
            <motion.div className="flex justify-center items-center border border-blue-600 rounded-full overflow-hidden">
              <motion.button
                className="px-4 py-2 bg-blue-600 text-white"
                whileTap={{ scale: 0.9 }}
                onClick={() => decreaseItemQuantity(id)}
              >
                -
              </motion.button>
              <motion.span
                key={quantity}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="px-4 py-2 font-semibold"
              >
                {quantity}
              </motion.span>
              <motion.button
                className="px-4 py-2 bg-blue-600 text-white"
                whileTap={{ scale: 0.9 }}
                onClick={() => increaseItemQuantity(id)}
              >
                +
              </motion.button>
            </motion.div>
            <motion.button
              className="w-full py-2 bg-red-600 text-white rounded-md flex items-center justify-center"
              whileHover={{ backgroundColor: "#C53030" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => removeItem(id)}
            >
              <MdDeleteForever className="mr-2" />
              Remove
            </motion.button>
          </div>
        ) : (
          <motion.button
            className="w-full py-2 bg-green-600 text-white rounded-md flex items-center justify-center"
            whileHover={{ backgroundColor: "#2F855A" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => increaseItemQuantity(id)}
          >
            <BsCart2 className="mr-2" />
            Add to cart
          </motion.button>
        )}
      </div>
      <AnimatePresence>
        {showQuickView && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h2 className="text-2xl font-bold mb-4">{item}</h2>
              <img src={imageURL} alt={item} className="w-full h-64 object-contain mb-4" />
              <p className="text-gray-600 mb-2">{condition}</p>
              <p className="text-xl font-bold text-blue-600 mb-4">${price}</p>
              <div className="flex justify-between">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  onClick={() => {
                    increaseItemQuantity(id)
                    setShowQuickView(false)
                  }}
                >
                  Add to Cart
                </button>
                <button
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                  onClick={() => setShowQuickView(false)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}