"use client"

import { Products } from "@/types-db";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CookingPot, ShoppingCart, Soup, SquareActivity, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/use-carts";

interface InfoProps{
    product:Products;
}
const Info = ({product} : InfoProps) => {
    const [qty,setQty] = useState(1);

    const cart = useCart();

    const handleQty = (num:number) => {
        setQty(num);
        cart.updateItemQuantity(product.id , num)
    }

    const addToCart = (data:Products) => {
        cart.addItem({...data,qty:qty})
    }

    return ( 
    <div>
        <h1 className="font-bold text-neutral-800 text-3xl">
            {product.name}
        </h1>
        <div className="mt-3 flex items-end justify-between">
            <p className="text-base text-left text-neutral-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi impedit sed sunt in dignissimos vel cupiditate exercitationem minus, facilis quas blanditiis laborum est quibusdam officiis. 
                Voluptatum consectetur excepturi suscipit sunt.
            </p>
        </div>

        <div className="w-full flex items-center justify-start gap-2 flex-wrap px-2">
            {product.cuisine && (
                <div className="rounded-md bg-emerald-500/10 px-3 py-2 text-base font-semibold capitalize flex items-center gap-2">
                       <CookingPot className="w-5 h-5"/>
                       {product.cuisine} 
                </div>
            )}

            {product.category && (
                <div className="rounded-md bg-emerald-500/10 px-3 py-2 mt-5 text-base font-semibold capitalize flex items-center gap-2">
                       <Soup className="w-5 h-5"/>
                       {product.category} 
                </div>
            )}

            {product.kitchen && (
                <div className="rounded-md bg-emerald-500/10 px-3 py-2 text-base font-semibold capitalize flex items-center gap-2">
                       <Utensils className="w-5 h-5"/>
                       {product.kitchen} 
                </div>
            )}

            {product.size && (
                <div className="rounded-md bg-emerald-500/10 px-3 py-2 text-base font-semibold capitalize flex items-center gap-2">
                       <SquareActivity className="w-5 h-5"/>
                       {product.size} 
                </div>
            )}
        </div>

        <div className="w-full grid grid-cols-4 my-12">
            <div className="col-span-1 space-y-8">
                <p className="text-lg font-semibold text-neutral-700">Price</p>
                <p className="text-lg font-semibold text-neutral-700">Services</p>
            </div>
            <div className="col-span-3 space-y-8">
                <p className="text-xl font-bold text-black">${product.price}</p>
                <div className="flex items-center gap-2">
                    {[1,2,3,4,5].map((num) => (
                        <div
                            key={num}
                            className={cn("w-8 h-8 cursor-pointer rounded-full flex items-center justify-center border border-hero",
                                qty === num
                                ? "bg-hero shadow-md text-white" : "bg-transparent shadow-none"
                            )}
                                onClick={() => handleQty(num)}
                                >
                                    {num}
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <Button 
         onClick={() => addToCart(product)}
         className="w-full py-6 text-xl font-semibold hover:bg-hero hover:text-white flex items-center justify-center gap-3">Add To Cart<ShoppingCart className="w-4 h-4"/></Button>

    </div> );
}
 
export default Info;