import { db } from "@/lib/firebase";
import { Category } from "@/types-db";
import { auth } from "@clerk/nextjs/server";
import { addDoc, collection, doc, getDoc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";


export const POST = async(req: Request, {params}: {params: {storeId: string, }} ) =>{
    try {
        const {userId} = auth();
        const body = await req.json();
        
        if(!userId){
            return new NextResponse("Un-Authorized", {status: 400})
        }
        
        const {name, billboardLabel, billboardId} = body;
        
        if(!name){
            return new NextResponse("Category name is missing", {status: 400})
            
        }
        
        if(!billboardId){
            return new NextResponse("Billboard is missing", {status: 400})
            
        }

        if(!params.storeId){
            return new NextResponse("Store Id is missing", {status: 400})
        }

        const store = await getDoc(doc(db, 'stores', params.storeId));

        if(store.exists()){
            let storeData = store.data();
            if(storeData?.userId !== userId){
                return new NextResponse("Un-Authorized Access", {status: 500});
            }

        }

        const categoryData = {
            name,
            billboardId,
            billboardLabel,
            createdAt: serverTimestamp(),
        };

        const catergoryRef = await addDoc(
            collection(db, 'stores', params.storeId, 'categories'),
            categoryData 
        );

        const id = catergoryRef.id;
        
        
        await updateDoc(doc(db, 'stores', params.storeId, 'categories', id),{
            ...categoryData, 
            id,
            updatedAt: serverTimestamp(),
        })
        
        return NextResponse.json({id, ...categoryData});


    } catch (error) {
        console.log(`CATEGORIES_POST: ${error}`);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}


export const GET = async(req: Request, {params}: {params: {storeId: string, }} ) =>{
    try {
        

        if(!params.storeId){
            return new NextResponse("Store Id is missing", {status: 400})
        }


        const categoriesData = (
            await getDocs(
                collection(doc(db, 'stores', params.storeId), 'categories')
            )
        ).docs.map(doc => doc.data()) as Category[];

        return NextResponse.json(categoriesData);



    } catch (error) {
        console.log(`CATEGORIES_GET: ${error}`);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}