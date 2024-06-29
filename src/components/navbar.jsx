import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

export const Navbar = () => {
    return(
        <div>
            <div className="hidden justify-between p-2 bg-blue-950 text-white md:flex">
                <div className="flex justify-center text-center self-center">
                    <h1>LKH Store</h1>
                </div>
                <input type="text" placeholder="Search" className="p-2 w-72 text-sm text-slate-950 rounded-2xl" />
            </div>
            <div className="flex p-3 justify-between bg-gradient-to-r from-slate-800 to-slate-900 text-white">
                <nav className="flex justify-between items-center">
                    <Link to={"/"} className="pr-5 hover:text-blue-500">Shop</Link>
                    <Link to={"/cart"} className="pr-5 hover:text-blue-500">Cart</Link>
                    {/* <Link to={"#"} className="pr-5 hover:text-blue-500">Support</Link>
                    <Link to={"#"} className="pr-5 hover:text-blue-500">Gift Card</Link>
                    <Link to={"/bestsellers"} className="pr-5 hover:text-blue-500">Best Sellers</Link>
                    <Link to={"#"} className="pr-5 hover:text-blue-500">Discount</Link> */}
                </nav>
                <div className="flex">
                    <button className="flex p-2 border border-white rounded-2xl hover:bg-white hover:text-slate-900">
                        <FcGoogle className="flex self-center" />
                        <span className="mx-3">Sign In with Google</span>
                    </button>
                </div>
            </div>
            {/* <div className="hidden justify-around p-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white md:flex">
                <div>
                    <button className="p-3 m-auto bg-green-500 rounded-full hover:bg-green-600">Get Discount up to 80%</button>
                </div>
                <div>
                    <button onClick={() => alert('Claim Coupons!')} className="p-3 m-auto bg-red-700 hover:bg-red-800 rounded-full">Claim coupons</button>
                </div>
            </div> */}
        </div>
    );
}