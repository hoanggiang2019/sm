'use client'

import Link from "next/link"

import {cn} from "@/lib/utils"
import {Button, buttonVariants} from "@/components/ui/button"
import {Icons} from "@/components/icons"
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {toast} from "@/components/ui/use-toast";
import {authenticate} from "@/lib/session";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";


export default function LoginPage() {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const router = useRouter();

    async function handleSubmit() {
        if (username === '') {
            return toast({
                title: "invalid username.",
                description: "Your sign in request failed. Please try again.",
                variant: "destructive"
            })
        }

        if (password === '') {
            return toast({
                title: "invalid password.",
                description: "Your sign in request failed. Please try again.",
                variant: "destructive"
            })
        }

        const response = await authenticate(username, password);
        if (response)
            router.push("/dashboard")
    }
    return (
        <div className="container flex h-screen w-screen flex-col items-center justify-center">
            <Link href="/"
                  className={cn(buttonVariants({variant: "ghost"}), "absolute left-4 top-4 md:left-8 md:top-8")}>
                <>
                    <Icons.chevronLeft className="mr-2 h-4 w-4"/>
                    Back
                </>
            </Link>
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <Icons.logo className="mx-auto h-6 w-6"/>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Welcome back
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your username and password to sign in to your account
                    </p>
                </div>
                <div className={cn("grid gap-6",)}>

                    <div className="grid gap-2">
                        <div className="grid gap-1">
                            <Label className="sr-only" htmlFor="email">
                                Email
                            </Label>
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
                <p className="px-8 text-center text-sm text-muted-foreground">
                    <Link
                        href="/register"
                        className="hover:text-brand underline underline-offset-4"
                    >
                        Don&apos;t have an account? Sign Up
                    </Link>
                </p>
            </div>
        </div>
    )
}
