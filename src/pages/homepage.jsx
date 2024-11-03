import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CiCircleCheck } from "react-icons/ci"
import { FaShoppingCart, FaSearch, FaStar } from "react-icons/fa"
import appScreenShot from "../images/appScreenShot.png"

const includedFeatures = [
    'Private forum access',
    'Member resources',
    'Entry to annual conference',
    'Official member t-shirt',
]

const stats = [
    { id: 1, name: 'Products', value: '+100' },
    { id: 2, name: 'Customer Satisfaction', value: '5 Stars' },
    { id: 3, name: 'Number of users', value: '1K' },
]

const featuredProducts = [
    { id: 1, name: 'Samsung Galaxy S23 Ultra', price: 1200, image: '/images/samsungs23ultra.jpg' },
    { id: 2, name: 'Macbook Pro 13" (M3 Pro)', price: 3100, image: '/images/mbpm3max.jpg' },
    { id: 3, name: 'Macbook Pro 16" (M3 Max)', price: 3900, image: '/images/mbpm3max16.jpg' },
]

function HomePage() {
  const [hoveredProduct, setHoveredProduct] = useState(null)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
        <div className="bg-blue-900">
        <div className="mx-auto max-w-7xl py-0 xl:py-10 sm:px-6 lg:px-8">
            <motion.div 
              className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
            <svg
                viewBox="0 0 1024 1024"
                className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            >
                <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
                <defs>
                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                    <stop stopColor="#7775D6" />
                    <stop offset={1} stopColor="#E935C1" />
                </radialGradient>
                </defs>
            </svg>
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                <motion.h2 
                  className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                Discover your style
                <br />
                Start using our app today.
                </motion.h2>
                <motion.p 
                  className="mt-6 text-lg leading-8 text-gray-300"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                Stay connected and entertained on the go with our versatile tablets. Perfect for work, study, or leisure.
                </motion.p>
                <motion.div 
                  className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                <Link
                    to="/shop"
                    className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors duration-300"
                >
                    Get started
                </Link>
                <Link to="#" className="text-sm font-semibold leading-6 text-white hover:text-gray-300 transition-colors duration-300">
                    Learn more <span aria-hidden="true">→</span>
                </Link>
                </motion.div>
            </div>
            <motion.div 
              className="relative mt-16 h-80 lg:mt-8"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
                <img
                alt="App screenshot"
                src={appScreenShot}
                width={1824}
                height={1080}
                className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
                />
            </motion.div>
            </motion.div>
        </div>
        </div>

        <motion.div 
          className="bg-white py-24 sm:py-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center mb-12">Featured Products</h2>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                    {featuredProducts.map((product) => (
                        <motion.div 
                          key={product.id} 
                          className="group relative"
                          whileHover={{ scale: 1.05 }}
                          onHoverStart={() => setHoveredProduct(product.id)}
                          onHoverEnd={() => setHoveredProduct(null)}
                        >
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <Link to="#">
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {product.name}
                                        </Link>
                                    </h3>
                                </div>
                                <p className="text-sm font-medium text-gray-900">${product.price}</p>
                            </div>
                            {hoveredProduct === product.id && (
                
                                <motion.div 
                                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.3 }}
                                >
                                    <div className="flex space-x-4">
                                        <button className="bg-white text-black p-2 rounded-full">
                                            <FaShoppingCart />
                                        </button>
                                        <button className="bg-white text-black p-2 rounded-full">
                                            <FaSearch />
                                        </button>
                                        <button className="bg-white text-black p-2 rounded-full">
                                            <FaStar />
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>

        <motion.section 
          className="relative isolate overflow-hidden bg-blue-950 px-6 py-5 xl:py-32 lg:px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
            <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-blue-900 shadow-xl shadow-indigo-600/10 ring-1 ring-blue-900 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
            <div className="mx-auto max-w-2xl lg:max-w-4xl">
                <figure className="mt-10">
                <blockquote className="text-center text-xl font-semibold leading-8 text-gray-950 sm:text-2xl sm:leading-9">
                    <p>
                    "The customer service was exceptional. I had a question about my order and received a prompt and helpful response. The product arrived well-packaged and in perfect condition."
                    </p>
                </blockquote>
                <figcaption className="mt-10">
                    <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                    <div className="font-semibold text-gray-900">David</div>
                    </div>
                </figcaption>
                </figure>
            </div>
        </motion.section>

        <motion.div 
          className="bg-white py-12 sm:py-28"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl sm:text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Simple no-tricks pricing</h2>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                    Choose the Membership That's Right for You
                </p>
                </div>
                <motion.div 
                  className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                <div className="p-8 sm:p-10 lg:flex-auto">
                    <h3 className="text-2xl font-bold tracking-tight text-gray-900">Lifetime membership</h3>
                    <p className="mt-6 text-base leading-7 text-gray-600">
                    Enjoy unlimited access to the latest tech gadgets and accessories, without ever having to pay full price again.
                    </p>
                    <div className="mt-10 flex items-center gap-x-4">
                    <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">What's included</h4>
                    <div className="h-px flex-auto bg-gray-100" />
                    </div>
                    <ul
                    role="list"
                    className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
                    >
                    {includedFeatures.map((feature) => (
                        <li key={feature} className="flex gap-x-3">
                        <CiCircleCheck className="h-6 w-5 flex-none text-indigo-600" />
                        {feature}
                        </li>
                    ))}
                    </ul>
                </div>
                <div className="mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                    <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                    <div className="mx-auto max-w-xs px-8">
                        <p className="text-base font-semibold text-gray-600">Pay once, own it forever</p>
                        <p className="mt-6 flex items-baseline justify-center gap-x-2">
                        <span className="text-5xl font-bold tracking-tight text-gray-900">$100</span>
                        <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">SGD</span>
                        </p>
                        <Link
                        to="#"
                        className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-300"
                        >
                        Get access
                        </Link>
                        <p className="mt-6 text-xs leading-5 text-gray-600">
                        Invoices and receipts available for easy company reimbursement
                        </p>
                    </div>
                    </div>
                </div>
                </motion.div>
            </div>
        </motion.div>

        <motion.div 
          className="bg-blue-950 py-24 sm:py-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
                {stats.map((stat) => (
                    <motion.div 
                      key={stat.id} 
                      className="mx-auto flex max-w-xs flex-col gap-y-4"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                    <dt className="text-base leading-7 text-gray-50">{stat.name}</dt>
                    <dd className="order-first text-3xl font-semibold tracking-tight text-gray-100 sm:text-5xl">
                        {stat.value}
                    </dd>
                    </motion.div>
                ))}
                </dl>
            </div>
        </motion.div>



    </motion.div>
  )
}

export default HomePage