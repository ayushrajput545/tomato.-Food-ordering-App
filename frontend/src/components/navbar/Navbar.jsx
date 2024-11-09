import React, { useContext, useState } from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets';
import {Link, useNavigate} from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({setShowLogin}) => {

  //State variable for set underline in ul 
  const[menu, setMenu] = useState("home");
  const {getTotalCartAmount} = useContext(StoreContext);
  

  return (

    <div className='navbar'>

       <Link to='/'> <img src={assets.logo} alt="" className="logo" /> </Link>  {/*use this after importing asstes.js file in assets in which we export images as a obejcts assets*/}

       <ul className="navbar-menu">
        <Link  to='/' onClick={()=>setMenu("home")}  className={menu==="home"?"active":""}>home</Link> {/* active class for underline */}
        <a href='#explore-menu'  onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</a>
        <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile-app</a>
        <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""} >contact us</a>
       </ul >

      <div className="navbar-right">

        <img src={assets.search_icon} alt="" />

        <div className="navbar-search-icon">

          <Link to='/cart'><img src={assets.basket_icon} alt=""/></Link> 
           <div className={getTotalCartAmount()===0?"":"dot"}></div>{/* Creating dynimic classname */}

        </div>

        <button onClick={()=>setShowLogin(true)}>Sign in</button>

      </div>



    </div>
  )
}

export default Navbar