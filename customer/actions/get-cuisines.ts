
import {Cuisines} from "@/types-db";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/cuisines`;

 const getCuisines  = async ()  : Promise<Cuisines[]> => {

     const res = await fetch(URL) ;
     return res.json(); 
   
};

export default getCuisines