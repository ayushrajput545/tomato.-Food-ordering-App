import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null)

const StoreContextProvider = (prop)=>{

    const [cartItems, setCartItems]= useState({});



    const addToCart =(itemId)=>{   // let itemId =5

        if(!cartItems[itemId]){    //item with ID itemId(5) is exist in cartItem object or not
            setCartItems((prev)=>({...prev,[itemId]:1}) )  //spread operator fetch prevoius items in object and add new item -> 5:1
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1})) //if 5 already exist then increase its quantity by 1
        }
    }

    const removeFromCart = (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }


    useEffect(()=>{
        console.log(cartItems);
        
    },[cartItems])

    const getTotalCartAmount =()=>{
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
            let itemInfo = food_list.find((product)=>product._id === item);
            totalAmount += itemInfo.price* cartItems[item];
            }
           
        }
        return totalAmount;
    }


    const contextvalue={
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount
    }

    return(
        <StoreContext.Provider value={contextvalue}>
            {prop.children}
        </StoreContext.Provider>

    )
}

export default StoreContextProvider;