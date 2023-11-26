'use client'
import {MainNav} from "@/components/main-nav";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import React from "react";
import {MarketingConfig} from "@/types";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {UserAvatar} from "@/components/user-avatar";
import {deleteCookie} from "cookies-next";
import {useRouter} from "next/navigation";

export const marketingConfig: MarketingConfig = {
    mainNav: [
        {
            title: "Trang chủ",
            href: "/dashboard",
        },
    ],
}

export default function Nav({user}: { user: User }) {
    const router = useRouter();

    function handleLogout() {
        deleteCookie("token")
        router.push("/")
    }

    return (
        <div className="flex h-20 items-center justify-between py-6">
            <MainNav items={marketingConfig.mainNav}/>

            {(user && <DropdownMenu>
                <DropdownMenuTrigger>
                    <UserAvatar/>

                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <div className="flex items-center justify-start gap-2 p-2">
                        <div className="flex flex-col space-y-1 leading-none">
                            <p className="font-medium">{user?.username}</p>
                            <p className="w-[200px] truncate text-sm text-muted-foreground">
                                {user?.username}
                            </p>
                        </div>
                    </div>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem asChild>
                        <Link href="/dashboard">Trang chủ</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/dashboard/report">Báo cảo</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/dashboard/orders">Đơn hàng</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onSelect={handleLogout}>
                        Đăng xuất
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>)}

            {!user &&
                <nav>
                    <Button>
                        <Link href="/login">Login</Link>
                    </Button>
                </nav>
            }
        </div>
    )
}