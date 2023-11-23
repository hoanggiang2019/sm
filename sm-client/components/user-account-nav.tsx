"use client"

import Link from "next/link"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {UserAvatar} from "@/components/user-avatar"
import {useRouter} from "next/navigation";


export function UserAccountNav() {

    const router = useRouter();

    function handleLogout() {
        router.push("/")
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar/>

            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">adminName</p>
                            <p className="w-[200px] truncate text-sm text-muted-foreground">
                                admin
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
                    <Link href="/dashboard/settings">Cài đặt</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem
                    className="cursor-pointer"
                    onSelect={handleLogout}>
                    Đăng xuất
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
