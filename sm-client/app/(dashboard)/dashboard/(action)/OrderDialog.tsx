import {
    Dialog,
    DialogContent, DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Button} from "@/components/ui/button";
import {ShoppingCart} from "lucide-react";
import React, {Dispatch, SetStateAction, useState} from "react";
import {addOrder} from "@/lib/session";

export function OrderDialog({product, user, setLoad}: {
    product: Product,
    user: User,
    setLoad: Dispatch<SetStateAction<boolean>>
}) {
    const [quantity, setQuantity] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const handleAddOrder = async () => {
        const body = {shipperId: user.id, productId: product.id, quantity: quantity, price: price}
        console.log(body)
        const response = await addOrder(body);

        setLoad(true)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline"><ShoppingCart/> </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Đặt hàng</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Tên sản phẩm</Label>
                        <Input id="name" type="text" disabled={true} defaultValue={product.name}
                               className="col-span-3"/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Đơn giá</Label>
                        <Input id="name" type="number" className="col-span-3"
                               onChange={e => {
                                   // @ts-ignore
                                   setPrice(parseInt(e.target.value));
                               }}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">Số lượng đặt</Label>
                        <Input id="username" type="number" className="col-span-3"
                               onChange={e => {
                                   // @ts-ignore
                                   setQuantity(parseInt(e.target.value));
                               }}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleAddOrder}>Lưu</Button>
                </DialogFooter>
            </DialogContent>


        </Dialog>
    )
}
