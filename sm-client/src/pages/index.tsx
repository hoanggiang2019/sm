import Head from "next/head";
import {Item} from "@/pages/(components)/item";
import React, {useEffect, useState} from "react";
import {Option, Select} from "@material-tailwind/react";
import {fetchData} from "@/pages/api/CategoryService";

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        const fetchAllCategory = async () => {
            const response = await fetchData('/api/category/getAll');
            setCategories(response.data);
        };

        const fetchDataFromApi = async () => {
            try {
                const response = await fetchData('/api/product/getAll');
                setCategories(response.data);
            } catch (e) {

            }
        };

        fetchAllCategory().then(r => {
        });
        fetchDataFromApi().then(r => {
        });

    }, [loading]);

    useEffect(() => {
        console.log("s" + selectedCategory)

    }, [selectedCategory]);


    return (
        <>
            <Head>
                <title>Next.js</title>
            </Head>

            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <div className="w-72">
                        <Select size="lg" label="Select Version" onChange={(e) => { // @ts-ignore
                            setSelectedCategory(e)
                        }}>
                            {categories.map((e) => (
                                <Option key={e.id} value={e.id.toString()}>{e.name}</Option>
                            ))}
                        </Select>
                    </div>
                    <div
                        className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">

                        {categories.map((product) => (
                            <Item id={product.name} name={product.name} price={"$35"} desc={""}/>
                        ))}

                    </div>


                </div>
            </div>
        </>
    );

}
