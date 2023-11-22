'use client'

import {EmptyPlaceholder} from "@/components/empty-placeholder"
import {DashboardHeader} from "@/components/header"
import {PostCreateButton} from "@/components/post-create-button"
import {DashboardShell} from "@/components/shell"
import {useState} from "react";

interface Product {
    id: string
    name: string
    description: string
}

export default function DashboardPage() {
    const [products, setProduct] = useState<Product[]>([]);

    return (
        <DashboardShell>
            <DashboardHeader heading="Posts" text="Create and manage posts.">
                <PostCreateButton/>
            </DashboardHeader>
            <div>

                <EmptyPlaceholder>
                    <EmptyPlaceholder.Icon name="post"/>
                    <EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
                    <EmptyPlaceholder.Description>
                        You don&apos;t have any posts yet. Start creating content.
                    </EmptyPlaceholder.Description>
                    <PostCreateButton variant="outline"/>
                </EmptyPlaceholder>

            </div>
        </DashboardShell>
    )
}
