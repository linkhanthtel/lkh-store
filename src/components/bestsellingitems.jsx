import React, { useContext, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShopContext } from "../contexts/shopcontext"
import { BsCart2, BsStarFill, BsLightning } from "react-icons/bs"
import { MdDeleteForever } from "react-icons/md"
import { FaFireAlt } from "react-icons/fa"

function BestSellingItems({ id, item, condition, price, imageURL, popularity, endTime }) {
  const { getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeItem } = useContext(ShopContext)
  const quantity = getItemQuantity(id)
  const [timeLeft, setTimeLeft] = useState(getTimeLeft())

  function getTimeLeft() {
    const now = new Date().getTime()
    const distance = new Date(endTime).getTime() - now
    return Math.max(0, Math.floor(distance / 1000))
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [endTime])

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = time % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <motion.div
      className="relative bg-white rounded-lg shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 rounded-br-lg z-10">
        <BsStarFill className="inline-block mr-1" />
        Best Seller
      </div>
      
      <motion.div
        className="absolute top-0 right-0 bg-yellow-400 text-gray-800 px-2 py-1 rounded-bl-lg z-10"
        initial={{ rotate: -5 }}
        animate={{ rotate: 5 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      >
        <FaFireAlt className="inline-block mr-1" />
        Hot Item!
      </motion.div>

      <img src={imageURL} alt={item} className="w-full h-48 object-contain p-4" />
      
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{item}</h2>
        <p className="text-sm text-gray-600 mb-2">{condition}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-blue-600">${price}</span>
          <div className="flex items-center">
            <BsLightning className="text-yellow-500 mr-1" />
            <span className="text-sm font-semibold">{popularity} sold</span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm font-semibold mb-1">Limited Time Offer:</p>
          <div className="bg-gray-200 rounded-full p-2 text-center">
            {/* Need to fix with formatTime function */}
            <span className="font-mono text-lg">00:00:00</span>
          </div>
        </div>

        {quantity > 0 ? (
          <div className="space-y-2">
            <div className="flex justify-center items-center border border-blue-600 rounded-full overflow-hidden">
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
            </div>
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
        {timeLeft === 0 && (
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-4 rounded-lg"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <p className="text-lg font-bold text-red-600">Offer Expired!</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default BestSellingItems