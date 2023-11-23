'use client'
import {MainNav} from "@/components/main-nav";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import React, {useEffect, useState} from "react";
import {MarketingConfig} from "@/types";
import {getCookie} from "cookies-next";
import {UserAccountNav} from "@/components/user-account-nav";


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

    useEffect(() => {
        const token = getCookie("token");
        console.log("nav - " + token)
        if (token) {
            setLogin(true)
        }
    }, []);

    return (
        <header className="container z-40 bg-background">
            <div className="flex h-20 items-center justify-between py-6">
                <MainNav items={marketingConfig.mainNav}/>
                {(!login && <nav><Link href="/login" className={cn(buttonVariants({
                    variant: "secondary",
                    size: "sm"
                }), "px-4")}>Login</Link></nav>)

                }: {
                <UserAccountNav/>
            }

            </div>
        </header>
    )
}