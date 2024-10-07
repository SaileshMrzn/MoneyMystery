import { connect } from "@/src/dbConfig/dbConfig";
import Category from "@/src/models/categoryModel";
import { NextResponse } from "next/server";

connect();

export async function GET () {
    try {
        const categories = await Category.find();
    
        return NextResponse.json({
            success:true,
            message:"Categories fetched",
            categories
        }, {status:200})
    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json({error:error.message},{status:500})
        }else{
            return NextResponse.json(
              { error: "An unknown error occurred while fetching categories" },
              { status: 500 }
            );
        }
    }

}