import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const LoginPopup = ({setShowLogin}) => {

    const[currState, setCurrentState] = useState("Login");
    const{url ,token , setToken} = useContext(StoreContext);

    const[data , setData] = useState({
        name:"",
        email:"",
        password:""
    });

    function changeHandler(event){
        const{name , value} = event.target;

        setData((prev)=>{
            return{
                ...prev,
                [name]:value
            }
        })

    }

    // useEffect(()=>{
    //     console.log(data);
    // },[data])

   async function onLogin (event){
        event.preventDefault();
        let response;

        try{
             
            if(currState=="Login"){
                 response = await axios.post(`${url}/login`,data);
            }
            else{
                 response = await axios.post(`${url}/signup`,data)
            }
            console.log(response);
            setData( {name:"",email:"", password:""});
            setToken(response.data.token);
            localStorage.setItem("token" , response.data.token);
            setShowLogin(false);

        }
        catch(err){
            
            toast.error(err.response.data.message);

        }

    }

  return (
    <div className='login-popup'>

        <form onSubmit={onLogin} className='login-popup-container'>

            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img  onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>

            <div className="login-popup-inputs">
                {currState==="Login"?<></> :  <input type="text" placeholder='Your name' name='name' value={data.name} onChange={changeHandler} required />}  {/*This input only show when we sign up*/}
               
                <input type="email" placeholder='Your email' name='email' value={data.email} onChange={changeHandler} required />
                <input type="password" placeholder='Password' name='password' value={data.password} onChange={changeHandler} required />
            </div>

            <button>{currState==="Sign up"?"Create account" : "Login"} </button>

            <div className='login-popup-condition'>
                <input type="checkbox" required/>
                <p>By continuing, I agree to the terms of use & privacy policy</p>
            </div>

             {currState==="Login"
              ?
              <p>Create a new account? <span onClick={()=>setCurrentState("Sign up")}>Click here</span></p>
              :
               <p>Already have an account? <span onClick={()=>setCurrentState("Login")}>Login here</span></p>}
           
            

        </form>
 
    </div>
  )
}

export default LoginPopup