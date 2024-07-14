"use client"

import { Heading } from "@/components/heading"
import { AlertModal } from "@/components/modal/alert-modal"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {  Cuisine } from "@/types-db"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { Trash } from "lucide-react"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

interface CuisineFormProps{
    initialData: Cuisine,
}

const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(1),
});

export const CuisineForm = ({initialData}: CuisineFormProps) => {

    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    });

    const [isLoading, setIsLoading] = useState(false);
    const params = useParams();
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const title = initialData ? "Edit cuisine" : "Create cuisine";
    const description = initialData ? "Edit a cuisine"  : "Create a new cuisine";
    const toastMessage = initialData ? "cuisine Updated"  : "cuisine Created";
    const action = initialData ? "Save Changes"  : "Create cuisine";



    const onSubmit = async (data:z.infer<typeof formSchema> ) => {
        try {
            setIsLoading(true);
            console.log(data);


            if(initialData){
                await axios.patch(`/api/${params.storeId}/cuisines/${params.cuisineId}`, data);

            }else{
                await axios.post(`/api/${params.storeId}/cuisines`, data);
            }   
            toast.success(toastMessage);
            
            router.push(`/${params.storeId}/cuisines`);
            
            
        } catch (error) {
            toast.error("Something went wrong");
        } finally{
            router.refresh();
            // location.reload();
            setIsLoading(false);
        }
    };

    const onDelete = async() =>{
        try {
            setIsLoading(true);
                
            await axios.delete(`/api/${params.storeId}/cuisines/${params.cuisineId}`);

            toast.success("cuisine Removed");
            router.push(`/${params.storeId}/cuisines`);
        } catch (error) {
            toast.error("Something went wrong");
        } finally{
            router.refresh();
            setIsLoading(false);
            setOpen(false);
            
        }
    };

  return (
      <>
    <AlertModal 
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isLoading}
    />
        <div className="flex items-center justify-center">
            <Heading title={title} description={description} />
            {initialData && (<Button disabled={isLoading} variant={"destructive"} size={'icon'} onClick={() => setOpen(true)}>
                <Trash className="h-4 w-4" />
            </Button>)}
        </div>

        <Separator />

        <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
                    
                            <div className="grid grid-cols-3 gap-8">
                            <FormField control={form.control} name="name" render={({field}) => {
                                return <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={isLoading}
                                            placeholder="Your cuisine Name..."
                                            {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }} />
                            <FormField control={form.control} name="value" render={({field}) => {
                                return <FormItem>
                                    <FormLabel>Value</FormLabel>
                                    <FormControl>
                                        <Input disabled={isLoading}
                                            placeholder="Your cuisine value..."
                                            {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }} />


                            </div>
                
                                <Button disabled={isLoading} type="submit" size={"sm"}>Save Changes</Button>
                            
                                
                        </form>
                    </Form>
    </>
  )
}
