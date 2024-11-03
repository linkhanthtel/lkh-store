import React, { useContext } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShopContext } from "../contexts/shopcontext"
import { Data } from "../data/data"
import { FaTrash, FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa"

export const CartItem = ({ id, quantity }) => {
  const { removeItem, increaseItemQuantity, decreaseItemQuantity, cartItems } = useContext(ShopContext)
  const item = Data.find(i => i.id === id)

  if (item == null) return null

  const subtotal = item.price * quantity

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden mb-6"
    >
      <div className="p-6 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/4 mb-4 md:mb-0">
          <motion.img
            src={item.imageURL}
            alt={item.item}
            className="w-full h-48 object-contain rounded-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="w-full md:w-3/4 md:pl-6 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{item.item}</h2>
            <p className="text-gray-600 mb-4">{item.condition}</p>
            <div className="flex items-center mb-4">
              <span className="text-lg font-semibold text-blue-600 mr-2">${item.price.toFixed(2)}</span>
              <span className="text-sm text-gray-500">per item</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-gray-200 text-gray-600 rounded-full p-2"
                onClick={() => decreaseItemQuantity(id)}
              >
                <FaMinus />
              </motion.button>
              <span className="mx-4 text-xl font-semibold">{quantity}</span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-gray-200 text-gray-600 rounded-full p-2"
                onClick={() => increaseItemQuantity(id)}
              >
                <FaPlus />
              </motion.button>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-red-500 text-white rounded-full p-2"
              onClick={() => removeItem(id)}
            >
              <FaTrash />
            </motion.button>
          </div>
          <div className="mt-4 text-right">
            <p className="text-lg font-semibold text-gray-800">
              Subtotal: <span className="text-blue-600">${subtotal.toFixed(2)}</span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export const Cart = () => {
  const { cartItems } = useContext(ShopContext)
  const cartItemIds = Object.keys(cartItems).filter(id => cartItems[id] > 0)

  if (cartItemIds.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col items-center justify-center h-screen bg-gray-100"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="text-6xl text-gray-300 mb-6"
        >
          <FaShoppingCart />
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-700 mb-4">Your cart is empty</h2>
        <p className="text-xl text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg"
        >
          Start Shopping
        </motion.button>
      </motion.div>
    )
  }

  const total = cartItemIds.reduce((sum, id) => {
    const item = Data.find(i => i.id === parseInt(id))
    return sum + (item ? item.price * cartItems[id] : 0)
  }, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Shopping Cart</h1>
      <AnimatePresence>
        {cartItemIds.map(id => (
          <CartItem key={id} id={parseInt(id)} quantity={cartItems[id]} />
        ))}
      </AnimatePresence>
      <motion.div
        layout
        className="mt-8 p-6 bg-white rounded-lg shadow-lg"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Total</h2>
          <p className="text-2xl font-bold text-blue-600">${total.toFixed(2)}</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 w-full bg-green-500 text-white py-3 rounded-lg text-lg font-semibold shadow-md"
        >
          Proceed to Checkout
        </motion.button>
      </motion.div>
    </div>
  )
}