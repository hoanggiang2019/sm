'use client'

import React, {useEffect, useState} from "react"
import {cn} from "@/lib/utils"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Button} from "@/components/ui/button";
import {toast} from "@/components/ui/use-toast"
import {useRouter} from "next/navigation";
import {authenticate} from "@/lib/session";
import {getCookie, setCookie} from "cookies-next";

interface UserAuth {
    username: string;
    password: string;
    errorUsername: string
    errorPassword: string
}

export function UserAuthForm() {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [token, setToken] = useState<string>()

    const router = useRouter();

    useEffect(() => {
        setToken(getCookie("token"))

        if (token) {
            setCookie("token", token)
            router.back()
        }

    }, [token]);

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
        if (response) {
            setToken(response.access_token)
        }
    }

    return (
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
    )
}
