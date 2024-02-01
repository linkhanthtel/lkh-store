import React, { useContext } from "react";
import { ShopContext } from "../contexts/shopcontext";

export const ShopItems = ({id,item,condition,price,imageURL}) => {
    const {getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeItem} = useContext(ShopContext)
    const quantity = getItemQuantity(id);

    return(
        <div className="bg-white flex flex-col p-3 m-3 border-2">
            <img src={imageURL} style={{height: "200px", objectFit: "contain"}} />
            <div className="flex justify-between p-3">
                <h1>{item}</h1>
                <h1>${price}</h1>
                <h2 className="text-red-800 font-bold animate-bounce">{condition}</h2>
            </div>
            {quantity > 0 ? 
                <div className="flex justify-center">
                <button className="p-3 m-2 bg-blue-400" onClick={() => increaseItemQuantity(id)}>+</button>
                <h1 className="p-3 m-2 bg-green-300">{quantity}</h1>
                <button className="p-3 m-2 bg-blue-400" onClick={() => decreaseItemQuantity(id)}>-</button>
            </div>
            :
            <div className="flex justify-center align-items-center">
                <button className="p-3 m-3 bg-blue-400" onClick={() => increaseItemQuantity(id)}>Add to carts</button>
            </div>      
            }
            <div className="text-center p-3 bg-red-600 hover:bg-red-900">
                <button onClick={() => removeItem(id)}>Remove</button>
            </div>
        </div>
    );
}