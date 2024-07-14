"use client"

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import GalleryContentImage from "./gallery-content";
import GalleryTab from "./gallery-tab";

interface GalleryProps{
    images:{
        url:string;
    }[];
}

const Gallery = ({images} : GalleryProps) => {
    return (
    <Tabs defaultValue={images[0].url} className="w-full">
        {images.map((tab) => (
            <TabsContent key={tab.url} value={tab.url.toString()} className="flex justify-center items-center">{/* i have added the classname to this*/}
                <GalleryContentImage url={tab.url}/>
            </TabsContent>
        ))}

        <TabsList className="bg-transparent w-full flex justify-center space-x-2">{/* i have added flex justify-center space-x-2 */}
            {images.map(tab => (
                <TabsTrigger key={tab.url} value={tab.url.toString()} className="p-1"> {/* added classname to it */}
                    <GalleryTab url={tab.url}/>
                </TabsTrigger>
            ))}
        </TabsList>
    </Tabs>  );
}
 
export default Gallery;