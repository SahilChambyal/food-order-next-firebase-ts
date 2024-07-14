import { collection, doc, getDocs } from "firebase/firestore";
import {  SizeClient } from "./_components/client";
import { db } from "@/lib/firebase";
import { SizeColumns } from "./_components/columns";
import {format} from "date-fns"
import {  Size } from "@/types-db";

const SizesPage = async({params}: {params: {storeId: string}}) => {

    const sizesData = (
        await getDocs(
            collection(doc(db, 'stores', params.storeId), 'sizes')
        )
    ).docs.map(doc => doc.data()) as Size[];

    const formattedsizes: SizeColumns[] = sizesData.map(item => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: item.createdAt ? format(item.createdAt.toDate(), 'dd/MM/yyyy') : "",
    })) 


    return ( <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <SizeClient data={formattedsizes}/>
        </div>
    </div> );
}
 
export default SizesPage;