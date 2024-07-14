import qs from 'query-string';
import { Products } from "@/types-db";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
     size?: string;
     isFeatured?: boolean;
     cuisine?: string;
     category?: string;
     kitchen?: string;
};

const getProducts = async(query: Query): Promise<Products[]> => {
    const url = qs.stringifyUrl(
        {
        url : URL,
        query:{
            size : query.size,
            isFeatured: query.isFeatured,
            cuisine: query.cuisine,
            category: query.category,
            kitchen: query.kitchen,
        }
});
    const res = await fetch(URL) ;
    return res.json(); 
  
};

export default getProducts

