
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// ✅ Place order (no Stripe now)
const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      //userId: req.body.userId,
      userId:req.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      payment: false,   // initially unpaid
      status: "Pending" // default status
    });

    await newOrder.save();

    // clear user cart after placing order
    await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

    // instead of Stripe session_url, just return orderId
    res.json({ success: true, orderId: newOrder._id });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error placing order" });
  }
};

// ✅ Verify payment (manual update)
const verifyOrder = async (req, res) => {
  const { orderId, paid } = req.body;
  try {
    if (paid) {
      await orderModel.findByIdAndUpdate(orderId, { payment: true, status: "Paid" });
      res.json({ success: true, message: "Payment marked as Paid" });
    } else {
      await orderModel.findByIdAndUpdate(orderId, { payment: false, status: "Cancelled" });
      res.json({ success: true, message: "Payment marked as Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error verifying order" });
  }
};

// ✅ Get user orders
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching user orders" });
  }
};

// ✅ Get all orders (admin panel)
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching orders" });
  }
};

// ✅ Update order status
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error updating status" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };

/*

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
/*
/*

import Stripe from "stripe"

const stripe =new Stripe(process.env.STRIPE_SECRET_KEY)
*/
/*
// placing user  order frontend
const placeOrder =async(resizeBy,req)=>{
    const frontend_url="https://pec-delights-frontend.onrender.com";
    try {
        const newOrder=new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});
        const line_items=req.body.items.map(()=>({
            price_data:{
                curreny:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100*80
            },quantity:item.quantity

        }))
        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
               unit_amount:2*100*80
            },
             quantity:1

        })
        const session=await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })
        res.json({success:true,session_url:session.url})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }



}



const verifyOrder = async (req, res) => {
  const { orderId, paid } = req.body;
  try {
    if (paid) {
      await orderModel.findByIdAndUpdate(orderId, { payment: true, status: "Paid" });
      res.json({ success: true, message: "Payment marked as Paid" });
    } else {
      await orderModel.findByIdAndUpdate(orderId, { payment: false, status: "Cancelled" });
      res.json({ success: true, message: "Payment marked as Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error verifying order" });
  }
};
*/
/*
const verifyOrder=async(req,res)=>{
    const {orderId,success}=req.body;
    try {
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Paid"})
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Not Paid"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }


}
    */
/*
// user orders for frontend
const userOrders=async(req,res)=>{
    try {
        const orders=await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }

}


// listing orders for admin panel
const listOrders=async(req,res)=>{
    try {
        const orders=await orderModel.find({});
        res.json({success:true,data:orders})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }

}

//api for updating  status
const updateStatus=async(req,res)=>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true,message:"Status Updated"})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }


}
export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus}

*/
