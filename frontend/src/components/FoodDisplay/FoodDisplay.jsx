import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import Fooditems from '../Fooditems/Fooditems';

const FoodDisplay = ({category}) => {

    const{food_list, loader}= useContext(StoreContext) //fetch from contexapi

  return (
    <div className='food-display' id='food-display'>

        <h2>Top dishes near you</h2>
        {
          loader && <div className='loader'></div>
        }
        <div className='food-display-list'>
            {food_list.map((item,index)=>{

              if(category==="All" || category===item.category)  // if we click any item on menu then it will display
                return <Fooditems key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
            })}
        </div>
         
    </div>
  )
}

export default FoodDisplay