import { db } from '@/lib/firebase';
import { Order } from '@/types-db';
import { collection, doc, getDocs } from 'firebase/firestore';

interface graphData{
    name: string,
    total: number
}

export const getGraphTotalRevenue = async(storeId: string) => {
    const ordersData = (
        await getDocs(collection(doc(db, 'stores', storeId), "orders"))
        ).docs.map((doc) => doc.data()) as Order[];

    const paidOrders = ordersData.filter((order) => order.isPaid);

    const monthlyRevenue : {[key: string]: number} = {}

    for(const order of paidOrders){
        const month = order.createdAt?.toDate().toLocaleDateString("en-US", {month: 'short'});
        
        if(month){
            let revenueForOrder = 0;

            for(const item of order.orderItems){
                if(item.qty !== undefined){
                    revenueForOrder += item.price * item.qty;
                }else{
                    revenueForOrder += item.price;  
                }
            }

            monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
        }
    }
    const monthMap: { [key: string]: number } = {
        Jan: 0,
        Feb: 1,
        Mar: 2,
        Apr: 3,
        May: 4,
        Jun: 5,
        Jul: 6,
        Aug: 7,
        Sep: 8,
        Oct: 9,
        Nov: 10,
        Dec: 11,
      };
    
      //   update the graph data
      const graphData: graphData[] = Object.keys(monthMap).map((monthName) => ({
        name: monthName,
        total: monthlyRevenue[monthName] || 0,
      }));
    
      return graphData;
    
}