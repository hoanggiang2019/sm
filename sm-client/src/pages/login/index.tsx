import Head from "next/head";

import {Button, Card, Checkbox, Input, Typography,} from "@material-tailwind/react";

export default function Home() {
    return (
        <>
            <Head>
                <title>Next.js</title>
            </Head>
            <div className={"flex justify-center items-center h-screen"}>
                <Card color="transparent" className={"shadow-2xl"}>
                    <Typography variant="h4" color="blue-gray" className={"text-center"}>
                        Login Account
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal text-center">
                        Welcome to back!
                    </Typography>
                    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 p-5">
                        <div className="mb-1 flex flex-col gap-6">
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Username
                            </Typography>
                            <Input
                                size="lg"
                                placeholder="username"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Password
                            </Typography>
                            <Input
                                type="password"
                                size="lg"
                                placeholder="********"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                        </div>
                        <Checkbox
                            label={
                                <Typography variant="small" color="gray" className="flex items-center font-normal">
                                    I agree the
                                    <a href="#" className="font-medium transition-colors hover:text-gray-900">
                                        &nbsp;Terms and Conditions
                                    </a>
                                </Typography>
                            }
                            containerProps={{className: "-ml-2.5"}}
                        />
                        <Button className="mt-6" fullWidth>
                            sign up
                        </Button>
                    </form>
                </Card>
            </div>
        </>
    );
}
