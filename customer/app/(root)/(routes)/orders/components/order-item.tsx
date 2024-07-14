"use client"

import Box from "@/components/box";
import { cn } from "@/lib/utils";
import { Orders } from "@/types-db"
import Image from 'next/image';

interface OrderItemProps {
    order:Orders;
}

const OrderItem = ({order}:OrderItemProps) => {
    return (
        <Box>
            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6 px-4 py-2 rounded-md border border-gray-100">
                <div className="flex items-center gap-2">
                    {order.orderItems.map(item => (

                        <div key={item.id} className='aspect-square w-16 min-w-16 h-16 min-h-16 rounded-md relative overflow-hidden bg-gray-100'>
                            <Image
                                src={item.images[0].url}
                                alt={item.name}
                                fill
                                className = "w-full h-full object-contain"
                                />

                        </div>

                    ))}
                </div>

                <p className="text-lg font-semibold text-muted-foreground">
                    {order.orderItems.map((item) => item.name).join(",")}
                </p>

                <p className={cn("text-base font-semibold",
                    (order.order_status === "Delivering" && "text-yellow-500") ||
                        (order.order_status === "Processing" && "text-orange-500") ||
                        (order.order_status === "Delivered" && "text-emerald-500") ||
                        (order.order_status === "Canceled" && "text-red-500")                    
                        )}>
                    {order.order_status}        
                </p>

                <p className={cn("text-base font-semibold",
                    order.isPaid ? "text-emerald-500" : "text-red-500"
                 )}>
                    {order.isPaid ? "Paid" : "Not Paid"}

                </p>
            </div>
        </Box>   
    );
}
 
export default OrderItem;