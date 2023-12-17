import React, {Dispatch, SetStateAction, useState} from "react";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {ClipboardEdit} from "lucide-react";
import {toast} from "@/components/ui/use-toast";
import {saveProduct, updateProduct} from "@/lib/session";

interface EditDialogProp {
    product: Product
    setReload:Dispatch<SetStateAction<any>>
}

export function EditDialog({product,setReload} : EditDialogProp) {
    const [name, setName] = useState(product.name);
    const [sl, setSl] = useState(product.quantity);

    const handleDialog = async () => {
        const body = {id: product.id, name: name, quantity: sl}
        const response = await updateProduct(body);
        if (response?.status == 200) {
            setReload(true)
            return toast({
                title: "Sửa thành công"
            })
        } else {
            return toast({
                title: "Sửa thất bại"
            })
        }
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline"><ClipboardEdit/></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Sửa thông tin</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Tên
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            defaultValue={product.name}
                            className="col-span-3"
                            onChange={event => setName(event.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Số lượng
                        </Label>
                        <Input
                            id="quantity"
                            type="number"
                            defaultValue={product.quantity}
                            className="col-span-3"
                            // @ts-ignore
                            onChange={event => setSl(event.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="submit" onClick={handleDialog}>Xác nhận</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}