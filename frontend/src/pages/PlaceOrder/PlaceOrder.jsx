import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const PlaceOrder = () => {

  const {getTotalCartAmount ,food_list , cartItems ,token ,url}= useContext(StoreContext);
  const navigate = useNavigate();

  const [data , setData] = useState({
    firstName:"",
    lastName:"",
    email:" ",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  });

  const changeHandler =(event)=>{
    const  {name , value} = event.target;
    setData((prev)=>{
      return{
        ...prev,
        [name]:value
      }
    })
  }

  const proceedToPayment = async(event)=>{
    try{
      event.preventDefault();

    let orderItems =[];
    food_list.map((item)=>{

      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo["quantity"]= cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })

     let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount() +2,
     }

     const response = await axios.post(`${url}/placeorder`, orderData , {headers:{token:token}});
    //  console.log(response);
     const {session_url}= response.data;
     window.location.replace(session_url);

    }

    catch(err){ 
      console.log(err);
    }
    
  }

  useEffect(()=>{

    if(!token){
      navigate('/cart');
      toast.error("Please Login")
    }
    else if(getTotalCartAmount()===0){
      navigate('/cart');
      toast.error("Please add items to cart")
    }
  },[token])

  return (

    <form onSubmit={proceedToPayment} className='placeorder'>

      <div className="place-order-left">

        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input required name='firstName' onChange={changeHandler} value={data.firstName} type="text" placeholder='First name' />
          <input required name='lastName' onChange={changeHandler} value={data.lastName} type="text" placeholder='Last name' />
        </div>

        <input required name='email' onChange={changeHandler} value={data.email} type="email" placeholder='Email Address'/>
        <input required name='street' onChange={changeHandler} value={data.street} type="text" placeholder='Street' />

        <div className="multi-fields">
          <input required name='city' onChange={changeHandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={changeHandler} value={data.state} type="text" placeholder='State' />
        </div>

        <div className="multi-fields">
          <input required name='zipcode' onChange={changeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
          <input required name='country' onChange={changeHandler} value={data.country} type="text" placeholder='Country' />
        </div>

        <input required name='phone' onChange={changeHandler} value={data.phone} type="text" placeholder='Phone' />


      </div>


      <div className="place-order-right">

      <div className="cart-total">

        <h2>Cart Totals</h2>

        <div>

          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()} </p>
          </div>
          <hr />
          
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${getTotalCartAmount()===0?0:2}</p>
          </div>
          <hr />

          <div className="cart-total-details">
            <b>Total</b>
            <b>${getTotalCartAmount()===0?0: getTotalCartAmount()+2}</b>
          </div>

        </div>

        <button>PROCEED TO PAYMENT</button>
      </div>



      </div>

    </form>
     

  )
}

export default PlaceOrder