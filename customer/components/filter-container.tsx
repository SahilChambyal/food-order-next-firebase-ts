"use client"

import {cn} from "@/lib/utils";
import Box from "./box";

interface FilterContainerProps{
    children:React.ReactNode;
    className?:string;
}

const FilterContainer = ({className , children}:FilterContainerProps) => {
    return(
        <Box className={cn("flex-col gap-4" , className)}>
            {children}
        </Box>
    )
}

export default FilterContainer