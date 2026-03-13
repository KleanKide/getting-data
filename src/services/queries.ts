import Product from "@/components/typeForm";

export class TableCRM {
static apiKey = process.env.NEXT_PUBLIC_API_KEY
  static async fetch() {
    try {
      const response = await fetch(`https://app.tablecrm.com/api/v1/nomenclature/?token=${this.apiKey}`, {
        method: "GET",
      });
      const getResult = await response.json();
      if (!response.ok) {
        console.log("server", getResult);
        throw new Error(`Error ${response.status}`);
      }
      return getResult;
    } catch (error) {
      throw error;
    }
  }

  static async post(data:Product){
        try{
     const response = await fetch(`https://app.tablecrm.com/api/v1/nomenclature/?token=${this.apiKey}`, {
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
}

// export  async function PUT (url : string, data : Product){
//     try{
//      const response = await fetch(url, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data)
//     })
//      const result = await response.json()
//     if(!response.ok){
//         console.log("server" , result)
//         throw new Error(`Error ${response.status}`)
//     }

//     return result
//     }
//     catch(error){
//         throw error
//     }

// }
