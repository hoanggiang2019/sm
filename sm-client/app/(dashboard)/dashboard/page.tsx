'use client'

import * as React from "react";
import {useEffect, useState} from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {DashboardHeader} from "@/components/header"
import {DashboardShell} from "@/components/shell"
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {getAllProduct, getCategory, saveProduct} from "@/lib/session";
import {Button} from "@/components/ui/button";
import {TypePopover} from "@/app/(dashboard)/dashboard/popver";
import {ClipboardEdit, ShoppingCart} from "lucide-react";

export default function DashboardPage() {
    const [isLoad, setLoad] = useState(true);
    const [products, setProducts] = useState<ProductProp[]>([]);
    const [product, setProduct] = useState<ProductProp>();
    const [types, setTypes] = useState<TypeProductProp[]>([]);
    useEffect(() => {
        const fetchProduct = async () => {
            const response = await getAllProduct();
            if (response) setProducts(response)
        }

        fetchProduct().then(r => {
        })

        const fetchCategory = async () => {
            const response = await getCategory();
            setTypes(response)
        };

        fetchCategory().then(r => {
        })
        setLoad(false);
    }, [isLoad]);


    const handleSaveProduct = async () => {
        console.log(product)
        const response = await saveProduct(product);
        if (response)
            setLoad(true);
    };

    return (
        <DashboardShell>
            <DashboardHeader heading="List item" text="Create and manage posts.">

                <Dialog>
                    <DialogTrigger asChild>
                        <Button>Add</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Add new product</DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col items-center space-y-2">
                            <div className="grid-cols-1 w-full max-w-sm grid items-center gap-1.5">
                                <Label htmlFor="type">Loại sản phẩm</Label>
                                <TypePopover product={product} setProduct={setProduct} types={types}/>
                            </div>
                            <div className="grid-cols-1 w-full max-w-sm grid items-center gap-1.5">
                                <Label htmlFor="name">Tên sp</Label>
                                <Input id="name" type="text"
                                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                           // @ts-ignore
                                           setProduct((prevProduct) => ({
                                               ...prevProduct,
                                               name: e.target.value,
                                           }));
                                       }}/>
                            </div>
                            <div className="grid-cols-1 w-full max-w-sm grid items-center gap-1.5">
                                <Label htmlFor="amount">Đơn giá</Label>
                                <Input id="amount" type="number"
                                       defaultValue={0}
                                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                           // @ts-ignore
                                           setProduct((prevProduct) => ({
                                               ...prevProduct,
                                               amount: parseFloat(e.target.value),
                                           }));
                                       }}
                                />
                            </div>
                            <div className="grid-cols-1 w-full max-w-sm grid items-center gap-1.5">
                                <Label htmlFor="quantity">Số lượng</Label>
                                <Input id="quantity" type="number"
                                       defaultValue={0}
                                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                           // @ts-ignore
                                           setProduct((prevProduct) => ({
                                               ...prevProduct,
                                               quantity: parseFloat(e.target.value),
                                           }));
                                       }}/>
                            </div>
                            <div className="grid-cols-1 w-full max-w-sm grid items-center gap-1.5">
                                <Label htmlFor="description">Mô tả</Label>
                                <Input id="description" type="text"
                                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                           // @ts-ignore
                                           setProduct((prevProduct) => ({
                                               ...prevProduct,
                                               description: e.target.value,
                                           }));
                                       }}/>
                            </div>
                        </div>
                        <DialogFooter className="sm:flex sm:justify-end">
                            <DialogClose asChild>
                                <Button type="button" onClick={handleSaveProduct}>
                                    Save
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </DashboardHeader>
            <div>

                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Tên sp</TableHead>
                            <TableHead>Số lượng</TableHead>
                            <TableHead>Đặt</TableHead>
                            <TableHead>Sửa</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((e) => (
                            <TableRow key={e.id}>
                                <TableCell>{e.name}</TableCell>
                                <TableCell>{e.quantity}</TableCell>
                                <TableCell><ShoppingCart/></TableCell>
                                <TableCell><ClipboardEdit/></TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                    {/*<TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell className="text-right">$2,500.00</TableCell>
                        </TableRow>
                    </TableFooter>*/}
                </Table>
                {/*<EmptyPlaceholder>*/}
                {/*    <EmptyPlaceholder.Icon name="post"/>*/}
                {/*    <EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>*/}
                {/*    <EmptyPlaceholder.Description>*/}
                {/*        You don&apos;t have any posts yet. Start creating content.*/}
                {/*    </EmptyPlaceholder.Description>*/}
                {/*    <PostCreateButton variant="outline"/>*/}
                {/*</EmptyPlaceholder>*/}

            </div>
        </DashboardShell>
    )
}
