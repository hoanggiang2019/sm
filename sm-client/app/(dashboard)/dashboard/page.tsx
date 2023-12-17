'use client'

import * as React from "react";
import {DashboardHeader} from "@/components/header"
import {DashboardShell} from "@/components/shell"
import {useEffect, useState} from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {deleteProduct, getAllProduct, getCategory, getCurrentUser} from "@/lib/session";
import {OrderDialog} from "@/app/(dashboard)/dashboard/(action)/OrderDialog";
import {EditDialog} from "@/app/(dashboard)/dashboard/(action)/EditDialog";
import {AddDialog} from "@/app/(dashboard)/dashboard/(action)/AddDialog";
import Nav from "@/app/(marketing)/nav";
import {DashboardNav} from "@/components/nav";
import {DashboardConfig} from "@/types";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {LucideClipboardX} from "lucide-react";
import {Button} from "@/components/ui/button";
import {toast} from "@/components/ui/use-toast";
import {deleteCookie, getCookie} from "cookies-next";
import {useRouter} from "next/navigation";

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
    const [reload, setReload] = useState(false)
    const [typeSelect, setTypeSelect] = useState<string>('0')
    const [products, setProducts] = useState<Product[]>([])
    const [productTypes, setProductType] = useState<ProductType[]>([])
    const [user, setUser] = useState<User>({});


    const router = useRouter();

    useEffect(() => {
        if (!getCookie('token')) {
            router.push("/login")
        }
        const fetchUser = async () => {
            if (!user.id) {
                const resp = await getCurrentUser();
                if (resp) {
                    setUser(resp)
                } else {
                    deleteCookie('token')
                    router.push("/login")
                }
            }
        }
        fetchUser();

        const fetchProductType = async () => {
            if (productTypes.length == 0) {
                const resp = await getCategory();
                if (resp) {
                    setProductType(resp)
                }
            }
        }
        fetchProductType();

        const fetchProduct = async () => {
            if (typeSelect) {
                const resp = await getAllProduct(typeSelect);
                if (resp?.status == 200) {
                    setProducts(resp.data)
                } else {
                    setProducts([])
                }
            }
        }
        fetchProduct();

    }, [typeSelect]);

    useEffect(() => {
        const fetchProduct = async () => {
            if (reload) {
                const resp = await getAllProduct(typeSelect);
                if (resp?.status == 200) {
                    setProducts(resp.data)
                } else {
                    setProducts([])
                }
            }

            setReload(false)
        }
        fetchProduct();

    }, [reload]);


    const deleteProd = async  (id : any) => {
        const resp = await deleteProduct(id);
        if (resp?.status == 200) {
            setReload(true)
            return toast({
                title: "Xoá sản phẩm thành công"
            })
        } else {
            return toast({
                title: "Lỗi không thể xoá sản phẩm",
                variant: "destructive"
            })
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
                        <div>
                            <DashboardHeader heading="Sản phẩm" text="">
                                {(user.admin && <AddDialog productTypes={productTypes} setReload={setReload}/>)}
                            </DashboardHeader>
                        </div>
                        <div className="flex items-center py-4 w-1/2 sm:w-1/4 ml-1">
                            <Select onValueChange={value => setTypeSelect(value)}>
                                <SelectTrigger >
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

                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Tên sp</TableHead>
                                            <TableHead>Số lượng</TableHead>
                                            <TableHead>Loại mặt hàng</TableHead>
                                            {(user.shipper && <TableHead>Đặt hàng</TableHead>)}
                                            {(user.admin && <TableHead>Sửa</TableHead>)}
                                            {(user.admin && <TableHead>Xoá</TableHead>)}

                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {products?.map((e: any) => (
                                            <TableRow key={e.id}>
                                                <TableCell>{e.name}</TableCell>
                                                <TableCell>{e.quantity}</TableCell>
                                                <TableCell>{e.categoryDto?.name}</TableCell>
                                                {(user.shipper && <TableCell>
                                                    <OrderDialog product={e} user={user} setReload={setReload}/>
                                                </TableCell>)}

                                                {(user.admin && <TableCell><EditDialog product={e} setReload={setReload}/></TableCell>)}
                                                {(user.admin && <TableCell><Button variant="outline" onClick={() => deleteProd(e.id)}><LucideClipboardX/></Button></TableCell>)}
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
