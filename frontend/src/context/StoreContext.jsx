import axios from "axios";
import { createContext, useEffect, useState } from "react";
 

export const StoreContext = createContext(null)

const StoreContextProvider = (prop)=>{

    const [cartItems, setCartItems]= useState({});
    const [token , setToken] = useState("");
    const url = "http://localhost:3000/api/v1"
    const[food_list , setFoodList] = useState([]) // fetch food items from data base 




   const addToCart = async(itemId)=>{   // let itemId =5 //item id that store in db

        if(!cartItems[itemId]){    //item with ID itemId(5) is exist in cartItem object or not
            setCartItems((prev)=>({...prev,[itemId]:1}) )  //spread operator fetch prevoius items in object and add new item -> 5:1
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1})) //if 5 already exist then increase its quantity by 1
        }

        if(token){
            const response = await axios.post(`${url}/addtocart`,{foodId:itemId} ,{headers:{token}});
            // console.log(response);
        }
    }

    const removeFromCart = async(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))

        if(token){
            const response = await axios.post(`${url}/removecart`, {foodId:itemId},{headers:{token}});
            console.log(response);
         
        }
    }

    const fetchCartData = async(token)=>{
        const response = await axios.get(`${url}/getcart` , {headers:{token:token}});
        // console.log(response);
        setCartItems(response.data.cartData)
    }


    // useEffect(()=>{
    //     console.log(cartItems);
        
    // },[cartItems])

    

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                // Find the product in food_list
                const itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };
    
    
    const fetchFoodList = async()=>{
        try{

            const response = await axios.get(`${url}/showFoodList`)
            // console.log(response);
            setFoodList(response.data.foodDetails);

        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{

        async function loadData(){
            await fetchFoodList();

            if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"));
            await fetchCartData(localStorage.getItem("token"));
             }
            else{
            setToken("");
            }
        }
        loadData();

    },[])

    


    const contextvalue={
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }

    return(
        <StoreContext.Provider value={contextvalue}>
            {prop.children}
        </StoreContext.Provider>

    )
}

export default StoreContextProvider;