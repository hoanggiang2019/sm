'use client'
import Link from "next/link"

import {cn} from "@/lib/utils"
import {Button, buttonVariants} from "@/components/ui/button"
import {Icons} from "@/components/icons"
import {Input} from "@/components/ui/input";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {toast} from "@/components/ui/use-toast";
import {authenticate, register} from "@/lib/session";
import {setCookie} from "cookies-next";

export default function RegisterPage() {
    const [firstname, setFirstname] = useState<string>('')
    const [lastname, setLastname] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const router = useRouter();

    async function handleSubmit() {
        if (username === '') {
            return toast({
                title: "Thông tin đăng kí không hợp lệ.",
                description: "Vui lòng nhập đầy đủ thông tin.",
                variant: "destructive"
            })
        }
        const body = {firstname: firstname, lastname: lastname, username: username, password: password}
        const response = await register(body);
        if (response) {

            router.push("/dashboard")
        }
    }

    return (
        <div
            className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">

            <Link href="/login"
                  className={cn(buttonVariants({variant: "ghost"}), "absolute right-4 top-4 md:right-8 md:top-8")}>
                Login
            </Link>

            <div className="hidden h-full bg-muted lg:block"/>
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <Icons.logo className="mx-auto h-6 w-6"/>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Create an account
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your username and password below to create your account
                        </p>
                    </div>
                    <div className={cn("grid gap-6",)}>

                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Input
                                    id="firstname"
                                    placeholder="Họ"
                                    type="text"
                                    autoCapitalize="none"
                                    autoComplete="username"
                                    autoCorrect="off"
                                    onChange={event => setFirstname(event.target.value)}
                                />
                                <Input
                                    id="lastname"
                                    placeholder="Tên"
                                    type="text"
                                    autoCapitalize="none"
                                    autoComplete="username"
                                    autoCorrect="off"
                                    onChange={event => setLastname(event.target.value)}
                                />

                                <Input
                                    id="username"
                                    placeholder="username"
                                    type="username"
                                    autoCapitalize="none"
                                    autoComplete="username"
                                    autoCorrect="off"
                                    onChange={event => setUsername(event.target.value)}
                                />

                                <Input
                                    id="password"
                                    placeholder="password"
                                    type="password"
                                    autoCapitalize="none"
                                    autoComplete="password"
                                    autoCorrect="off"
                                    onChange={event => setPassword(event.target.value)}
                                />
                            </div>

                            <Button className={"border-y-gray-900"} onClick={handleSubmit}>Sign In</Button>

                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t"/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
