import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category,setcategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your craving and elevate your dining experience, one delicious meal at a time.</p>

      <div className="explore-menu-list">
        {/* Int This div we render menu list using map function */}

        {menu_list.map((item,index)=>{
          return (
            <div key={index} className='explore-menu-item-list' onClick={()=>setcategory(prev=>prev===item.menu_name?"All":item.menu_name)}>
               <img src={item.menu_image} alt="" className={category===item.menu_name?"active":""} /> {/*Adding dynimic classname8*/}
               <p>{item.menu_name}</p>
            </div>
          )
        })}
      </div>
    {/* Creating horizontal line */}
      <hr />  

    </div>
  )
}

export default ExploreMenu