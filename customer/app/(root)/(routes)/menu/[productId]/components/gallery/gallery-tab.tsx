"use client"

import Image from "next/image";

interface GalleryTabProps{
    url:string
}
const GalleryTab = ({url} :GalleryTabProps) => {
    return (
    <div className="w-16 h-16 aspect-square rounded-md relative">{/*changed w-24 h-24 to w-16 h-16*/}
        <Image src={url} alt={url} className="w-full h-full object-contain rounded-md" layout="fill">{/*added rounded-md and layout=fill*/}
        </Image>
    </div>);
}
 
export default GalleryTab;