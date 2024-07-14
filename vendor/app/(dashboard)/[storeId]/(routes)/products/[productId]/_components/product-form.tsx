"use client"

import { Heading } from "@/components/heading"
import ImageUpload from "@/components/image-upload"
import ImagesUpload from "@/components/images-upload"
import { AlertModal } from "@/components/modal/alert-modal"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {  Category, Cuisine, Kitchen, Product, Size } from "@/types-db"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { Trash } from "lucide-react"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

interface ProductFormProps{
    initialData: Product,
    categories: Category[],
    sizes: Size[],
    kitchens: Kitchen[],
    cuisines: Cuisine[],
}

const formSchema = z.object({
    name: z.string().min(1),
    price: z.coerce.number().min(1),
    images:  z.object({url: z.string()}).array(),
    isFeatured: z.boolean().default(false).optional(),
    isArchived: z.boolean().default(false).optional(),
    category: z.string().min(1),
    size: z.string().optional(),
    kitchen: z.string().optional(),
    cuisine: z.string().optional(),
});

export const ProductForm = ({initialData, categories, sizes, kitchens, cuisines}: ProductFormProps) => {

    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            price: 0,
            images: [],
            isFeatured: false,
            isArchived: false,
            category: "",
            size: "",
            kitchen: "",
            cuisine: "",

        }
    });

    const [isLoading, setIsLoading] = useState(false);
    const params = useParams();
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const title = initialData ? "Edit product" : "Create product";
    const description = initialData ? "Edit a product"  : "Create a new product";
    const toastMessage = initialData ? "product Updated"  : "product Created";
    const action = initialData ? "Save Changes"  : "Create product";



    const onSubmit = async (data:z.infer<typeof formSchema> ) => {
        try {
            setIsLoading(true);
            // console.log(data);


            if(initialData){
                await axios.patch(`/api/${params.storeId}/products/${params.productId}`, data);

            }else{
                await axios.post(`/api/${params.storeId}/products`, data);
            }   
            toast.success(toastMessage);
            
            router.push(`/${params.storeId}/products`);
            
            
        } catch (error) {
            toast.error("Something went wrong");
        } finally{
            router.refresh();
            setIsLoading(false);
        }
    };

    const onDelete = async() =>{
        try {
            setIsLoading(true);
                
            await axios.delete(`/api/${params.storeId}/products/${params.productId}`);

            toast.success("product Removed");
            router.push(`/${params.storeId}/products`);
        } catch (error) {
            toast.error("Something went wrong");
        } finally{
            // router.refresh();
            location.reload();
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
                    

                        <FormField 
                                control={form.control}
                                name = "images"
                                render = {({field}) => (
                                    <FormItem>
                                        <FormLabel>Billboard Image</FormLabel>
                                        <FormControl>
                                            <ImagesUpload 
                                                value={field.value.map(image => image.url)}
                                                onChange={(urls) => {
                                                    field.onChange(urls.map((url) => ({url})))
                                                }}
                                                onRemove={(url) => {
                                                    field.onChange(
                                                        field.value.filter(current => current.url !== url)
                                                    )
                                                }}

                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />  

                            <div className="grid grid-cols-3 gap-8">
                            <FormField control={form.control} name="name" render={({field}) => {
                                return <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={isLoading}
                                            placeholder="Product Name..."
                                            {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }} />
                            <FormField control={form.control} name="price" render={({field}) => {
                                return <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input type="number" disabled={isLoading}
                                            placeholder="0"
                                            {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }} />

                            <FormField control={form.control} name="category" render={({field}) => {
                                return <>
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select
                                        disabled={isLoading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue 
                                                    defaultValue={field.value}
                                                    placeholder="Select a Category"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                    <SelectContent>
                                        {categories.map(category => (
                                            <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                    </Select>
                                </FormItem>
                                </>
                            }} />

                            <FormField control={form.control} name="size" render={({field}) => {
                                return <>
                                <FormItem>
                                    <FormLabel>Size</FormLabel>
                                    <Select
                                        disabled={isLoading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue 
                                                    defaultValue={field.value}
                                                    placeholder="Select a Size"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                    <SelectContent>
                                        {sizes.map(size => (
                                            <SelectItem key={size.id} value={size.name}>{size.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                    </Select>
                                </FormItem>
                                </>
                            }} />

                            <FormField control={form.control} name="kitchen" render={({field}) => {
                                return <>
                                <FormItem>
                                    <FormLabel>Kitchen</FormLabel>
                                    <Select
                                        disabled={isLoading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue 
                                                    defaultValue={field.value}
                                                    placeholder="Select a Kitchen"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                    <SelectContent>
                                        {kitchens.map(kitchen => (
                                            <SelectItem key={kitchen.id} value={kitchen.name}>{kitchen.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                    </Select>
                                </FormItem>
                                </>
                            }} />

                            <FormField control={form.control} name="cuisine" render={({field}) => {
                                return <>
                                <FormItem>
                                    <FormLabel>Cuisine</FormLabel>
                                    <Select
                                        disabled={isLoading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue 
                                                    defaultValue={field.value}
                                                    placeholder="Select a Cuisine"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                    <SelectContent>
                                        {cuisines.map(cuisine => (
                                            <SelectItem key={cuisine.id} value={cuisine.name}>{cuisine.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                    </Select>
                                </FormItem>
                                </>
                            }} />

                            <FormField control={form.control} name="isFeatured" render={({field}) => {
                                return <>
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                                    <FormControl>
                                        <Checkbox 
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                     <div className="space-y-1 leading-none">
                                        <FormLabel>Featured</FormLabel>
                                        <FormDescription>
                                            This product will be displayed on homescreen under featured products
                                        </FormDescription>
                                     </div>
                                </FormItem>
                                </>
                            }} />


                            <FormField control={form.control} name="isArchived" render={({field}) => {
                                return <>
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                                    <FormControl>
                                        <Checkbox 
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                     <div className="space-y-1 leading-none">
                                        <FormLabel>Archived</FormLabel>
                                        <FormDescription>
                                            This product will be hidden from customers
                                        </FormDescription>
                                     </div>
                                </FormItem>
                                </>
                            }} />


                            </div>
                
                                <Button disabled={isLoading} type="submit" size={"sm"}>Save Changes</Button>
                            
                                
                        </form>
                    </Form>
    </>
  )
}
