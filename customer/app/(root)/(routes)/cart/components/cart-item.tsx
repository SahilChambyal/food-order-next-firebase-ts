"use client"

import Box from "@/components/box";
import useCart from "@/hooks/use-carts";
import { Products } from "@/types-db";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";

interface CartItemProps{
    item:Products
}  
const CartItem = ({item}:CartItemProps) => {
    const [qty, setQty] = useState(item.qty ?? 1);

    const cart = useCart();

    const handleQuantity = (num:number) => {
        setQty(num);
        cart.updateItemQuantity(item.id,num);
    };

    return ( 
        <Box className="mx-auto w-full justify-start flex items-center gap-4 border border-gray-200 p-3 rounded-lg">
            <div className="aspect-square w-24 min-w-24 h-24 min-h-24 rounded-md bg-gray-100 flex items-center justify-center relative overflow-hidden">
                <Image
                    alt={item.name}
                    fill 
                    className="w-full h-full object-contain"
                    src={item.images[0].url}/>

            </div>

            <div>
                <h2 className="w-full min-w-44 whitespace-nowrap truncate font-semibold text-2xl text-neutral-700">
                    {item.name}
                </h2>
                <div className="w-full flex items-center justify-start gap-2 flex-wrap mt-4">
                {item.cuisine && (
                    <div className="rounded-md bg-emerald-500/10 px-2 py-[2px] text-[11px] font-semibold capitalize  ">
                        {item.cuisine}
                    </div>
                )}
                    

                {item.category && (
                    <div className="rounded-md bg-blue-500/10 px-2 py-[2px] text-[11px] font-semibold capitalize ">
                                {item.category}
                    </div>
                )}                   
                    
                    

                {item.kitchen && (
                    <div className="rounded-md bg-red-500/10 px-2 py-[2px] text-[11px] font-semibold capitalize">
                        {item.kitchen}
                    </div>
                )}
                {item.size && (
                    <div className="rounded-md bg-yellow-500/10 px-2 py-[2px] text-[11px] font-semibold capitalize ">
                        {item.size}
                    </div>
                )}

                </div>
            </div>

            <Box className="flex items-center justify-center h-full">
            <div className="flex items-center gap-2">
                    {[1,2,3,4,5].map((num) => (
                        <div
                            key={num}
                            className={cn("w-8 h-8 cursor-pointer rounded-full flex items-center justify-center border border-hero",
                                qty === num
                                ? "bg-hero shadow-md text-white" : "bg-transparent shadow-none")}
                                onClick={() => handleQuantity(num)}
                                >
                                    {num}
                        </div>
                    ))}
            </div>
            </Box>
            
            <Box className="flex items-center justify-center h-full">
                <h2>{item.price * item.qty}</h2>
            </Box>
            
            <div onClick={() => cart.removeItem(item.id)} className="w-auto m-auto">
                <Trash className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-red-500" />
            </div>
        </Box>
     );
}
 
export default CartItem;