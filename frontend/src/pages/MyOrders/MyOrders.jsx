import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {

    const{url , token} = useContext(StoreContext);
    const[data,setData] = useState([]);

    const fetchOrders = async()=>{

        try{

            const response = await axios.get(`${url}/userorders`, {headers:{token}});
            console.log(response.data.orders);
            setData(response.data.orders);

        }
        catch(err){
            console.log(err);
        }

    }

    useEffect(()=>{
        if(token){   //only for loggedin users
        fetchOrders();
        }
        
    },[token])

  return (


    <div className='my-orders'>

        <h2>My Orders</h2>
        
       {
        data.length==0 &&
        <div className='active'> No orders yet</div>
       }
        

        <div className="container">
            {
                data.map((order,index)=>{
                    return(
                        <div key={index} className='my-orders-order'>

                            <img src={assets.parcel_icon} alt=''/>

                            <p>
                                {order.items.map((item,index)=>{
                                    if(index === order.items.length-1){  //access or show last item from items array cuz we dont have comma at last item
                                        return item.name+"  x "+item.quantity;  //show in p tag
                                    }
                                    else{
                                        return item.name+"  x "+item.quantity + " , "
                                    }
                                })}
                            </p>

                            <p>${order.amount}.00</p>
                            <p>Items:{order.items.length}</p>
                            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                            <button onClick={fetchOrders}>Track Order</button>

                        </div>
                    )
                })
            }
        </div>

    </div>
  )
}

export default MyOrders