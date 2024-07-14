"use client"

import Box from "@/components/box";
import { PopularContent } from "@/components/popular-content";
import { Products } from "@/types-db";
import { ChevronRight, Home, X } from "lucide-react";
import Link from "next/link";
import { useSearchParams,useRouter } from "next/navigation";
import qs from "query-string"

interface PageContentProps{
    products : Products[];
}
const PageContent = ({products} : PageContentProps) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const currentParams = Object.fromEntries(searchParams.entries());
    
    {/* gets the product from the */}
    const handleClick = (param:string) => {
        
        if (currentParams.hasOwnProperty(param)){
            const newParams = {...currentParams};
            delete newParams[param];
            const href= qs.stringifyUrl({
                url: "/menu",
                query : newParams,
                
            });
            
            router.push(href)
        }
    };
    
    return ( 
        <>
            <Box className="pt-4 pb-24 flex-col items-start">
                <Box className="text-neutral-700 text-sm items-center ">                     
                    <Link href={"/"} className="flex items-center gap-2">
                        <Home className="w-4 h-4"/>
                        Main Page
                    </Link>
                    <ChevronRight className="w-5 h-5 text-muted-foreground"/>
                    <Link href={"/menu"} className="flex items-center gap-2">
                        Products
                    </Link>

                    {searchParams.get("category") && (
                        <>
                            <ChevronRight className="w-5 h-5 text-muted-foreground"/>
                            <Link href="/menu" className="flex items-center gap-2">
                                {searchParams.get("category")}
                            </Link>
                        </>
                    )}
                </Box>
                
                <Box className="mt-8 flex-col items-start">
                    {searchParams.get("category") && (
                        <h2 className="flex items-center gap-2 text-3xl font-semibold text-neutral-600">
                            {searchParams.get("category")}
                        </h2>
                    )}

                    <Box className="gap-3 my-4">
                        {currentParams &&
                             Object.entries(currentParams).map(([key,value]) => (
                                 <div onClick={() => handleClick(key)} className="px-4 py-1 cursor-pointer hover:shadow-md rounded-md bg-emerald-500/10 text-neutral-600 flex items-center gap-1">
                                    {value}
                                    <X className="w-4 h-4"/>
                                </div>
                        ))}
                    </Box>
                </Box>
            </Box>

            <div className="grid grid-cols-2 lg:grid-cols-3 w-full h-full gap-4 gap-y-24">
                {products.length > 0 ? 
                (<>
                    {products.map((product) => (
                        <PopularContent data={product} key={product.id}/>
                    ))}
                </>) : 
                (<>
                    <Box className="items-center justify-center py-12 text-muted-foreground text-xl font-bold col-span-10">
                        No Products Available
                    </Box>
                </>)}
                        
            </div>    
    </> );
}
 
export default PageContent;