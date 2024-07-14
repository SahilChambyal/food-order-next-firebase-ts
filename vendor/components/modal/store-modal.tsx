"use client"

import { UseStoreModal } from "@/hooks/use-store-modal"

import { Modal } from "@/components/modal"
import {z} from 'zod'
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axios from 'axios' 
import toast from "react-hot-toast"


const formSchema = z.object({
    name: z.string().min(3, {message: "Store name should be minimum 3 characters"}),
});

export const StoreModal = () => {
    
    const storeModal = UseStoreModal();
    // const storeModal = UseStoreModal();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true);
            const response = await axios.post("/api/stores", values);
            toast.success("Store Created");
            window.location.assign(`/${response.data.id}`);          
        } catch (error) {
            toast.error("Something went wrong");
        } finally{
            setIsLoading(false);
        }

    };

    return(
        <Modal title="Create a new store" 
        description="Add a new store to manage the products and categories"
        isOpen={storeModal.isOpen}
        onClose={storeModal.onClose}
        >
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField control={form.control} name="name" render={({field}) => {
                                return <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={isLoading}
                                            placeholder="Your Store Name..."
                                            {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }} />
                            <div className="flex justify-end pt-6 space-x-2 items-center w-full">
                                <Button disabled={isLoading} type="button" variant={"outline"} size={"sm"}>Cancel</Button>
                                <Button disabled={isLoading} type="submit" size={"sm"}>Continue</Button>
                            </div>
                                
                        </form>
                    </Form>
                </div>
            </div>

        </Modal>
    );
};