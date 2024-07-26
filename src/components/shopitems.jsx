import React, { useContext } from "react";
import { ShopContext } from "../contexts/shopcontext";
import { BsCart2 } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";

export const ShopItems = ({id,item,condition,price,imageURL}) => {
    const {getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeItem} = useContext(ShopContext)
    const quantity = getItemQuantity(id);

    return(
        <div className="bg-white flex flex-col p-2 border-2 hover:shadow-xl">
            <img src={imageURL} style={{height: "200px", objectFit: "contain"}} />
            <div className="flex flex-col justify-center text-center p-3">
                <h1 className="my-2 text-md">{item}</h1>
                <h1 className="my-2 text-sm">${price}</h1>
                {/* <h2 className="text-red-800 font-bold">{condition}</h2> */}
            </div>
            {quantity > 0 ? 
                <div className="flex flex-col justify-center">
                    <div className="flex w-40 justify-around self-center border border-blue-950 rounded-full mb-3">
                        <button className="p-1 text-blue-950" onClick={() => increaseItemQuantity(id)}>+</button>
                        <h1 className="p-1 text-blue-950">{quantity}</h1>
                        <button className="p-1 text-blue-950" onClick={() => decreaseItemQuantity(id)}>-</button>
                    </div>
                    <div className="w-64 rounded-lg md:w-auto flex justify-center items-center self-center text-white bg-red-700 hover:bg-red-800">
                        <button className="flex justify-center p-3" onClick={() => removeItem(id)}>
                            <MdDeleteForever className="flex self-center text-2xl" />
                            <span className="mx-3 rounded-lg">Remove</span>
                        </button>
                    </div>
                </div>
            :
            <div className="flex justify-center">
                <button className="flex rounded-lg p-3 m-3 bg-green-700 hover:bg-green-800 text-white" onClick={() => increaseItemQuantity(id)}>
                    <BsCart2 className="flex self-center text-2xl" />
                    <span className="mx-3">Add to carts</span>
                </button>
            </div>      
            }
            
        </div>
    );
}