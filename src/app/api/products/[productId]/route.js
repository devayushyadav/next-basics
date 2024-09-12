import { connectionString } from "@/lib/db"
import { Product } from "@/lib/model/product"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export const GET =  async (req,content) => {
    try{
        console.log(content.params.productId)
        const productId = content.params.productId

        if(!productId){
            return NextResponse.json({ error: "Product ID is required" },{ status: 400 })
        }

        
        await mongoose.connect(connectionString)
        
        const product = await Product.findById(productId)
        
        return NextResponse.json({success:true,product},{ status: 200 })
    }catch(e){
        console.log(e)
        return NextResponse.json({ error: "An error occurred while fetching data",e },{ status: 500 })
    }
}

export const PUT =  async (req,content) => {
    try{
        const productId = content.params.productId

        if(!productId){
            return NextResponse.json({ error: "Product ID is required" },{ status: 400 })
        }

        const updatedProduct = await req.json()

        console.log(updatedProduct)

        await mongoose.connect(connectionString)
        
        const product = await Product.findByIdAndUpdate(productId,updatedProduct)
        
        return NextResponse.json({success:true,product},{ status: 200 })
    }catch(e){
        console.log(e)
        return NextResponse.json({ error: "An error occurred while fetching data",e },{ status: 500 })
    }
}

export const DELETE =  async (req,content) => {
    try{
        const productId = content.params.productId

        if(!productId){
            return NextResponse.json({ error: "Product ID is required" },{ status: 400 })
        }

        await mongoose.connect(connectionString)
        
        const product = await Product.deleteOne({_id:productId})

        return NextResponse.json({success:true,product},{ status: 200 })
    }catch(e){
        console.log({e})
        return NextResponse.json({ error: "An error occurred while fetching data",e },{ status: 500 })
    }
}