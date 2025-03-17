import Head from "next/head";
import SiteHeader from "./components/SiteHeader";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <Head>
                <title key="pagetitle">Welcome To Blog</title>
                <meta name="description" content="A blog about random travels and random things" key="metadescription" />
            </Head>
            <div className="min-h-screen bg-[url('/home-background.avif')] relative">
                <div className="absolute bg-gradient-to-b from-slate-900 via-slate-800 via-70% to-slate-600 to-120% inset-0 z-0 opacity-60"></div>
                <SiteHeader className="z-10 relative" />
                <main>
                    <div className="min-h-[50vh] flex flex-col items-center justify-center z-10 relative">
                        <h1 className="text-6xl text-center text-slate-100">Welcome to <span className="text-yellow-400">My Awesome</span> Blog!</h1>
                        <div className="mt-20">
                            <Link href="/blog" className="text-2xl text-slate-800 bg-slate-100 rounded-xl py-3 px-5 hover:bg-yellow-300 transition">Read Blog</Link>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}