import { NextResponse } from 'next/server'
import { TableCRM } from '@/services/queries';

export const GET = async () =>{
    try{    
        const data = await TableCRM.fetch()
        return NextResponse.json(data) 
    }
    catch(error){
        console.log(error)
    }
} 
export const POST = async (req: Request) =>{
    try {
        const body = await req.json() 
        const result = await TableCRM.post(body)  
        return NextResponse.json(result)

    } 
    catch(error){
        console.log(error)
    }
} 