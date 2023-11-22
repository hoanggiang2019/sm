import {SiteFooter} from "@/components/site-footer"
import React from "react";
import Nav from "@/app/(marketing)/nav";

interface MarketingLayoutProps {
    children: React.ReactNode
}

export default function MarketingLayout({children,}: MarketingLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col">
            <Nav/>
            <main className="flex-1">{children}</main>
            <SiteFooter/>
        </div>
    )
}
