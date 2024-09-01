import React from 'react'
import { CiCircleCheck } from "react-icons/ci";

const includedFeatures = [
    'Private forum access',
    'Member resources',
    'Entry to annual conference',
    'Official member t-shirt',
  ]

function HomePage() {
  return (
    <div>
        <div className="bg-white">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
            <svg
                viewBox="0 0 1024 1024"
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            >
                <circle r={512} cx={512} cy={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
                <defs>
                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                    <stop stopColor="#7775D6" />
                    <stop offset={1} stopColor="#E935C1" />
                </radialGradient>
                </defs>
            </svg>
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Boost your productivity.
                <br />
                Start using our app today.
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-300">
                Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel nulla.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                <a
                    href="#"
                    className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                    Get started
                    </a>
                <a href="#" className="text-sm font-semibold leading-6 text-white">
                    Learn more <span aria-hidden="true">→</span>
                </a>
                </div>
            </div>
            <div className="relative mt-16 h-80 lg:mt-8">
                <img
                alt="App screenshot"
                src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
                width={1824}
                height={1080}
                className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
                />
            </div>
            </div>
        </div>
        </div>


        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl sm:text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Simple no-tricks pricing</h2>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                    Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et quasi iusto modi velit ut non voluptas
                    in. Explicabo id ut laborum.
                </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
                <div className="p-8 sm:p-10 lg:flex-auto">
                    <h3 className="text-2xl font-bold tracking-tight text-gray-900">Lifetime membership</h3>
                    <p className="mt-6 text-base leading-7 text-gray-600">
                    Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet indis perferendis blanditiis
                    repellendus etur quidem assumenda.
                    </p>
                    <div className="mt-10 flex items-center gap-x-4">
                    <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">What’s included</h4>
                    <div className="h-px flex-auto bg-gray-100" />
                    </div>
                    <ul
                    role="list"
                    className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
                    >
                    {includedFeatures.map((feature) => (
                        <li key={feature} className="flex gap-x-3">
                        <CiCircleCheck aria-hidden="true" className="h-6 w-5 flex-none text-indigo-600" />
                        {feature}
                        </li>
                    ))}
                    </ul>
                </div>
                <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                    <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                    <div className="mx-auto max-w-xs px-8">
                        <p className="text-base font-semibold text-gray-600">Pay once, own it forever</p>
                        <p className="mt-6 flex items-baseline justify-center gap-x-2">
                        <span className="text-5xl font-bold tracking-tight text-gray-900">$349</span>
                        <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
                        </p>
                        <a
                        href="#"
                        className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                        Get access
                        </a>
                        <p className="mt-6 text-xs leading-5 text-gray-600">
                        Invoices and receipts available for easy company reimbursement
                        </p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>


    </div>
  )
}

export default HomePage
