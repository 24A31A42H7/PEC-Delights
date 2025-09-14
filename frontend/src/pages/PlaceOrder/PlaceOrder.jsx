import React, { useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios';
const PlaceOrder = () => {
  const {getTotalCartAmount,token,food_list,cartItems,url}=useContext(StoreContext);
  const [data,setData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    studentId:"",
    phone:""
  })
  const onChangeHandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value}))
  }
 
  const placeOrder=async(event)=>{
    event.preventDefault();
    let orderItems=[];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo=item;
        itemInfo["quantity"]=cartItems[item._id];
        orderItems.push(itemInfo)

      }

    })
    let orderData={
     // userId: localStorage.getItem("userId"),
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2,



    }
    /*
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
    if(response.data.success){
      const {session_url}=response.data;
      window.location.replace(session_url);
    }
    else{
      alert("Error");
    }
      */
     let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
if (response.data.success) {
  const { orderId } = response.data;
  navigate(`/verify?orderId=${orderId}`);  // ✅ go to QR scan page
} else {
  alert("Error placing order");
}


  }
  const navigate=useNavigate();
    useEffect(()=>{
      if(!token){
        navigate('/cart')

      }else if(getTotalCartAmount()===0){
        navigate('/cart')

      }
    },[token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'> Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' type="text" onChange={onChangeHandler} value={data.firstName} placeholder='First name'/>
          <input required name='lastName' type="text" onChange={onChangeHandler} value={data.lastName} placeholder='Last Name' />
        </div>
        <input required name='email' type="text" onChange={onChangeHandler} value={data.email} placeholder='Email address' />
        <input required name='studentId' type="text" onChange={onChangeHandler} value={data.studentId} placeholder='Student Id' />
        
        
        <input required name='phone' type="text" onChange={onChangeHandler} value={data.phone} placeholder='phone' />
      </div>
      <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>₹{getTotalCartAmount()}</p>
            
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>₹{getTotalCartAmount()===0?0:2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>₹{getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
              </div>
              <hr />
            </div>
           <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>

    </form>
  )
}

export default PlaceOrder
