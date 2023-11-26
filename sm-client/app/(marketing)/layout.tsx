'use client'
import React, {useEffect, useState} from "react";
import Nav from "@/app/(marketing)/nav";
import {SiteFooter} from "@/components/site-footer";
import {ContextProvider} from "@/app/store/stores";
import {getCurrentUser} from "@/lib/session";

interface HomeLayout {
    children: React.ReactNode
}

export default function MarketingLayout({children,}: HomeLayout) {

    const [user, setUser] = useState<User>({})

    useEffect(() => {
        const getData = async () => {
            const data = await getCurrentUser()
            setUser(data)
        }
        getData();
    }, []);

    return (
        <ContextProvider>
        <div className="flex min-h-screen flex-col">
            <header className="container z-40 bg-background">
                <Nav user={user}/>
            </header>
            <main className="flex-1">{children}</main>
            <SiteFooter/>
        </div>
        </ContextProvider>
    )
}
