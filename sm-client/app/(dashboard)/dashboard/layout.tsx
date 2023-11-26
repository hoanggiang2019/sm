'use client'

import React, {useEffect, useState} from "react";
import {DashboardNav} from "@/components/nav"
import {SiteFooter} from "@/components/site-footer"
import {DashboardConfig} from "@/types";
import Nav from "@/app/(marketing)/nav";
import {getCurrentUser} from "@/lib/session";

interface DashboardLayoutProps {
    children?: React.ReactNode
}

const dashboardConfig: DashboardConfig = {
    mainNav: [
        {
            title: "Documentation",
            href: "/docs",
        },
        {
            title: "Support",
            href: "/support",
            disabled: true,
        },
    ],
    sidebarNav: [
        {
            title: "Items",
            href: "/dashboard",
            icon: "post",
        },
        {
            title: "Billing",
            href: "/dashboard/billing",
            icon: "billing",
        },
        {
            title: "Orders",
            href: "/dashboard/orders",
            icon: "pizza",
        },
    ],
}

export default function DashboardLayout({children,}: DashboardLayoutProps) {

    const [user, setUser] = useState<User>({})

    useEffect(() => {
        const getData = async () => {
            const data = await getCurrentUser()
            setUser(data)
        }
        getData();
    }, []);

    return (
        <div className="flex min-h-screen flex-col space-y-6">
            <header className="container z-40 bg-background">
                <Nav user={user}/>
            </header>
            <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
                <aside className="hidden w-[200px] flex-col md:flex">
                    <DashboardNav items={dashboardConfig.sidebarNav}/>
                </aside>
                <main className="flex w-full flex-1 flex-col overflow-hidden">
                    {children}
                </main>
            </div>
            <SiteFooter/>
        </div>
    )

}
