"use client"

import * as React from "react"
import {useRouter} from "next/navigation"
import * as z from "zod"

import {cn} from "@/lib/utils"
import {userNameSchema} from "@/lib/validations/user"
import {buttonVariants} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {toast} from "@/components/ui/use-toast"
import {Icons} from "@/components/icons"


type FormData = z.infer<typeof userNameSchema>

export function UserNameForm(className: string) {
    const router = useRouter()

    const [isSaving, setIsSaving] = React.useState<boolean>(false)

    async function onSubmit(data: FormData) {
        setIsSaving(true)


        setIsSaving(false)

        toast({
            description: "Your name has been updated.",
        })

        router.refresh()
    }

    function handleSubmit(onSubmit: (data: FormData) => Promise<void>) {
        return undefined;
    }

    return (
        <form
            className={cn(className)}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Card>
                <CardHeader>
                    <CardTitle>Your Name</CardTitle>
                    <CardDescription>
                        Please enter your full name or a display name you are comfortable
                        with.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="name">
                            Name
                        </Label>
                        <Input
                            id="name"
                            className="w-[400px]"
                            size={32}
                        />
                        <p className="px-1 text-xs text-red-600">errre</p>

                    </div>
                </CardContent>
                <CardFooter>
                    <button
                        type="submit"
                        className={cn(buttonVariants(), className)}
                        disabled={isSaving}
                    >
                        {isSaving && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                        )}
                        <span>Save</span>
                    </button>
                </CardFooter>
            </Card>
        </form>
    )
}