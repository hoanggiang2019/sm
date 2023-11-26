'use client'
import {DashboardHeader} from "@/components/header"
import {DashboardShell} from "@/components/shell"
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import * as React from "react";
import {addOrder, getAllOrder, getCurrentUser, updateOrder} from "@/lib/session";
import {useEffect, useState} from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

const status = [
    {id: 0, value: "Đã đặt"},
    {id: 1, value: "Đã lấy hàng"},
    {id: 2, value: "Trả lại"},
    {id: 3, value: "Xác nhận trả lại"},
]

export default function SettingsPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [user, setUser] = useState<User>({})

    useEffect(() => {
        const getData = async () => {
            const data = await getCurrentUser()
            setUser(data)
        }
        getData();
    }, []);

    useEffect(() => {
        const getOrderData = async () => {
            const response = await getAllOrder();
            if (response) setOrders(response)
        }
        getOrderData().then(r => {
        })
    }, []);

    const updateStatus = async (orderID: number | undefined, value: string) => {
        const body = {id: orderID, status: parseInt(value)}
        const response = await updateOrder(body);
    }

    return (
        <DashboardShell>
            <DashboardHeader
                heading="Order"
                text="Manage order web settings."
            />
            <div className={"overflow-x-auto md:overflow-hidden"}>
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
                        {orders.map((e) => (
                            <TableRow key={e.id}>
                                <TableCell>{e.product?.name}</TableCell>
                                <TableCell>23423423ádsa423</TableCell>
                                <TableCell>{e.quantity}</TableCell>
                                <TableCell>{e.price}</TableCell>

                                <TableCell>
                                    <Select defaultValue={e.status.toString()}
                                            onValueChange={value => updateStatus(e.id, value)}>
                                        <SelectTrigger id={e.status.toString()}>
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
                </Table>
            </div>
        </DashboardShell>
    )
}
