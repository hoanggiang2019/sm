'use client'
import {DashboardHeader} from "@/components/header"
import {DashboardShell} from "@/components/shell"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import * as React from "react";
import {getAllOrder, getCurrentUser, updateOrder} from "@/lib/session";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import useSWR from "swr";
import {useEffect, useState} from "react";
import {DashboardConfig} from "@/types";
import Nav from "@/app/(marketing)/nav";
import {DashboardNav} from "@/components/nav";
import {Input} from "@/components/ui/input";

const status = [
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
    const [orders, setOrder] = useState<Order[]>([]);
    const {data: user, error: typeUser} = useSWR('getUser', getCurrentUser, {refreshInterval: 0});
    const [date, setDate] = React.useState(new Date().toISOString().slice(0, 10).replace(/-/g, ''))
    const [s, setStatus] = React.useState('')

    useEffect(() => {

        const fetchOrders = async () => {
            const ss = {status: s, date: date.replace(/-/g, '')}
            const resp = await getAllOrder(ss);
            if (resp) {
                setOrder(resp)
            }
        }
        fetchOrders();

    }, [s, date]);

    const updateStatus = async (orderID: number | undefined, value: string) => {
        const body = {id: orderID, status: parseInt(value)}
        const response = await updateOrder(body);
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
                        <div className="flex items-center py-4 w-1/2 ml-1 gap-4">
                            <Input type={"date"} defaultValue={new Date().toISOString().slice(0, 10)}
                                   onChange={e => setDate(e.target.value)}/>
                            <Select onValueChange={value => setStatus(value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="chọn trạng thái"/>
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    {status.map((status) => (
                                        <SelectItem key={status.id}
                                                    value={status.id.toString()}>{status.value}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className={"overflow-x-auto md:overflow-hidden"}>
                            {
                                <Table>
                                    <TableCaption>A list of your recent invoices.</TableCaption>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Tên sản phẩm</TableHead>
                                            <TableHead>Shipper</TableHead>
                                            <TableHead>Số lượng</TableHead>
                                            <TableHead>Giá trị đơn</TableHead>
                                            <TableHead>Trạng thái</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {orders?.map((e: any) => (
                                            <TableRow key={e.id}>
                                                <TableCell>{e.product?.name}</TableCell>
                                                <TableCell>{e.shipper?.firstName} {e.shipper?.lastName}</TableCell>
                                                <TableCell>{e.quantity}</TableCell>
                                                <TableCell>{e.price * e.quantity}</TableCell>

                                                <TableCell>
                                                    <Select defaultValue={e.status?.toString()}
                                                            onValueChange={value => updateStatus(e.id, value)}>
                                                        <SelectTrigger id={e.status?.toString()}>
                                                            <SelectValue/>
                                                        </SelectTrigger>
                                                        <SelectContent position="popper">
                                                            {status.map((status) => (
                                                                <SelectItem key={status.id}
                                                                            value={status.id.toString()}>{status.value}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>

                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TableCell colSpan={2}>Tổng</TableCell>
                                            <TableCell className="text-right">
                                                {orders.reduce((totalQuantity, order) => totalQuantity + order.quantity, 0)}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {orders.reduce((totalValue, order) => totalValue + order.price * order.quantity, 0)}
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
        </>

    )
}
