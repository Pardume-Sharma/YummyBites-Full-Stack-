import { useState } from 'react'
import './Add.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import {assets} from '../../assets/assets.js'

const Add = (url) => {
    
    const [image,setImage] = useState(false);
    const [data, setData] = useState({
        name:"",
        description:"",
        price:"",
        category:"Salad"
    })

    const onChangeHandler = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setData(data =>({
            ...data,[name]:value
        }))

    }    

    const onSubmitHandler = async (event)=>{
        event.preventDefault();
        const formData = new FormData();
        formData.append('name',data.name)
        formData.append('description',data.description)
        formData.append('price',Number(data.price))
        formData.append('category',data.category)
        formData.append('image',image)    
        const response = await axios.post(`${url}/api/food/add`,formData) 
        if (response.data.success) {
            setData(
                {
                    name:"",
                    description:"",
                    price:"",
                    category:"Salad"
                })
            setImage(false)
            toast.success(response.data.message)
        } 
        else{
            toast.error(response.data.message)
        }
        
    }

  return (
    <>
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className='add-img-upload flex-col'>
                    <p>Upload Image</p>
                    <label htmlFor="image">
                            <img src={image?URL.createObjectURL(image):assets.upload_area} alt=''/>
                    </label>
                    <input onChange={(e)=>{
                        setImage(e.target.files[0])
                    }} type='file' id='image' hidden required/>
                </div>

                <div className='add-product flex-col'>
                    <p>Product Name</p>
                    <input onChange={onChangeHandler} value={data.name}  type='text' required name='name' placeholder='Enter Here'/>
                </div>
                
                <div className='add-product-description flex-col'>
                    <p>Product Description</p>
                    <textarea onChange={onChangeHandler} value={data.description} rows='6' required name='description' placeholder='Write Content Here'/>
                </div>
                
                <div className='add-category-price'>
                    <div className='add-category flex-col'>
                        <p> Product category</p>
                        <select onChange={onChangeHandler} required name='category'>
                            <option value='Salad'>Salad</option>
                            <option value='Rolls'>Rolls</option>
                            <option value='Deserts'>Deserts</option>
                            <option value='Sandwich'>Sandwich</option>
                            <option value='Cake'>Cake</option>
                            <option value='Pure Veg'>Pure Veg</option>
                            <option value='Pasta'>Pasta</option>
                            <option value='Noodles'>Noodles</option>
                        </select>
                    </div>
                    <div className='add-price flex-col'>
                            <p>Product Price</p>
                            <input onChange={onChangeHandler} value={data.price} type='Number' required name='price' placeholder='Enter Here'/>
                    </div>
                </div>
                <button type='submit' className='add-btn'>Add</button>
            
            </form>
        </div>
    </>
  )
}

export default Add;