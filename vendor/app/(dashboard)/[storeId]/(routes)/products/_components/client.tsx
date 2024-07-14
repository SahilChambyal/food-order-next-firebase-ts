"use client"

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { Billboards } from "@/types-db";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation"
import { ProductColumns, columns } from "./columns";
import ApiList from "@/components/api-list";

interface ProductClientProps{
  data: ProductColumns[];
}

export const ProductClient = ({data}: ProductClientProps) => {

    const params = useParams();
    const router = useRouter();

  return (<>
    <div className="flex items-center justify-between">
        <Heading title={`Products (${data.length})`} description="Manage products for your store"/>
        <Button onClick={() => router.push(`/${params.storeId}/products/create`)}>
            <Plus className="h-4 w-4 mr-2"/>
            Add New
        </Button>
    </div>
    <Separator />
    <DataTable searchKey="name" columns={columns} data={data}/>

    <Heading title="API" description="API calls for products" />
    <Separator />
    <ApiList entityName="products" entityNameId="productId" />
  </>);
}
