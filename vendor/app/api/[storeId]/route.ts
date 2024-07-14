import { db, storage } from "@/lib/firebase";
import { Store } from "@/types-db";
import { auth } from "@clerk/nextjs/server";
import {  collection, deleteDoc, doc, getDoc, getDocs,  updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request, {params}: {params: {storeId: string}}) => {
    try {
        
        console.log('test1');
        const {userId} = auth();
        console.log('test2');
        const body = await req.json();
        console.log('test3');
        
        if(!userId){
            return new NextResponse("Un-Authorized", {status: 400})
        }

        if(!params.storeId){
            return new NextResponse("Store Id is required", {status: 400})
        }
        
        const {name} = body;

        if(!name){
            return new NextResponse("Store name is missing", {status: 400})
        
        }

        const docRef = doc(db, 'stores', params.storeId);
        await updateDoc(docRef, {name});
        const store = (await getDoc(docRef)).data() as Store;

        return NextResponse.json(store);


    } catch (error) {
        console.log(`STORES_PATCH: ${error}`);
        return new NextResponse("Internal Server Error", {status: 500});
    }
};


export const DELETE = async (req: Request, {params}: {params: {storeId: string}}) => {
    try {
        const {userId} = auth();

        if(!userId){
            return new NextResponse("Un-Authorized", {status: 400})
        }

        if(!params.storeId){
            return new NextResponse("Store Id is required", {status: 400})
        }
        const docRef = doc(db, 'stores', params.storeId);

        // TODO : Delete all the sub-collections and along with those data file

        // Billboards and its images
        const billboardsQuerySnapshots = await getDocs(
            collection(db,`stores/${params.storeId}/billboards`)
        )

        billboardsQuerySnapshots.forEach(async(billboardDoc) =>{
            await deleteDoc(billboardDoc.ref)

            // remove the images from storage
            const imageUrl = billboardDoc.data().imageUrl
            if(imageUrl){
                const imageRef = ref(storage, imageUrl)
                await deleteObject(imageRef)
            }
        })

        // categories
        const categoriesQuerySnapshot = await getDocs(
            collection(db, `stores/${params.storeId}/categories`)
        )

        categoriesQuerySnapshot.forEach(async(categoryDoc) =>{
            await deleteDoc(categoryDoc.ref)
        });
        
        // sizes
        const sizesQuerySnapshot = await getDocs(
            collection(db, `stores/${params.storeId}/sizes`)
        )

        sizesQuerySnapshot.forEach(async(sizeDoc) =>{
            await deleteDoc(sizeDoc.ref)
        });
        
        // kitchens
        const kitchensQuerySnapshot = await getDocs(
            collection(db, `stores/${params.storeId}/kitchens`)
        )

        kitchensQuerySnapshot.forEach(async(kitchenDoc) =>{
            await deleteDoc(kitchenDoc.ref)
        });
        
        // cuisines
        const cuisinesQuerySnapshot = await getDocs(
            collection(db, `stores/${params.storeId}/cuisines`)
        )

        cuisinesQuerySnapshot.forEach(async(cuisineDoc) =>{
            await deleteDoc(cuisineDoc.ref)
        });

        // products and its images
        const productsQuerySnapshots = await getDocs(
            collection(db,`stores/${params.storeId}/products`)
        );

        productsQuerySnapshots.forEach(async (productDoc) =>{
            await deleteDoc(productDoc.ref);

            // remove the images from storage
            const imagesArray  = productDoc.data().images;
            if(imagesArray && Array.isArray(imagesArray)){
                await Promise.all(
                    imagesArray.map(async (image) => {
                        const imageRef = ref(storage, image.url);
                        await deleteObject(imageRef);
                    })
                );
            }    
        });

        // orders and its orderitems and its images

        const ordersQuerySnapshots = await getDocs(
            collection(db,`stores/${params.storeId}/orders`)
        ); 

        ordersQuerySnapshots.forEach(async(orderDoc) =>{
            const ordersItemArray = orderDoc.data().orderItems;
            if(ordersItemArray && Array.isArray(ordersItemArray)){
                await Promise.all(
                    ordersItemArray.map(async(orderItem) =>{
                        const itemImagesArray = orderItem.images;
                        if(itemImagesArray && Array.isArray(itemImagesArray)){
                            await Promise.all(
                                itemImagesArray.map(async (image) => {
                                    const imageRef = ref(storage, image.url);
                                    await deleteObject(imageRef);
                                })
                            )
                        }
                    })
                )
            }
        })

        // finally delete the store

        await deleteDoc(docRef);

        return NextResponse.json({msg: "Store and all of its sub collections deleted"});


    } catch (error) {
        console.log(`STORES_PATCH: ${error}`);
        return new NextResponse("Internal Server Error", {status: 500});
    }
};