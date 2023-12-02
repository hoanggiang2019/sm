'use client'
import React, {useEffect, useState} from "react";
import Nav from "@/app/(marketing)/nav";
import {SiteFooter} from "@/components/site-footer";
import {getCurrentUser} from "@/lib/session";
import {getCookie} from "cookies-next";
import useSWR from "swr";

interface HomeLayout {
    children: React.ReactNode
}

export default function MarketingLayout({children,}: HomeLayout) {
    const [user, setUser] = useState<User>()

    useEffect(() => {
        const fetchUser = async () => {
            const token = getCookie('token')
            if (token) {
                const data = await getCurrentUser();

                if (data) setUser(data)
            }

        }

        fetchUser()
    }, []);
    return (
        <div className="flex min-h-screen flex-col">
            <header className="container z-40 bg-background">
                <Nav user={user}/>
            </header>
            <main className="flex-1">{children}</main>
            <SiteFooter/>
        </div>
    )
}
