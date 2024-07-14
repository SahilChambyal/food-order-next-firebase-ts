"use client";

import Box from "@/components/box";
import {Kitchen}  from "@/types-db"
import { useSearchParams , useRouter} from "next/navigation";
import qs from "query-string";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";



interface KitchenFiltersProps{
    kitchens : Kitchen[];
}

const KitchenFilters = ({kitchens} : KitchenFiltersProps) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleClick = (kitchen:string) => {
        const currentParams = Object.fromEntries(searchParams.entries());

        if (currentParams.kitchen === kitchen) {
            delete currentParams.kitchen;
        }
        else{
            currentParams.kitchen = kitchen;
        }

        const href= qs.stringifyUrl({
            url: "/menu",
            query : currentParams,

        });

        router.push(href)
    };


    return (
        <Box className="flex-col gap-2 border-b pb-4 cursor-pointer">
            <h2 className="text-xl font-semibold text-neutral-700">Kitchen 
            </h2>
            <Box className="flex-col gap-2 mt-2">
            {kitchens?.map((kitchen) => (
                    <div
                        onClick={() => handleClick(kitchen.name)}
                        key={kitchen.id}
                        className={cn("text-sm font-semibold text-neutral-500 flex items-center gap-2", kitchen.name === searchParams.get("kitchen") && "text-hero")}
                    >
                        <p>{kitchen.name} ({kitchen.name})
                        </p>
                        {kitchen.name === searchParams.get("kitchen") && (
                            <Check className="w-4 h-4 text-hero" />
                        )}
                    </div>
                    ))}
            </Box>
        </Box>
    )
}


export default KitchenFilters