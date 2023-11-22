'use client'
import {useEffect, useState} from "react";
import {getCategory} from "@/lib/session";

interface Category {
    id: number
    name: string
    description: string
}

export function CategoryCard(category: Category) {
    return (
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
                    {/*<path d={""}/>*/}
                </svg>
                <div className="space-y-2">
                    <h3 className="font-bold">{category.name}</h3>
                    <p className="text-sm">
                        {category.description}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default function IndexPage() {
    const [category, setCategory] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategory = async () => {
            const response = await getCategory();
            setCategory(response)
        };

        fetchCategory().then(r => {
        })
    }, []);


    return (
        <>
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
                    {category.map((e) => (
                        <CategoryCard key={e.id} description={e.description} name={e.name} id={e.id}/>
                    ))}
                </div>
            </section>

        </>
    )
}
