'use client'

import * as React from "react";
import {DashboardHeader} from "@/components/header"
import {DashboardShell} from "@/components/shell"
import {useEffect, useState} from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {getAllProduct, getCategory, getCurrentUser} from "@/lib/session";
import {OrderDialog} from "@/app/(dashboard)/dashboard/(action)/OrderDialog";
import {EditDialog} from "@/app/(dashboard)/dashboard/(action)/EditDialog";
import {AddDialog} from "@/app/(dashboard)/dashboard/(action)/AddDialog";
import useSWR from "swr";
import Nav from "@/app/(marketing)/nav";
import {DashboardNav} from "@/components/nav";
import {DashboardConfig} from "@/types";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

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

export default function DashboardPage() {
    const [isAdmin, setAdmin] = useState(false)
    const [reload, setReload] = useState(true)
    const [typeSelect, setTypeSelect] = useState<string>('')
    const [products, setProducts] = useState<Product[]>([])
    const [productTypes, setProductType] = useState<ProductType[]>([])
    const {data: user, error: userError} = useSWR('getUser', getCurrentUser, {refreshInterval: 0});

    useEffect(() => {
        const fetchProductType = async () => {
            const resp = await getCategory();
            if (resp) {
                setProductType(resp)
            }
        }
        fetchProductType();
        if (user) {
            const roles = user.roles;
            const check = roles.some((obj: { name: string; }) => obj.name === "ROLE_ADMIN");
            setAdmin(check);
        }

    }, [user]);

    useEffect(() => {
        const fetchProduct = async () => {
            if (typeSelect === '0')
                setTypeSelect('')
            const resp = await getAllProduct(typeSelect);
            if (resp?.status == 200) {
                setProducts(resp.data)
            } else {
                setProducts([])
            }

            setReload(false)
        }
        fetchProduct();

    }, [typeSelect, reload]);


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
                        <div>
                            <DashboardHeader heading="Sản phẩm" text="">
                                {(isAdmin && <AddDialog productTypes={productTypes} setReload={setReload}/>)}
                            </DashboardHeader>
                        </div>
                        <div className="flex items-center py-4 w-1/3 ml-1">
                            <Select onValueChange={value => setTypeSelect(value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder={"Tìm theo loại sản phẩm"}/>
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    {productTypes.map((p) => (
                                        // @ts-ignore
                                        <SelectItem key={p.id} value={p.id.toString()}>{p.name}</SelectItem>
                                    ))}
                                    <SelectItem value={'0'}>Hiển thị toàn bộ</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className={"overflow-x-auto md:overflow-hidden"}>
                            {
                                (products && <Table>
                                    <TableCaption>A list of your recent invoices.</TableCaption>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Tên sp</TableHead>
                                            <TableHead>Số lượng</TableHead>
                                            <TableHead>Loại mặt hàng</TableHead>
                                            <TableHead>Đặt hàng</TableHead>
                                            {(isAdmin && <TableHead>Sửa thông tin</TableHead>)}

                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {products?.map((e: any) => (
                                            <TableRow key={e.id}>
                                                <TableCell>{e.name}</TableCell>
                                                <TableCell>{e.quantity}</TableCell>
                                                <TableCell>{e.categoryDto?.name}</TableCell>
                                                <TableCell>
                                                    <OrderDialog product={e} user={user} setReload={setReload}/>
                                                </TableCell>
                                                {(isAdmin && <TableCell><EditDialog product={e} setReload={setReload}/></TableCell>)}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>)
                            }
                        </div>
                    </DashboardShell>
                </main>
            </div>
        </>
    )
}
