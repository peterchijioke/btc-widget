import axios from "axios";

 export const fetchBtcPrice = async (url:string) => {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api"+url
      );

      return {
        data:response.data,error:false
      }
     
    } catch (error:any) {
     return {error:true,message:error.message}
    }
  };