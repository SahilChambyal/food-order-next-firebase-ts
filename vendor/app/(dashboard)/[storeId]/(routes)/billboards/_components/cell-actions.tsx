"use client"

import { BillboardsColumns } from "./columns"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Copy, Edit, MoreVerticalIcon, Trash } from "lucide-react"
import toast from "react-hot-toast"
import { deleteObject, ref } from "firebase/storage"
import { storage } from "@/lib/firebase"
import axios from "axios"
import { AlertModal } from "@/components/modal/alert-modal"

interface CellActionProps{
    data: BillboardsColumns
}


export const CellAction = ({data}: CellActionProps) => {

    const router = useRouter();
    const params = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("Billboard Id Copied to clipboard");
    }

    const onDelete = async() =>{
        try {
            setIsLoading(true);

            await deleteObject(ref(storage, data.imageUrl)).then(async () =>{
                
                await axios.delete(`/api/${params.storeId}/billboards/${data.id}`);
            })

            toast.success("Billboard Removed");
            router.push(`/${params.storeId}/billboards`);
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

            <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/billboards/${data.id}`)}>
                <Edit className="h-4 w-4 mr-2" />
                Update
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setOpen(true)}>
                <Trash className="h-4 w-4 mr-2" />
                Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  </>)
}
