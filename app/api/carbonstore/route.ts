import {CarbonFootprintSchema} from "@/lib/validation";
import CarbonFootprint from "@/models/carbonFootprint";
import {NextResponse, NextRequest} from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import {cookies} from "next/headers";
import {createSessionClient} from "@/lib/appwrite";
import axios from "axios";
export async function POST(req:Request){
    try {
        const session = (await cookies()).get('appwrite-session');
        if(!session || !session.value){
            return NextResponse.json({error: "No session found"}, {status: 401});
        }
        const {account} = await createSessionClient();
        const user = await account.get();
        const body = await req.json();
        const validateData = CarbonFootprintSchema.parse(body);
        
         await connect(); 
          const predictRes = await fetch("http://localhost:8000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validateData),
    });
    if (!predictRes.ok) {
      throw new Error("Failed to get prediction");
    }
    console.log("Prediction response:", predictRes);
    const { carbon_emission } = await predictRes.json()
        const newEntry = await CarbonFootprint.create({...validateData, userId: user.$id, carbonEmission: carbon_emission});
        return NextResponse.json({
            message: "Data store successfully",
            newEntry,
            carbonEmission: carbon_emission,
        },  { status: 201 });
    } catch (error:any) {
          return NextResponse.json({error: error.message}, {status: 500})
    }
}