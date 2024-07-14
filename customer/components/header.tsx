"use client"

import { cn } from "@/lib/utils"
import Container from "@/components/container"
import Link from "next/link"
import { UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import MainNav from "./main-nav"
import { useState,useEffect } from "react"
import CartActionButton from "./cart-action"
// import { auth, getAuth } from "@clerk/nextjs/server"

interface HeaderProps {
    userId : string | null

}

const Header = ({userId }: HeaderProps) => {
    
    {/*this is the scrolled function */}
    
    const [scrolled , setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 0
            setScrolled(isScrolled)
        }

        // const userId = getAuth();

        window.addEventListener("scroll" , handleScroll)

        return() => {window.addEventListener("scroll" , handleScroll)}
    },[])
    return(
    <header 
        className={cn("w-full z-50 transition" , 
        scrolled? "fixed top-0 left-0 bg-white shadow-lg" : "bg-transparent")}>
        <Container>
            
            {/* this is the header quick step icon and has link of home page*/ }
            
            <div className="relative px-4 sm:px-6 lg:px-12 flex h-16 items-center">
                <Link href="/" className="uppercase flex gap-x-2 font-bold text-neutral-700 text:lg md:text-xl"> Quick Step</Link>

        {/*main nav bar */}
        {/* has only the sign in and sign out buttons */}
                <MainNav scrolled={scrolled}/>
                {userId ? 
                (<div className="ml-4 flex items-center space-x-4">
                    <UserButton afterSignOutUrl="/" />
                 </div>):
                (
                    <div className="ml-4 flex items-center space-x-4">                    
                        <Link href={"/sign-in"}><Button variant="outline">Login</Button></Link>
                        <Link href={"/sign-up"}><Button className="bg-green-400 text-black hover:bg-green-500">Sign Up</Button></Link>
                    </div>
                )}

                {userId && <CartActionButton/>}

            </div>

        </Container>
    </header>)

}

export default Header