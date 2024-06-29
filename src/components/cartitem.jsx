import { useContext } from "react";
import { ShopContext } from "../contexts/shopcontext";
import { Data } from "../data/data";

export const CartItem = ({id, quantity}) => {
    const { removeItem, cartQuantity } = useContext(ShopContext);
    const item = Data.find(i => i.id === id)
    if ( item == null ) return null

    return(
        <div>
            <div className="p-5 my-10 bg-white shadow-2xl border-2 flex flex-col justify-center align-items-center">
            <img src={item.imageURL} style={{
                width : '300px', 
                height : '200px', 
                objectFit : 'cover'}} />
            <p className="py-5">{quantity > 1 && <span>x{quantity}</span>} {item.item}</p>
            <div className="flex justify-center align-center">
                <button className="p-5 bg-red-700 hover:bg-red-800 rounded-lg text-white text-center" onClick={() => removeItem(id)}>Remove</button>
            </div>
            </div>
        </div>
    );
}