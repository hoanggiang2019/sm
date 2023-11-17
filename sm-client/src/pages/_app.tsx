import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {ThemeProvider} from "@material-tailwind/react";
import {ComplexNavbar} from "@/pages/(components)/navbar";

export default function App({Component, pageProps}: AppProps) {
    return (
        <ThemeProvider>
            <ComplexNavbar/>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}
