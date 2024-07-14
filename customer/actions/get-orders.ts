import { Orders } from "@/types-db";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/orders`;

const getOrders = async (): Promise<Orders[]> => {
    const response = await fetch(URL);
    return response.json();
}

export default getOrders;
