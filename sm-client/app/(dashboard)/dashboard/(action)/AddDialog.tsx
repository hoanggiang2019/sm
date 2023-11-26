import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import * as React from "react";
import {saveProduct} from "@/lib/session";
import {useState} from "react";
import {useStore} from "@/app/store/stores";

interface AddDialogProp {
    types: ProductType[]
    setLoad: React.Dispatch<React.SetStateAction<boolean>>
}


export function AddDialog({types, setLoad}: AddDialogProp) {
    const [product, setProduct] = useState<Product>();

    const {productTypeStore} = useStore()
    const {productTypes} = productTypeStore

    const handleSaveProduct = async () => {
        console.log(product)
        const response = await saveProduct(product);
        if (response?.status == 200)
            setLoad(true);
    };


    return (
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

                        <Select onValueChange={(e) => {
                            // @ts-ignore
                            setProduct((prevProduct) => ({
                                ...prevProduct,
                                categoryId: e,
                            }));
                        }}>
                            <SelectTrigger id="framework">
                                <SelectValue placeholder="Select"/>
                            </SelectTrigger>
                            <SelectContent position="popper">
                                {productTypes.map((e) => (
                                    // @ts-ignore
                                    <SelectItem key={e.id} value={e.id.toString()}>{e.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

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
    )
}