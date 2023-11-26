'use client'

import * as React from "react";
import {DashboardHeader} from "@/components/header"
import {DashboardShell} from "@/components/shell"
import {useEffect, useState} from "react";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {getAllProduct, getCategory, getCurrentUser} from "@/lib/session";
import {OrderDialog} from "@/app/(dashboard)/dashboard/(action)/OrderDialog";
import {EditDialog} from "@/app/(dashboard)/dashboard/(action)/EditDialog";
import {AddDialog} from "@/app/(dashboard)/dashboard/(action)/AddDialog";

export default function DashboardPage() {
    const [reload, setLoad] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [productTypes, setProductTypes] = useState<ProductType[]>([]);

    const [user, setUser] = useState<User>({})

    useEffect(() => {
        const getData = async () => {
            const data = await getCurrentUser()
            setUser(data)
        }

        getData();

        const fetchData = async () => {
            const data = await getCategory();
            setProductTypes(data);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await getAllProduct();
            if (response) setProducts(response)
        }
        fetchProduct().then(r => {
        })
        setLoad(false)
    }, [reload]);


    return (
        <DashboardShell>
            <DashboardHeader heading="List item" text="Create and manage posts.">
                <AddDialog types={productTypes} setLoad={setLoad}/>
            </DashboardHeader>
            <div className={"overflow-x-auto md:overflow-hidden"}>
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Tên sp</TableHead>
                            <TableHead>Số lượng</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((e) => (
                            <TableRow key={e.id}>
                                <TableCell>{e.name}</TableCell>
                                <TableCell>{e.quantity}</TableCell>
                                <TableCell>
                                    <OrderDialog product={e} user={user} setLoad={setLoad}/>
                                </TableCell>
                                <TableCell>
                                    <EditDialog product={e}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </DashboardShell>
    )
}
