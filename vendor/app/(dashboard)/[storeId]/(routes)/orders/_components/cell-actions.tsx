"use client"

import { OrdersColumns } from "./columns"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Copy, Edit, MoreVerticalIcon, Trash } from "lucide-react"
import toast from "react-hot-toast"
import axios from "axios"
import { AlertModal } from "@/components/modal/alert-modal"

interface CellActionProps{
    data: OrdersColumns
}


export const CellAction = ({data}: CellActionProps) => {

    const router = useRouter();
    const params = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("Order Id Copied to clipboard");
    }

    const onDelete = async() =>{
        try {
            setIsLoading(true);
                
            await axios.delete(`/api/${params.storeId}/orders/${data.id}`);
            
            location.reload();
            toast.success("Order Removed");
            router.push(`/${params.storeId}/orders`);
        } catch (error) {
            toast.error("Something went wrong");
        } finally{
            // router.refresh();
            location.reload();
            setIsLoading(false);
            setOpen(false);
            
        }
    };

    const onUpdate = async(data: any) =>{
        try {
            setIsLoading(true);
                
            await axios.patch(`/api/${params.storeId}/orders/${data.id}`, data);
            location.reload();
            router.push(`/${params.storeId}/orders`);
            toast.success("Order Updated");
        } catch (error) {
            toast.error("Something went wrong");
        } finally{
            // router.refresh();
            location.reload();
            setIsLoading(false);
            setOpen(false);
            
        }
    };

  return (<>
    <AlertModal isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isLoading}
    />
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button className="w-8 h-8 p-0" variant={"ghost"}>
                <span className="sr-only">Open</span>
                <MoreVerticalIcon className="h-4 w-4"/>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onCopy(data.id)}>
                <Copy className="h-4 w-4 mr-2" />
                Copy Id
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => onUpdate({id: data.id, order_status: 'Delivering'})}>
                <Edit className="h-4 w-4 mr-2" />
                Delivering
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => onUpdate({id: data.id, order_status: 'Delivered'})}>
                <Edit className="h-4 w-4 mr-2" />
                Delivered
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => onUpdate({id: data.id, order_status: 'Canceled'})}>
                <Edit className="h-4 w-4 mr-2" />
                Cancel
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setOpen(true)}>
                <Trash className="h-4 w-4 mr-2" />
                Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  </>)
}
