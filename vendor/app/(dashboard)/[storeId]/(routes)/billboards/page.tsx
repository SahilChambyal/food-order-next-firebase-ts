import { collection, doc, getDocs } from "firebase/firestore";
import { BillBoardClient } from "./_components/client";
import { db } from "@/lib/firebase";
import { BillboardsColumns } from "./_components/columns";
import {format} from "date-fns"
import { Billboards } from "@/types-db";

const BillboardsPage = async({params}: {params: {storeId: string}}) => {

    const billboardsData = (
        await getDocs(
            collection(doc(db, 'stores', params.storeId), 'billboards')
        )
    ).docs.map(doc => doc.data()) as Billboards[];

    const formattedBillboards: BillboardsColumns[] = billboardsData.map(item => ({
        id: item.id,
        label: item.label,
        imageUrl: item.imageUrl,
        createdAt: item.createdAt ? format(item.createdAt.toDate(), 'dd/MM/yyyy') : "",
    })) 


    return ( <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <BillBoardClient data={formattedBillboards}/>
        </div>
    </div> );
}
 
export default BillboardsPage;