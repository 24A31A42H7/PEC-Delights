import mongoose from "mongoose";


export const connecDB=async()=>{
    await mongoose.connect('mongodb+srv://mahesh:PEC_Delights@cluster0.yzrxv7b.mongodb.net/pec-delights').then(()=>console.log("DB Connected"));
}