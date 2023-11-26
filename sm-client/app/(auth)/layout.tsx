'use client'
import {ContextProvider} from "@/app/store/stores";

interface AuthLayoutProps {
    children: React.ReactNode
}

export default function AuthLayout({children}: AuthLayoutProps) {
    return (
        <ContextProvider>
            <div className="min-h-screen">{children}</div>
        </ContextProvider>
    )
}
