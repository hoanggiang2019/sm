'use client'
import {MainNav} from "@/components/main-nav";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import React, {useEffect, useState} from "react";
import {MarketingConfig} from "@/types";


export const marketingConfig: MarketingConfig = {
    mainNav: [
        {
            title: "Trang chủ",
            href: "/dashboard",
        },
    ],
}

export default function Nav() {

    const [login, setLogin] = useState(false);

    function handleLogout() {
        console.log("logout")
    }

    useEffect(() => {
        console.log("1231")
    }, []);

    return (
        <header className="container z-40 bg-background">
            <div className="flex h-20 items-center justify-between py-6">
                <MainNav items={marketingConfig.mainNav}/>
                <nav><Link href="/login"
                           className={cn(buttonVariants({variant: "secondary", size: "sm"}), "px-4")}>Login</Link></nav>

            </div>
        </header>
    )
}