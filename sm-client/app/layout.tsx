import {Inter} from 'next/font/google'
import './globals.css'
import {Analytics} from "@vercel/analytics/react"
import {Toaster} from "@/components/ui/toaster"
import React from "react";
import {Metadata} from "next";
import {ThemeProvider} from "@/components/theme-provider";

const inter = Inter({subsets: ['latin'], variable: "--font-sans",})

export const metadata: Metadata = {
    title: 'VietPhuongShop',
}

export default function RootLayout({children,}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Analytics/>
            <Toaster/>
            <div
                className="fixed bottom-1 left-1 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 p-3 font-mono text-xs text-white">
                <div className="block sm:hidden">xs</div>
                <div className="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
                    sm
                </div>
                <div className="hidden md:block lg:hidden xl:hidden 2xl:hidden">md</div>
                <div className="hidden lg:block xl:hidden 2xl:hidden">lg</div>
                <div className="hidden xl:block 2xl:hidden">xl</div>
                <div className="hidden 2xl:block">2xl</div>
            </div>
        </ThemeProvider>
        </body>
        </html>
    )
}
