import {DashboardHeader} from "@/components/header"
import {DashboardShell} from "@/components/shell"

export const metadata = {
    title: "Settings",
    description: "Manage account and website settings.",
}

export default async function SettingsPage() {
    // const user = await getCurrentUser()

    return (
        <DashboardShell>
            <DashboardHeader
                heading="Settings"
                text="Manage account and website settings."
            />
            <div className="grid gap-10">
                {/*<UserNameForm  />*/}
            </div>
        </DashboardShell>
    )
}
