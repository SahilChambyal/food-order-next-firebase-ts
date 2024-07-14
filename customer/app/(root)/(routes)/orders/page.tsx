import getOrders from "@/actions/get-orders";
import Box from "@/components/box";
import Container from "@/components/container";
import { auth } from "@clerk/nextjs/server";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import PageContent from "./components/page-content";

export const revalidate = 0;

const OrdersPage = async () => {
    const orders = await getOrders();
    const {userId} = auth();

    const formattedOrders = orders.filter((item) => item.userId === userId);
    
    return (
    <Container className="px-4 md:px-12 my-12 bg-white py-12 min-h-[80vh]">
        <Box className="text-neutral-700 text-sm items-center">
            <Link href="/" className="flex items-center gap-2">
                <Home className="w-5 h-5"/>Main Page
            </Link>

            <ChevronRight className="w-5 h-5 text-muted-foreground"/>
            <p className="flex items-center gap-2 text-muted-foreground">My Orders</p>
        </Box>

        <h2 className="my-4 text-xl font-semibold text-neutral-700">My Orders</h2>

        <PageContent orders={formattedOrders}/>
    
    </Container>
    );
};

export default OrdersPage