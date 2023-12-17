'use client'
import React, { useEffect, useState } from "react";
import Nav from "@/app/(marketing)/nav";
import {SiteFooter} from "@/components/site-footer";
import {getCurrentUser} from "@/lib/session";
import {getCookie} from "cookies-next";

interface HomeLayout {
    children: React.ReactNode
}

export default function MarketingLayout({children,}: HomeLayout) {

    return (
        <div className="flex min-h-screen flex-col space-y-6">
            {children}

            <SiteFooter/>
        </div>
    )
}
