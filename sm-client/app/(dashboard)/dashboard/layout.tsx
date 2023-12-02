'use client'

import React, {useEffect, useState} from "react";
import {DashboardNav} from "@/components/nav"
import {SiteFooter} from "@/components/site-footer"
import {DashboardConfig} from "@/types";
import Nav from "@/app/(marketing)/nav";
import {getCurrentUser} from "@/lib/session";
import useSWR from "swr";

interface DashboardLayoutProps {
    children?: React.ReactNode
}

export default function DashboardLayout({children,}: DashboardLayoutProps) {

    return (
        <div className="flex min-h-screen flex-col space-y-6">
            {children}

            <SiteFooter/>
        </div>
    )

}
