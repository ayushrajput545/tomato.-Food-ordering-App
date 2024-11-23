import React, { useContext, useState } from 'react'
import './Fooditem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';


const Fooditems = ({id ,name , price , description , image}) => {
 
  const{cartItems,addToCart,removeFromCart ,url}= useContext(StoreContext);
  return (
    <div className='food-item'>

        <div className="food-item-img-container">
            <img src={`https://tomato-food-ordering-app-ecsr.onrender.com/images/${image}`} alt="" className="food-item-image" />
            {!cartItems[id] //item count is zero then show on image otherwise show counter
              ?
              <img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white}/> 
              :
              <div className='food-item-counter'>
                <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                <p>{cartItems[id]}</p>
                <img onClick={()=>addToCart(id)}  src={assets.add_icon_green} alt="" />
                
               </div>
            
            }
        </div>

        <div className="food-item-info">

            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>

            <p className="food-item-description">{description} </p>

            <p className="food-item-price">${price} </p>
        </div>
        
    </div>
  )
}

export default Fooditems