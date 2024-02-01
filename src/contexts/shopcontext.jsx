import { createContext, useState } from "react";

export const ShopContext = createContext({});

export const ShopContextProvider = ({children}) => {
    const [cartItem, setCartItem] = useState([]);

    const cartQuantity = cartItem.reduce((quantity,item) => item.quantity + quantity, 0)

    function getItemQuantity(id) {
        return cartItem.find(item => item.id === id)?.quantity || 0;
    };

    function increaseItemQuantity(id) {
        setCartItem(currItem => {
            if (currItem.find(item => item.id === id) == null) {
                return [...currItem, {id, quantity : 1}]
            } else {
                return currItem.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity + 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function decreaseItemQuantity(id) {
        setCartItem(currItem => {
            if (currItem.find(item => item.id === id)?.quantity === 1) {
                return currItem.filter(item => item.id !== id)
            } else {
                return currItem.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity - 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function removeItem(id) {
        setCartItem(currItem => {
            return currItem.filter(item => item.id !== id)
        })
    }

    return(
        <ShopContext.Provider value={{cartItem, cartQuantity, getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeItem}}>
            {children}
        </ShopContext.Provider>
    );
}