import Product from "../../components/typeForm"

export  async function POST (url : string, data : Product){
    try{
     const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([data])
    })
     const result = await response.json()
    if(!response.ok){
        console.log("server" , result)
        throw new Error(`Error ${response.status}`)    
    }
   
    return result 
    }
    catch(error){
        throw error
    }
 
}


export async function GET (url : string){
    try{
     const response = await fetch(url, {
        method: "GET"
    })
     const getResult = await response.json()
    if(!response.ok){
        console.log("server" , getResult)
        throw new Error(`Error ${response.status}`)    
    }
    return getResult 
    }
    catch(error){
        throw error
    }
 
} 