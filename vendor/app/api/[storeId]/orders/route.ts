import { db } from "@/lib/firebase";
import { Order } from "@/types-db";
import { collection, doc, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    if (!params.storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    const ordersData = (
      await getDocs(collection(doc(db, "stores", params.storeId), "orders"))
    ).docs.map((doc) => doc.data()) as Order[];

    // Return the added document with its ID
    return NextResponse.json(ordersData);
  } catch (error) {
    console.log(`[ORDERS_GET] : ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
