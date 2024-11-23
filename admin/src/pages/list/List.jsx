import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({url}) => {
  const[list , setList]= useState([]);
  

  const fetchList = async()=>{

    try{
      const response =  await axios.get(`${url}/showFoodList`);
      // console.log(response);
      setList(response.data.foodDetails); //fooddetail is array in response

    }
    catch(err){
      console.log(err.response.data.message);
    }
  }

  const removeFood =async(id)=>{
    try{
      const response = await axios.delete(`${url}/removeFood` , { data:{foodId:id}})
      console.log(response);
      await fetchList();
      toast.success("Product Deleted");
     
    }
    catch(err){
      console.log(err.response.data.message);
    }
  }


 useEffect(()=>{
  fetchList();
 },[])


  return (
    <div className='list add flex-col'>

      <p>All Foods List</p>

      <div className='list-table'>

        <div className='list-table-format title'>
          <b>Images</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {list.map((item,index)=>{
          return(
            <div key={index} className='list-table-format'>
              <img src={`https://tomato-food-ordering-app-ecsr.onrender.com/images/${item.image}`} alt="" width='50px' />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
            </div>
          )
        })}

      </div>


    </div>
  )
}

export default List