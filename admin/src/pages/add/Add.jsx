import React from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'


const Add = ({url}) => {

    const [image , setImage] = useState(false);
    const[data , setData] = useState({name:"",description:"" , price:"", category:"Salad"});
    

    function changeHandler(event){

        const{name , value} = event.target;
        setData((prev)=>{
            return{
                ...prev,
                [name]:value
        }
        })
    }
 
   async function submitHandler(event){
        event.preventDefault();

        const formData = new FormData();
        formData.append("image",image);
        formData.append("name", data.name);
        formData.append("description" , data.description);
        formData.append('price',Number(data.price));
        formData.append('category',data.category);

        try{
            
            const response = await axios.post(`${url}/addfood`, formData);
            // console.log(response);
            setData({name:"",description:"" , price:"", category:"Salad"});
            setImage(false);
            toast.success("Product Added") ;

        }
        catch(err){
            console.log(err.response.data.message);

        }

    }


  return (
     

        <div className='add'>

            <form className='flex-col' onSubmit={submitHandler}>

                <div className="add-image-upload flex-col">                
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img  src={image ? URL.createObjectURL(image): assets.upload_area} width='100px' alt="" />
                    </label>
                    <input onChange={(e)=>{setImage(e.target.files[0])}} type="file" id='image' hidden required />
                </div>


                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input onChange={changeHandler} value={data.name} type='text' name='name' placeholder='Type here'/>
                </div>


                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea name='description' onChange={changeHandler} value={data.description} rows='6' placeholder='Write content here' required/>
                </div>
                

                <div className="add-category-price">

                    <div className="add-category flex-col">
                        <p>Add Category</p>
                        <select name="category" onChange={changeHandler} value={data.category}>
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>

                    <div className="add-price flex-col">
                        <p>Product price</p>
                        <input type='Number' onChange={changeHandler} value={data.price} name='price' placeholder='$20'/>
                    </div>

                </div>


                <button type='submit' className='add-btn'>ADD</button>

            </form>

        </div>

 
  )
}

export default Add