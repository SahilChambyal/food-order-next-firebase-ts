"use client"

import Image from "next/image";

interface GalleryContentImageProps{
    url:string
}
const GalleryContentImage = ({url} :GalleryContentImageProps) => {
    return (
    <div className="w-full max-w-lg h-auto aspect-square sm:rounded-lg overflow-hidden">{/*changed h-full to h-auto and added max-w-lg*/}
        <Image src={url} alt={url} className="w-full h-full object-contain"
        width={500}
        height={500} >{/*added width and height to it */}
        </Image>
    </div>);
}
 
export default GalleryContentImage;