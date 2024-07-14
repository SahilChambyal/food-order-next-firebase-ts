import { getGraphTotalRevenue } from '@/actions/get-graph-total-revenue';
import { getOrderStatusTotalRevenue } from '@/actions/get-revenue-order-status';
import { getTotalProducts } from '@/actions/get-total-products';
import {  getTotalRevenue } from '@/actions/get-total-revenue';
import { getOrderTotalRevenueByCategory } from '@/actions/get-total-revenue-by-category';
import { getOrderPaymentStatusTotalRevenue } from '@/actions/get-total-revenue-by-order-status';
import { getTotalSales } from '@/actions/get-total-sales';
import { Heading } from '@/components/heading';
import Overview from '@/components/overview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { db } from "@/lib/firebase";
import { formatter } from '@/lib/utils';
import { Store } from "@/types-db";
import { doc, getDoc } from "firebase/firestore";

interface DashboardOverviewProps{
    params: {storeId:string};
}

const DashboardOverview = async({params}: DashboardOverviewProps) => {

    const totalRevenue = await getTotalRevenue(params.storeId);
    const totalSales = await getTotalSales(params.storeId);
    const totalProducts = await getTotalProducts(params.storeId);
    const monthlyGraphRevenue = await getGraphTotalRevenue(params.storeId);
    const orderStatusTotalRevenue = await getOrderPaymentStatusTotalRevenue(params.storeId);
    const revenueByCategory = await getOrderTotalRevenueByCategory(params.storeId);
    const revenueByOrderStatus = await getOrderStatusTotalRevenue(params.storeId);

    return <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <Heading title='Dashboard' description='Overview of your store'/>
            <Separator />
            <div className='grid gap-4 grid-cols-4'>
                <Card className='col-span-2'>
                    <CardHeader className='flex items-center justify-between flex-row'>
                        <CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>
                        <div className='text-m text-gray-500'>₹</div>
                    </CardHeader>

                    <CardContent>
                        <div className='text-2xl font-bold'>
                            {formatter.format(totalRevenue)}
                        </div>
                    </CardContent>

                </Card>

                <Card className='col-span-1'>
                    <CardHeader className='flex items-center justify-between flex-row'>
                        <CardTitle className='text-sm font-medium'>Sales</CardTitle>
                        <div className='text-m text-gray-500'>₹</div>
                    </CardHeader>

                    <CardContent>
                        <div className='text-2xl font-bold'>
                            +{totalSales}
                        </div>
                    </CardContent>

                </Card>

                <Card className='col-span-1'>
                    <CardHeader className='flex items-center justify-between flex-row'>
                        <CardTitle className='text-sm font-medium'>Products</CardTitle>
                        <div className='text-m text-gray-500'>₹</div>
                    </CardHeader>

                    <CardContent>
                        <div className='text-2xl font-bold'>
                            +{totalProducts}
                        </div>
                    </CardContent>

                </Card>

                <Card className='col-span-3'>
                    <CardHeader className='flex items-center justify-between flex-row'>
                        <CardTitle className='text-sm font-medium'>Revenue by Month</CardTitle>
                        <div className='text-m text-gray-500'>₹</div>
                    </CardHeader>

                    <CardContent>
                        <Overview data={monthlyGraphRevenue} />
                    </CardContent>

                </Card>

                <Card className='col-span-1'>
                    <CardHeader className='flex items-center justify-between flex-row'>
                        <CardTitle className='text-sm font-medium'>Revenue by Payment Status</CardTitle>
                        <div className='text-m text-gray-500'>₹</div>
                    </CardHeader>

                    <CardContent>
                        <Overview data={orderStatusTotalRevenue} />
                    </CardContent>

                </Card>

                <Card className='col-span-2'>
                    <CardHeader className='flex items-center justify-between flex-row'>
                        <CardTitle className='text-sm font-medium'>Revenue by Category</CardTitle>
                        <div className='text-m text-gray-500'>₹</div>
                    </CardHeader>

                    <CardContent>
                        <Overview data={revenueByCategory} />
                    </CardContent>

                </Card>

                <Card className='col-span-2'>
                    <CardHeader className='flex items-center justify-between flex-row'>
                        <CardTitle className='text-sm font-medium'>Revenue by Order Status</CardTitle>
                        <div className='text-m text-gray-500'>₹</div>
                    </CardHeader>

                    <CardContent>
                        <Overview data={revenueByOrderStatus} />
                    </CardContent>

                </Card>

            </div>
        </div>
    </div>
}
 
export default DashboardOverview;