import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaHeart } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

const socialLinks = [
  { icon: <FaFacebookF />, url: '#' },
  { icon: <FaTwitter />, url: '#' },
  { icon: <FaInstagram />, url: '#' },
  { icon: <FaLinkedinIn />, url: '#' },
]

const quickLinks = [
  { name: 'About Us', url: '/' },
  { name: 'Contact', url: '/' },
  { name: 'FAQ', url: '/' },
  { name: 'Privacy Policy', url: '/' },
  { name: 'Terms of Service', url: '/' },
]

export const Footer = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Subscribed with email:', email)
    setIsSubscribed(true)
    setEmail('')
  }

  return (
    <motion.footer 
      className="bg-gradient-to-r from-blue-900 to-blue-700 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-6">
            <motion.img 
              src="/logo.png" 
              alt="LKH Store Logo" 
              className="h-12 w-auto"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            />
            <p className="text-sm">
              LKH Store is your one-stop shop for all your needs. We provide high-quality products and exceptional customer service.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-200 transition-colors duration-300"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a 
                    href={link.url} 
                    className="text-sm hover:text-blue-200 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-sm mb-4">
              Subscribe to our newsletter for updates and exclusive offers.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-2 rounded-l-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <motion.button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-r-md transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MdEmail className="text-xl" />
                </motion.button>
              </div>
              <AnimatePresence>
                {isSubscribed && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-sm text-green-300"
                  >
                    Thank you for subscribing!
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
        <motion.div 
          className="mt-12 pt-8 border-t border-blue-600 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm">
            © {new Date().getFullYear()} LKH Store. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  )
}