
import React, { useContext } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const confirmPayment = async () => {
    const response = await axios.post(url + "/api/order/verify", {
      orderId,
      paid: true, // user says payment done
    });
    if (response.data.success) {
      navigate("/myorders");
    } else {
      alert("Error verifying payment");
    }
  };

  return (
    <div className="verify">
      <h2>Scan & Pay</h2>
      <p>Use any UPI app (PhonePe, GPay, Paytm) to scan and pay.</p>
      <img src={assets.phonepeQR} alt="PhonePe QR" style={{ width: "250px" }} />
      <p>After paying, click the button below:</p>
      <button onClick={confirmPayment}>I Have Paid</button>
    </div>
  );
};

export default Verify;



/*
import React,{useContext} from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { useEffect } from 'react';
const Verify = () => {
    const [SearchParams,setSearchParams]=useSearchParams();
    const success=SearchParams.get("success")
    const orderId=SearchParams.get("orderId")
    const {url}=useContext(StoreContext);
    const navigate=useNavigate();
    const verifyPayment=async()=>{
        const response=await axios.post(url+"/api/order/verify",{success,orderId});
        if(response.data.success){
            navigate("/myorders")
        }else{
            navigate("/")
        }
    }
    useEffect(()=>{
        verifyPayment();
    },[])
  return (
    <div className='verify'>
        <div className="spinner"></div> 
      
    </div>
  )
}

export default Verify
*/