'use client'
import {MainNav} from "@/components/main-nav"
import {DashboardNav} from "@/components/nav"
import {SiteFooter} from "@/components/site-footer"
import {UserAccountNav} from "@/components/user-account-nav"
import {useEffect} from "react";
import {DashboardConfig} from "@/types";
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
            title: "Posts",
            href: "/dashboard",
            icon: "post",
        },
        {
            title: "Billing",
            href: "/dashboard/billing",
            icon: "billing",
        },
        {
            title: "Settings",
            href: "/dashboard/settings",
            icon: "settings",
        },
    ],
}

export default async function DashboardLayout({children,}: DashboardLayoutProps) {
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token == null) {
            return;
        }
        console.log(token)
        const fetchCategory = async () => {
            const response = await getCurrentUser(token);
            console.log(response)
        };
    }, []);

    return (
        <div className="flex min-h-screen flex-col space-y-6">
            <header className="sticky top-0 z-40 border-b bg-background">

                <div className="container flex h-16 items-center justify-between py-4">
                    <MainNav items={dashboardConfig.mainNav}/>
                    <UserAccountNav/>
                </div>

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
