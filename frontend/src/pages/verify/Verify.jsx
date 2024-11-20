import React, { useContext, useEffect } from 'react'
import './verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
    const[searchParams, setSearchParams] = useSearchParams();
    const {url} = useContext(StoreContext);
    const navigate = useNavigate();

    const success = searchParams.get("success"); // it will give true or false
    const orderId = searchParams.get("orderId");

    // console.log(success,orderId);
    const verifyPayment = async()=>{
        try{
           const response = await axios.post(`${url}/verify`,{orderId,success})
           console.log(response);
           navigate('/myorders');
          
        }
        catch(err){
            console.log(err);
            navigate('/');
        }
    }

    useEffect(()=>{
        verifyPayment();
    },[])

  return (
    <div className='verify'>

        <div className="spinner">

        </div>


    </div>
  )
}

export default Verify