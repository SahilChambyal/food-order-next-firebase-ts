import { collection, doc, getDocs } from "firebase/firestore";
import {  CuisineClient } from "./_components/client";
import { db } from "@/lib/firebase";
import { CuisineColumns } from "./_components/columns";
import {format} from "date-fns"
import {  Cuisine } from "@/types-db";

const CuisinePage = async({params}: {params: {storeId: string}}) => {

    const cuisinesData = (
        await getDocs(
            collection(doc(db, 'stores', params.storeId), 'cuisines')
        )
    ).docs.map(doc => doc.data()) as Cuisine[];

    const formattedCuisines: CuisineColumns[] = cuisinesData.map(item => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: item.createdAt ? format(item.createdAt.toDate(), 'dd/MM/yyyy') : "",
    })) 


    return ( <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <CuisineClient data={formattedCuisines}/>
        </div>
    </div> );
}
 
export default CuisinePage;