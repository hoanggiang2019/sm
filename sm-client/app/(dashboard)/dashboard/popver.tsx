import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {Check, ChevronsUpDown} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "@/components/ui/command";
import {cn} from "@/lib/utils";
import React, {Dispatch, SetStateAction, useState} from "react";

interface ComponentBProps {
    product: ProductProp | undefined;
    setProduct: Dispatch<SetStateAction<ProductProp | undefined>>;
    types: TypeProductProp[] | undefined;
}

export function TypePopover({product, setProduct, types}: ComponentBProps) {
    const [open, setOpen] = useState(false)
    const [select, setSelect] = useState()

    return (

        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
                    {select
                        ? types?.find((v) => v.name == select)?.name
                        : "Select type..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className={"w-[200px] p-0"}>
                <Command>
                    <CommandInput placeholder="Search product type..."/>
                    <CommandEmpty>No product type found.</CommandEmpty>
                    <CommandGroup>
                        {types?.map((type) => (
                            <CommandItem
                                key={type.id}
                                value={type.id.toString()}
                                onSelect={(e) => {
                                    console.log(e)
                                    // @ts-ignore
                                    setProduct((prevProduct) => ({
                                        ...prevProduct,
                                        type: e,
                                        categoryId: e
                                    }));
                                    console.log(product)

                                    setOpen(false)
                                    // @ts-ignore
                                    setSelect(e === select ? "" : e)
                                }}
                            >
                                <Check
                                    className={cn("mr-2 h-4 w-4", select === type.name ? "opacity-100" : "opacity-0")}/>
                                {type.name}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}


