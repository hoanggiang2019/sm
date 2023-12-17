'use client'
import {DashboardHeader} from "@/components/header"
import {DashboardShell} from "@/components/shell"
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import * as React from "react";
import {confirmOrder, deleteOrder, getAllOrder, getCurrentUser, updateOrder} from "@/lib/session";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {useEffect, useState} from "react";
import {DashboardConfig} from "@/types";
import Nav from "@/app/(marketing)/nav";
import {DashboardNav} from "@/components/nav";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {LucideClipboardX, MoreHorizontal} from "lucide-react";
import {toast} from "@/components/ui/use-toast";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {Label} from "@/components/ui/label";
import {deleteCookie} from "cookies-next";
import {redirect} from "next/navigation";
import {Badge} from "@/components/ui/badge";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

const statuses = [
    {id: 0, value: "Đã đặt"},
    {id: 1, value: "Đã lấy hàng"},
    {id: 2, value: "Trả lại"},
    {id: 3, value: "Xác nhận trả lại"},
]
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
            title: "Sản phẩm",
            href: "/dashboard",
            icon: "post",
        },
        {
            title: "Báo cáo",
            href: "/dashboard/report",
            icon: "billing",
        },
        {
            title: "Đơn hàng",
            href: "/dashboard/orders",
            icon: "billing",
        },
    ],
}

export default function SettingsPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [user, setUser] = useState<User>({});
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10).replace(/-/g, ''))
    const [status, setStatus] = useState('')

    const [numReturn, setNumReturn] = useState<number>()
    const [order, setOrder] = useState<Order>();
    useEffect(() => {
        const fetchUser = async () => {
            if (!user.id) {
                const resp = await getCurrentUser();
                if (resp) {
                    setUser(resp)
                } else {
                    deleteCookie('token')
                    redirect("/login")
                }
            }
        }
        fetchUser().then(r => {
        });
        fetchOrders().then(r => {
        });
    }, [user, status, date]);

    const fetchOrders = async () => {
        if (user.id) {
            const body = {
                status: status,
                shipperId: !user.admin ? user.id : undefined,
                date: date.replace(/-/g, '')
            }
            const resp = await getAllOrder(body);
            if (resp) {
                setOrders(resp)
            }
        }
    }

    const confirm = async (id: any) => {
        const resp = await confirmOrder(id);

        if (resp?.status == 200) {
            await fetchOrders();
            return toast({
                title: "Xác nhận thành công"
            })
        } else {
            return toast({
                title: "Lỗi xác nhận đơn hàng",
                variant: "destructive"
            })
        }
    }

    const deleteOrd = async (id: any) => {
        const resp = await deleteOrder(id);

        if (resp?.status == 200) {
            await fetchOrders();
            return toast({
                title: "Xoá đơn hàng thành công"
            })
        } else {
            return toast({
                title: "Lỗi không thể xoá đơn hàng",
                variant: "destructive"
            })
        }
    }

    const returnOrder = async () => {
        if (!numReturn) {
            return toast({
                title: "Chưa nhập số lượng trả lại",
                variant: "destructive"
            })
        }
        const body = {id: order?.id, status: 2, numReturn: numReturn}
        const response = await updateOrder(body);
        if (response?.status == 200) {
            await fetchOrders();
            setOrder(undefined)
            return toast({title: "Cập nhật đơn hàng thành công"})
        } else {
            return toast({title: "Lỗi cập nhật đơn hàng", variant: "destructive"})
        }
    }


    return (
        <>
            <header className="container z-40 bg-background">
                <Nav user={user}/>
            </header>
            <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">

                <aside className="hidden w-[200px] flex-col md:flex">
                    <DashboardNav items={dashboardConfig.sidebarNav}/>
                </aside>
                <main className="flex w-full flex-1 flex-col overflow-hidden">
                    <DashboardShell>
                        <DashboardHeader heading="Đơn hàng"/>
                        <div className="flex items-center py-4 w-1/1 sm:w-1/2 ml-1 gap-4">
                            <Input type={"date"} defaultValue={new Date().toISOString().slice(0, 10)}
                                   onChange={e => setDate(e.target.value)}/>
                            <Select onValueChange={value => setStatus(value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="chọn trạng thái"/>
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    {statuses.map((status) => (
                                        <SelectItem key={status.id}
                                                    value={status.id.toString()}>{status.value}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className={"overflow-x-auto md:overflow-hidden"}>
                            {
                                <Table>

                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Tên sản phẩm</TableHead>
                                            <TableHead>Shipper</TableHead>
                                            <TableHead>Số lượng</TableHead>
                                            <TableHead>Miễn phí ship</TableHead>
                                            <TableHead>Trả lại</TableHead>
                                            <TableHead>Giá trị đơn</TableHead>
                                            <TableHead>Trạng thái</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {orders.map((e: any) => (
                                            <TableRow key={e.id}>
                                                <TableCell>{e.product?.name}</TableCell>
                                                <TableCell>{e.shipper?.firstName} {e.shipper?.lastName}</TableCell>
                                                <TableCell>{e.quantity}</TableCell>
                                                <TableCell>{e.freeShip ? e.freeShip : 0}</TableCell>
                                                <TableCell>{e.numReturn ? e.numReturn : 0}</TableCell>
                                                <TableCell>{e.cash}</TableCell>
                                                <TableCell>
                                                    <Badge variant={"default"}>
                                                        {statuses.find((s) => s.id == e.status)?.value}
                                                    </Badge>
                                                </TableCell>

                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" className="ml-auto">
                                                                <MoreHorizontal className="ml-2 h-4 w-4"/>
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem onClick={event => deleteOrd(e.id)}>Xoá</DropdownMenuItem>
                                                            {(!user.admin &&
                                                                <DropdownMenuItem onClick={event => setOrder(e)}>Trả lại</DropdownMenuItem>)}
                                                            {(user.admin &&
                                                                <DropdownMenuItem onClick={event => confirm(e.id)}>Xác nhận</DropdownMenuItem>)}
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TableCell colSpan={2}>Tổng</TableCell>
                                            <TableCell>
                                                {orders.reduce((totalQuantity, order) => totalQuantity + order.quantity, 0)}
                                            </TableCell>
                                            <TableCell>
                                                {orders.reduce((totalValue, order) => totalValue + order.freeShip, 0)}
                                            </TableCell>
                                            <TableCell>
                                                {orders.reduce((totalValue, order) => totalValue + order.numReturn, 0)}
                                            </TableCell>
                                            <TableCell>
                                                {orders.reduce((totalValue, order) => totalValue + order.cash, 0)}
                                            </TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            }
                        </div>
                    </DashboardShell>
                </main>
            </div>
            <AlertDialog open={order !== undefined}>
                <form className="space-y-8">
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Xác nhận trả lại</AlertDialogTitle>
                            <div className="grid w-full items-center gap-4 pt-3.5">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Nhập số lượng trả lại</Label>
                                    <Input id="quantity" type={"number"}
                                           onChange={event => setNumReturn(parseInt(event.target.value))}/>
                                </div>
                            </div>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={event => setOrder(undefined)}>Huỷ</AlertDialogCancel>
                            <AlertDialogAction onClick={event => returnOrder()}>Xác nhận</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </form>
            </AlertDialog>
        </>

    )
}


