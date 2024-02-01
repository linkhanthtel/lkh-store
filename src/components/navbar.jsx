import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    return(
        <div>
            <div className="bg-red-900 p-3 text-white text-center">
                <h1 className="text-sm md:text-lg">Save time at Pre-order. Choose your items through our new services   <Link className="text-green-400 hover:text-green-500">Learn More</Link></h1>
            </div>
            <div className="hidden md:grid bg-green-900 p-3 text-white">
                <h1 className="text-center">Images and products used in this website are only for portfolio purpose</h1>
            </div>
            <div className="p-3 mp-4 flex justify-around bg-gradient-to-r from-blue-800 to-blue-900 text-white">
                <div className="hidden md:flex">
                    <h1>LKH Store</h1>
                </div>
                <nav className="flex">
                    <Link to={"/"} className="pl-5">Shop</Link>
                    <Link to={"/cart"} className="pl-5">Cart</Link>
                </nav>
                <div className="hidden md:flex">
                    <h1>Support</h1>
                </div>
            </div>
            <div className="hidden justify-around p-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white md:flex">
                <div>
                    <button className="p-3 m-auto bg-green-500 rounded-full hover:bg-green-600">Get Discount up to 80%</button>
                </div>
                <div>
                    <button className="p-3 m-auto bg-red-700 hover:bg-red-800 rounded-full">Claim coupons</button>
                </div>
            </div>
        </div>
    );
}