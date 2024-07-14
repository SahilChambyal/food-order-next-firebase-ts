"use client"

import { Button } from "@/components/ui/button";
import useCart from "@/hooks/use-carts";
import { Eraser } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import CartItem from "./cart-item";
import { Separator } from "@/components/ui/separator";
import Box from "@/components/box";
import axios from "axios";

interface CartContentProps{
    userId : string | null ;
}

const CartContent = ({userId}:CartContentProps) => {
    const cart = useCart();

    const searchParams = useSearchParams();

    const totalPrice = cart.items.reduce((total,item) => {
        return total + Number(item.price * item.qty);
    },0)

    useEffect(() => {
        if(searchParams.get("success")){
            toast.success("Payment Completed");
            cart.removeAll();
        }
        
        if (searchParams.get("canceld")){
            toast.error("Payment Not Completed");
        }
    },[searchParams,cart.removeAll]);

    const onCheckOut = async () => {
        console.log("starting checkout process")
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
            {
                products:cart.items,
                userId,
            }
        );

        window.location = response.data.url;
    };
    
    return ( 
        <>
            <div className="w-full flex items-center justify-between gap-4"> {/*i have added mb-4*/}
                <h2 className="text-3xl font-semibold text-neutral-700">
                    Cart Items
                </h2>
                <Button onClick={cart.removeAll} variant={"destructive"}>
                    Clear <Eraser className="w-4 h-4 ml-2"/>
                </Button>
            </div>
            
            <div className="w-full  lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-8 ">{/* modified w-full lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-8* to added to classname*/}
                <div className="col-span-8">{/*modified col-span-8*/}
                    {cart.items.length === 0 && (
                        <div className="mx-auto w-full justify-start flex items-center gap-4 border border-gray-200 p-3 rounded-lg">
                            <p className="text-3xl text-neutral-600 font-semibold">
                                No Items Added In The Cart
                            </p>
                        </div>
                    )}
                <div className="w-full space-y-4">
                    {cart.items.map(item => (
                        <CartItem key={item.id} item={item}/>
                    ))}
                </div>
                </div>
            <div className="col-span-4 space-y-6"> {/* i have changed the col-span-4 space-y-2*/} 
                <Box className="flex-col items-start justify-start gap-2 shadow-lg rounded-lg p-3 space-y-2 bg-slate-50">
                    <h2 className="text-lg text-neutral-700 font-semibold">
                        Order Summary
                    </h2>

                    <Separator />

                    <Box className="flex-col space-y-2">
                        <div className="flex items-center justify-between w-full px-4 whitespace-nowrap text-muted-foreground">
                            <p className="text-black font-bold text-base">Total</p>
                            <p className="font-semibold text-2xl text-black">
                                {totalPrice}
                            </p>
                        </div>
                    </Box>
                </Box>
                
                <Box className="flex-col items-start justify-start gap-2 shadow-lg rounded-lg p-3 space-y-2 bg-slate-50">
                    <h2 className="text-lg text-neutral-700 font-semibold">Payment</h2>

                    <Separator/>

                    <Button className="w-full" onClick={onCheckOut}>checkout</Button>
                </Box>
            </div>
            </div>
        </>
    );
}
 
export default CartContent;