import {
    Dialog, DialogClose,
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
import {toast} from "@/components/ui/use-toast";

export function OrderDialog({product, user, setReload}: {
    product: Product,
    user: User,
    setReload: Dispatch<SetStateAction<any>>
}) {
    const [quantity, setQuantity] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const [freeShip, setFreeShip] = useState<number>(0);
    const handleAddOrder = async () => {
        const body = {shipperId: user.id, productId: product.id, quantity: quantity, price: price, freeShip: freeShip}
        // @ts-ignore
        if (quantity > product.quantity) {
            return toast({
                title: "Không thể đặt quá số lượng",
                variant: "destructive"
            })
        }
        const response = await addOrder(body);
        if (response?.status == 200) {
            setReload(true)
            return toast({
                title: "Thêm thành công"
            })
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" disabled={!product.quantity || product.quantity === 0}><ShoppingCart/> </Button>
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
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">Miễn phí ship</Label>
                        <Input id="username" type="number" className="col-span-3"
                               onChange={e => {
                                   // @ts-ignore
                                   setFreeShip(parseInt(e.target.value));
                               }}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="submit" onClick={handleAddOrder}>Xác nhận</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>


        </Dialog>
    )
}
