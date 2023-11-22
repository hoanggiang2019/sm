import {Avatar, AvatarFallback} from "@/components/ui/avatar"
import {Icons} from "@/components/icons"


export function UserAvatar() {
    return (
        <Avatar className={"h-8 w-8"}>

            <AvatarFallback>
                <span className="sr-only">admin</span>
                <Icons.user className="h-4 w-4"/>
            </AvatarFallback>
        </Avatar>
    )
}
