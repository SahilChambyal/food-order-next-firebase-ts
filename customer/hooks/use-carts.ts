import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Products } from "@/types-db";
import {toast} from "react-hot-toast";

interface CartStore{
    items:Products[];

    addItem:(data:Products) => void;
    removeItem: (id:string) => void;
    removeAll : () => void;
    updateItemQuantity: (id:string , quantity:number) => void;
}

const useCart = create(persist<CartStore>((set,get) => ({
    items:[],
    addItem:(data:Products) => {
        const currentItems = get().items;
        const existingItems = currentItems.find((item) => item.id === data.id);
        
        if (existingItems) {
            return toast("Item Already In The Cart")
        }

        set({items : [...get().items,data]})
        toast.success("Item Added To Cart")
    },

    removeItem : (id:string) => {
        set({items : [...get().items.filter(item => item.id !== id)]})
        toast.success("Item Removed From The Cart")
    },
    
    removeAll : () => set({ items : []}),
    updateItemQuantity : (id:string , qty:number) => {
        const updatedItems = get().items.map((item) => item.id === id ? {...item,qty} : item)
        set({items:updatedItems});
    },
}),
    {name:"cart-storage" , storage: createJSONStorage(()=> localStorage)}
));

export default useCart