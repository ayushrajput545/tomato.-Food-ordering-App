import React from 'react'
import './Header.css';
import {assets} from '../../assets/assets';
const Header = () => {
  return (
    <div className='header'>

        <div className="header-content">
            <h2>Order Your favourite food here</h2>
            <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy our cravings.</p>
            <button>View Menu</button>
        </div>

        <img src={assets.header_img}  alt="" />

    </div>
  )
}

export default Header