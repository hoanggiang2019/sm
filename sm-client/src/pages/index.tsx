import Head from "next/head";
import {TypeProduct} from "@/pages/(components)/type";

export default function Home() {
    return (
        <>
            <Head>
                <title>Next.js</title>
            </Head>

            <div className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <TypeProduct id="1" name="Hoa"/>
                    <TypeProduct id="2" name="Cây cảnh"/>
                    <TypeProduct id="3" name="Quả cầu pha lê"/>
                    <TypeProduct id="3" name="Quả cầu pha lê"/>
                </div>
            </div>




        </>
    );
}
