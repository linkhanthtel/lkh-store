import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation } from "react-router-dom";
import { ImHome3 } from "react-icons/im";
import { FaShoppingBag } from "react-icons/fa";
import { BsMinecart } from "react-icons/bs";
import { MdSell } from "react-icons/md";
import { CiMenuFries } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";

export const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setToggle(false);
    }, [location.pathname])

    return(
        <div>
            <div className="flex md:hidden justify-between p-5 bg-blue-950">
                <button onClick={() => setToggle(!toggle)}>
                    {toggle ? (<RxCross2 className="text-3xl text-white" />) : (<CiMenuFries className="text-3xl text-white" />)}
                </button>
            </div>
            {toggle ? (
                <div>
                    <nav className="w-screen h-screen flex flex-col pl-20 bg-blue-950 text-white">
                        <Link to={"/"} className="flex pr-4 py-4 hover:text-blue-500">
                            <ImHome3 className="flex self-center mx-1" />Home
                        </Link>
                        <Link to={"/shop"} className="flex pr-4 py-4 hover:text-blue-500">
                            <FaShoppingBag className="flex self-center mx-1" />Shop
                        </Link>
                        <Link to={"/cart"} className="flex pr-4 py-4 hover:text-blue-500">
                            <BsMinecart className="flex self-center mx-1" />Cart
                        </Link>
                        <Link to={"/bestsellers"} className="flex pr-4 py-4 hover:text-blue-500">
                            <MdSell className="flex self-center mx-1" />Best Sellers
                        </Link>
                    </nav>
                </div>
            ) : (
                <div></div>
            )}

            {/* Large Screen */}
            <div className="hidden md:flex justify-between p-2 bg-slate-900 text-white">
                <div className="flex justify-center text-center self-center">
                    <img src="logo.png" alt="Logo" className="w-8 h-7" />
                    <h1 className="px-3">LKH Store</h1>
                </div>
                <input type="text" placeholder="Search" className="p-2 w-72 text-sm text-slate-950 rounded-2xl" />
            </div>
            <div className="hidden md:flex p-3 justify-between bg-gradient-to-r from-slate-800 to-slate-900 text-white">
                <nav className="flex justify-between items-center">
                    <Link to={"/"} className="flex pr-4 hover:text-blue-500">
                        <ImHome3 className="flex self-center mx-1" />Home
                    </Link>
                    <Link to={"/shop"} className="flex pr-4 hover:text-blue-500">
                        <FaShoppingBag className="flex self-center mx-1" />Shop
                    </Link>
                    <Link to={"/cart"} className="flex pr-4 hover:text-blue-500">
                        <BsMinecart className="flex self-center mx-1" />Cart
                    </Link>
                    <Link to={"/bestsellers"} className="flex pr-4 hover:text-blue-500">
                        <MdSell className="flex self-center mx-1" />Best Sellers
                    </Link>
                </nav>
                <div className="flex">
                    <button className="flex p-2 border border-white rounded-2xl hover:bg-white hover:text-slate-900">
                        <FcGoogle className="flex self-center" />
                        <span className="mx-3">Sign In with Google</span>
                    </button>
                </div>
            </div>

        </div>
    );
}