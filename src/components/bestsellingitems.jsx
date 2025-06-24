import { useContext, useState, useEffect, useMemo, useCallback } from "react"
import { ShopContext } from "../contexts/shopcontext"
import {
  FaShoppingCart,
  FaFire,
  FaBolt,
  FaTrash,
  FaTrophy,
  FaClock,
  FaPlus,
  FaMinus,
  FaHeart,
  FaEye,
} from "react-icons/fa"
import { HiSparkles } from "react-icons/hi"

function BestSellingItems({ id, item, condition, price, imageURL, popularity, endTime, category }) {
  const { getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeItem } = useContext(ShopContext)
  const quantity = getItemQuantity(id)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  // Memoize all expensive calculations
  const badgeColor = useMemo(() => {
    if (popularity > 100) return "from-yellow-400 to-orange-500"
    if (popularity > 50) return "from-purple-500 to-pink-500"
    return "from-blue-500 to-cyan-500"
  }, [popularity])

  const popularityLevel = useMemo(() => {
    if (popularity > 100) return "🔥 Ultra Hot"
    if (popularity > 50) return "⭐ Popular"
    return "💎 Trending"
  }, [popularity])

  // Optimized timer with useCallback
  const updateTimer = useCallback(() => {
    if (!endTime) return
    const now = Date.now()
    const distance = new Date(endTime).getTime() - now
    setTimeLeft(Math.max(0, Math.floor(distance / 1000)))
  }, [endTime])

  useEffect(() => {
    updateTimer()
    if (endTime) {
      const timer = setInterval(updateTimer, 1000)
      return () => clearInterval(timer)
    }
  }, [updateTimer, endTime])

  const formatTime = useMemo(() => {
    if (timeLeft <= 0) return "00:00:00"
    const hours = Math.floor(timeLeft / 3600)
    const minutes = Math.floor((timeLeft % 3600) / 60)
    const seconds = timeLeft % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }, [timeLeft])

  // Optimized event handlers
  const handleMouseEnter = useCallback(() => setIsHovered(true), [])
  const handleMouseLeave = useCallback(() => setIsHovered(false), [])
  const handleImageLoad = useCallback(() => setImageLoaded(true), [])
  const handleIncreaseQuantity = useCallback(() => increaseItemQuantity(id), [increaseItemQuantity, id])
  const handleDecreaseQuantity = useCallback(() => decreaseItemQuantity(id), [decreaseItemQuantity, id])
  const handleRemoveItem = useCallback(() => removeItem(id), [removeItem, id])

  return (
    <div
      className="relative group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-200 ease-out hover:scale-[1.02] hover:shadow-3xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Simple hover glow - CSS only */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-blue-500/0 to-cyan-500/0 group-hover:from-purple-500/5 group-hover:via-blue-500/5 group-hover:to-cyan-500/5 transition-all duration-300 rounded-2xl" />

      {/* Static badges - no animation */}
      <div className="absolute top-3 left-3 z-20">
        <div
          className={`inline-flex items-center gap-1 bg-gradient-to-r ${badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}
        >
          <FaTrophy />
          Best Seller
        </div>
      </div>

      <div className="absolute top-3 right-3 z-20">
        <div className="inline-flex items-center gap-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          <FaFire />
          Hot!
        </div>
      </div>

      {/* Hover buttons - simple CSS transition */}
      <div
        className={`absolute top-16 right-3 z-20 flex flex-col gap-2 transition-all duration-200 ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"}`}
      >
        <button className="w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-150">
          <FaHeart className="text-sm" />
        </button>
        <button className="w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-150">
          <FaEye className="text-sm" />
        </button>
      </div>

      {/* Product Image - minimal animation */}
      <div className="relative h-48 sm:h-56 lg:h-48 xl:h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <img
          src={imageURL || "/placeholder.svg?height=200&width=200"}
          alt={item}
          className={`max-w-full max-h-full object-contain transition-all duration-300 ${imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          onLoad={handleImageLoad}
          loading="lazy"
        />

        {/* Loading skeleton */}
        {!imageLoaded && <div className="absolute inset-4 bg-gray-200 rounded-lg animate-pulse" />}

        {/* Quantity badge */}
        {quantity > 0 && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
            {quantity} in cart
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 lg:p-6 space-y-4">
        {/* Category */}
        {category && (
          <span className="inline-block text-xs font-medium text-purple-400 bg-purple-500/10 px-2 py-1 rounded-full">
            {category}
          </span>
        )}

        {/* Product Name */}
        <h3 className="text-lg lg:text-xl font-bold text-white leading-tight line-clamp-2">{item}</h3>

        {/* Condition */}
        <p className="text-sm text-gray-400">{condition}</p>

        {/* Price and Popularity */}
        <div className="flex justify-between items-center">
          <div className="text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
            ${price}
          </div>

          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
            <FaBolt className="text-yellow-400 text-sm" />
            <span className="text-sm font-semibold text-white">{popularity || 0} sold</span>
          </div>
        </div>

        {/* Popularity Level */}
        <div className="text-center py-2">
          <span className="text-sm font-medium text-gray-300">{popularityLevel}</span>
        </div>

        {/* Timer - static display */}
        {endTime && timeLeft > 0 && (
          <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-sm border border-red-500/30 rounded-xl p-3">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FaClock className="text-red-400" />
              <span className="text-sm font-semibold text-red-300">Limited Time Offer</span>
            </div>
            <div className="text-center">
              <span className="font-mono text-lg lg:text-xl font-bold text-white">{formatTime}</span>
            </div>
          </div>
        )}

        {/* Action Buttons - CSS hover only */}
        <div className="space-y-3">
          {quantity > 0 ? (
            <div className="space-y-3">
              {/* Quantity Controls */}
              <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden">
                <button
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold flex items-center justify-center hover:from-purple-700 hover:to-blue-700 transition-all duration-150 active:scale-95"
                  onClick={handleDecreaseQuantity}
                >
                  <FaMinus />
                </button>

                <div className="flex-1 py-3 px-4 text-center">
                  <span className="text-lg font-bold text-white">{quantity}</span>
                </div>

                <button
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold flex items-center justify-center hover:from-purple-700 hover:to-blue-700 transition-all duration-150 active:scale-95"
                  onClick={handleIncreaseQuantity}
                >
                  <FaPlus />
                </button>
              </div>

              {/* Remove Button */}
              <button
                className="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:from-red-600 hover:to-red-700 transition-all duration-150 active:scale-95"
                onClick={handleRemoveItem}
              >
                <FaTrash />
                Remove from Cart
              </button>
            </div>
          ) : (
            <button
              className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-150 active:scale-95 relative overflow-hidden"
              onClick={handleIncreaseQuantity}
            >
              <FaShoppingCart />
              Add to Cart
              <HiSparkles className="text-yellow-300" />
            </button>
          )}
        </div>
      </div>

      {/* Expired Overlay - simple fade */}
      {endTime && timeLeft === 0 && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-30">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
              <FaClock className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Offer Expired!</h3>
            <p className="text-gray-300">This deal is no longer available</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default BestSellingItems
