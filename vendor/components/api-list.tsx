"use client"

import { useOrigin } from "@/hooks/use-origin";
import { useParams, useRouter } from "next/navigation";
import { ApiAlert } from "./api-alert";


interface ApiListProps{
    entityName: string,
    entityNameId: string
}

const ApiList = ({entityName, entityNameId}: ApiListProps) => {

    const router = useRouter();
    const origin = useOrigin();
    const params = useParams();

    const baseUrl = `${origin}/api/${params.storeId}`

    return ( <>
        <ApiAlert
            title="GET"
            variant="public"
            description={`${baseUrl}/${entityName}`}
        />
        <ApiAlert
            title="GET"
            variant="public"
            description={`${baseUrl}/${entityName}/${entityNameId}`}
        />
        <ApiAlert
            title="POST"
            variant="admin"
            description={`${baseUrl}/${entityName}`}
        />
        <ApiAlert
            title="PATCH"
            variant="admin"
            description={`${baseUrl}/${entityName}/${entityNameId}`}
        />
        <ApiAlert
            title="DELETE"
            variant="admin"
            description={`${baseUrl}/${entityName}/${entityNameId}`}
        />
    </> );
}
 
export default ApiList;