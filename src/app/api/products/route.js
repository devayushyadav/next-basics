import { connectionString } from "@/lib/db";
import { Product } from "@/lib/model/product";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    try{
        await mongoose.connect(connectionString)
    
        const data = await Product.find()
    
        return NextResponse.json({
            success: true,
            result : data
        });

    }
    catch(err){
        return NextResponse.json({err});
    }

  };


  export const POST = async (req,res) => {
    try{
        await mongoose.connect(connectionString)

        const payload = await req.json()

        let product = new Product(payload)
        
        const result =  await product.save()

        return NextResponse.json({
            success: true,
            result : {...result}
        });
        
    }catch(err){
        return NextResponse.json({success:false,err:err});
    }
  }
  