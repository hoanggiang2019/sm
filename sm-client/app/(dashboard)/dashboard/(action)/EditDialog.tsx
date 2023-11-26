import React, {useState} from "react";
import {
    Dialog,
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

interface EditDialogProp {
    product: Product
}

export function EditDialog({product}: EditDialogProp) {
    const [open, setOpen] = useState(false);
    const handleDialog = (event: React.MouseEvent<HTMLButtonElement>) => {

    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline"><ClipboardEdit/></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Sửa thông tin</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
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
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Số lượng
                        </Label>
                        <Input
                            id="username"
                            type="number"
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Lưu</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}