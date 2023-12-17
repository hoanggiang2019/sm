'use client'
import {deleteCategory, getCategory, getCurrentUser, saveCategory} from "@/lib/session";
import {useEffect, useState} from "react";
import {deleteCookie, getCookie} from "cookies-next";
import {useRouter} from "next/navigation";
import Nav from "@/app/(marketing)/nav";
import * as React from "react";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button";
import {MoreHorizontal} from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {toast} from "@/components/ui/use-toast";

export default function IndexPage() {
    const [productTypes, setProductTypes] = useState<ProductType[]>([]);
    const [name, setName] = useState('');
    const [obj, setObj] = useState<ProductType>();
    const [note, setNote] = useState('');
    const [user, setUser] = useState<User>()
    useEffect(() => {
        const handle = async () => {
            const token = getCookie("token");
            const resp = await getCurrentUser();
            if (resp) {
                setUser(resp)
            } else {
                deleteCookie("token")
            }
        }

        handle()
    }, []);

    useEffect(() => {
        fetchData().then(() => {});
    }, []);

    const fetchData = async () => {
        const data = await getCategory();
        setProductTypes(data);
    };

    const processNew =  async () => {
        const body = {name:obj?.name, description: obj?.description, id: obj?.id}
        const data = await saveCategory(body);
        if (data) {
            await fetchData()
            toast({title: "Lưu thành công"})
            setObj(undefined)
        } else {
            toast({title: "Lưu thất bại", variant: "destructive"})
        }
    }

    const del= async (id: number | undefined) =>{
        const data = await deleteCategory(id);
        if (data) {
            await fetchData()
            toast({title: "Xoá thành công"})
        } else {
            toast({title: "Xoá thất bại", variant: "destructive"})
        }
    }

    return (
        <>
            <header className="container z-40 bg-background">
                <Nav user={user}/>
            </header>
            <main className="flex-1">
                <section
                    id="features"
                    className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
                >
                    <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
                            Product
                        </h2>
                    </div>
                    <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
                        {productTypes?.map((e) => (
                            <div key={e.id}
                                 className="flex relative overflow-hidden rounded-lg border bg-background p-2">
                                <Link href={"/dashboard"}>
                                <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                                    {/*<svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
                                        <path
                                            d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z"/>
                                    </svg>*/}
                                    <div className="space-y-2">
                                        <h3 className="font-bold">{e.name}</h3>
                                        <p className="text-sm">
                                            {e.description}
                                        </p>
                                    </div>
                                </div>
                                </Link>
                                {
                                    (user?.admin &&
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="ml-auto">
                                                    <MoreHorizontal className="ml-2 h-4 w-4"/>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={event => setObj(e)}>Sửa</DropdownMenuItem>
                                                <DropdownMenuItem onClick={event => del(e.id)}>Xoá</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    )
                                }
                            </div>
                        ))}
                        {(user?.admin &&
                            <div className="flex w-full flex-col items-start justify-between rounded-md border px-4 py-3 sm:flex-row sm:items-center" onClick={() => setObj({})}>
                                <p className="text-sm font-medium leading-none">
                                <span className="mr-2 rounded-lg bg-primary px-2 py-1 text-xs text-primary-foreground">
                                  Create
                                </span>
                                    <span className="text-muted-foreground">Tạo mới</span>
                                </p>
                            </div>

                        )}
                    </div>
                </section>
            </main>

            <AlertDialog open={obj != undefined}>
                <form className="space-y-8">
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Lưu mặt hàng</AlertDialogTitle>
                            <div className="grid w-full items-center gap-4 pt-3.5">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Tên mặt hàng</Label>
                                    <Input id="name" type={"text"} defaultValue={obj?.name}
                                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                               // @ts-ignore
                                               setObj((prevProduct) => ({
                                                   ...prevProduct,
                                                   name: e.target.value,
                                               }));
                                           }}
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="note">Ghi chú</Label>
                                    <Input id="note" type={"text"} defaultValue={obj?.description}
                                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                               // @ts-ignore
                                               setObj((prevProduct) => ({
                                                   ...prevProduct,
                                                   description: e.target.value,
                                               }));
                                           }}
                                    />
                                </div>
                            </div>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={event => setObj(undefined)}>Huỷ</AlertDialogCancel>
                            <AlertDialogAction onClick={event => processNew()}>Xác nhận</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </form>
            </AlertDialog>
        </>
    )
}
