import React, { useContext } from "react";
import { ShopContext } from "../contexts/shopcontext";
import { CartItem } from "../components/cartitem";
import { Link } from "react-router-dom";

export const Cart = ({id,item,condition,price,imageURL}) => {
    const {cartItem} = useContext(ShopContext)

    return(
        <div className="h-fit">
            <div>
            <h1 className="text-center text-2xl my-10">Your order: </h1>
            </div>
            { cartItem < 1 ? (
                <div className="text-center justify-center h-screen">
                    <h1 className="text-3xl">No item in the order lists</h1>
                    <button className="p-5 bg-green-400 mt-10 rounded-full hover:bg-green-600"><Link to="/shop">Order items</Link></button>
                </div>
            ) : (
                <div className="grid grid-rows-1 justify-center align-items-center shawdow-2xl">
                {cartItem.map((item) => (
                    <CartItem key={item.id} {...item} />
                ))}
                </div>
            )  }
            
        </div>
    );
}