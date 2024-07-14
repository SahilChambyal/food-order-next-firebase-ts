"use client"

import { Products } from "@/types-db";
import { Card ,CardTitle,CardDescription} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Heart, HeartCrack, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import useCart from "@/hooks/use-carts";

export const revalidate = 0;

interface PopularContentProps{
    data:Products;
}


export const PopularContent = ({data}: PopularContentProps) => {

    const [isLiked , setIsLiked] = useState(false);
    
    const cart = useCart();

    const addToCart = (data:Products) => {
        cart.addItem({...data , qty:1})
    }

    const IsLiked = isLiked ? Heart : HeartCrack;
  return (
    <Card className="w-full max-h-[340px] rounded-md bg-white shadow-lg
        border-none flex flex-col items-center justify-center relative py-6 pt-24 md:pt-32">
            {/*displays food images on the home screen*/}
            <div className="absolute -top-[4%] md:-top-[20%] overflow-hidden w-24 md:w-40
                h-24 md:h-40 rounded-full bg-hero flex items-center justify-center p-1 md:p-2">
                    <div className="w-full h-full rounded-full bg-white relative ">
                        <Image 
                            className="w-full h-full object-contain rounded-lg "
                            fill
                            alt={data.name} 
                            src={data.images[0].url}
                            
                        />
                    </div>
            </div>
            {/* console.log("yo yo") */}
            {/*displays the name of the dish on the home screen*/}
            
            <Link href={`/menu/${data.id}`} className="w-full px-2 text-center">
                <CardTitle className="text-neutral-700 truncate w-full">
                    {data.name}
                </CardTitle>
            </Link>

            {/*displays the cuisine of the dish on the home screen*/}
            <div className="w-full grid grid-cols-4 gap-2 px-2 mt-4">
                {data.cuisine && (
                    <div className="rounded-md bg-emerald-500/10 px-2 py-[2px] text-[11px] font-semibold capitalize w-full whitespace-nowrap text-center truncate ">
                        {data.cuisine}
                    </div>
                )}
                    

                {data.category && (
                    <div className="rounded-md bg-blue-500/10 px-2 py-[2px] text-[11px] font-semibold capitalize w-full whitespace-nowrap text-center truncate">
                                {data.category}
                    </div>
                )}                   
                    
                    

                {data.kitchen && (
                    <div className="rounded-md bg-red-500/10 px-2 py-[2px] text-[11px] font-semibold capitalize w-full whitespace-nowrap text-center truncate">
                        {data.kitchen}
                    </div>
                )}
                {data.size && (
                    <div className="rounded-md bg-yellow-500/10 px-2 py-[2px] text-[11px] font-semibold capitalize w-full whitespace-nowrap text-center truncate">
                        {data.size}
                    </div>
                )}
            </div>

            <CardDescription className="text-center px-2 my-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero, incidunt, quam corrupti ipsa, odio quas omnis repellat quaerat porro quos cum.
            </CardDescription>

            <div className="w-full flex items-center px-2 mt-4 gap-3">
                <Button variant="outline" className="rounded-full font-bold text-lg text-muted-foreground">
                ₹{data.price}
                </Button>
                <Link href={`/menu/${data.id}`} className="w-full">
                    <Button className="bg-hero w-full rounded-full">Buy Now</Button>
                </Link>
            </div>

            <Button 
                    onClick={() => addToCart(data)} 
                    className="absolute top-0 right-0 rounded-tl-none rounded-tr-lg
                    rounded-bl-lg rounded-br-none p-2 px-3">
                        <ShoppingCart className="w-4 h-4"/>
            </Button>

            <Button
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-0 left-0 rounded-tl-none rounded-tr-lg rounded-bl-lg rounded-br-none p-2 px-3"
            >
            <IsLiked className="w-4 h-4" />
            </Button>
    </Card>
   
  )
}

