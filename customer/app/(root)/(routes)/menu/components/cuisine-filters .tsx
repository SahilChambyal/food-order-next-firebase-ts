"use client";

import Box from "@/components/box";
import {Cuisines}  from "@/types-db"
import { useSearchParams , useRouter} from "next/navigation";
import qs from "query-string";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";



interface CuisinesFiltersProps{
    cuisines : Cuisines[];
}

const CuisinesFilters = ({cuisines} : CuisinesFiltersProps) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleClick = (cuisine:string) => {
        const currentParams = Object.fromEntries(searchParams.entries());

        if (currentParams.cuisine ===  cuisine) {
            delete currentParams.cuisine;
        }
        else{
            currentParams.cuisine = cuisine;
        }

        const href= qs.stringifyUrl({
            url: "/menu",
            query : currentParams,

        });

        router.push(href)
    };


    return (
        <Box className="flex-col gap-2 border-b pb-4 cursor-pointer">
            <h2 className="text-xl font-semibold text-neutral-700">Cusines
            </h2>
            <Box className="flex-col gap-2 mt-2">
                {cuisines?.map((cuisine) => (
                    <div
                        onClick={() => handleClick(cuisine.name)}
                        key={cuisine.id}
                        className={cn("text-sm font-semibold text-neutral-500 flex items-center gap-2", cuisine.name === searchParams.get("cuisine") && "text-hero")}
                    >
                        <p>{cuisine.name} ({cuisine.value})
                        </p>
                        {cuisine.name === searchParams.get("cuisine") && (
                            <Check className="w-4 h-4 text-hero" />
                        )}
                    </div>
                ))}
            </Box>
        </Box>
    )
}


export default CuisinesFilters