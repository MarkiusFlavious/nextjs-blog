import Link from "next/link";
import Image from "next/image";

export default function SiteHeader({ className }) {
    return (
        <header className={ `${className} bg-slate-950 bg-opacity-60 shadow-md shadow-slate-900/60`}>
            <div className="container mx-auto lg:max-w-7xl flex items-center justify-between py-1">
                <div className="logo-area">
                    <Link href="/" className="flex justify-center">
                        <Image src="/SampleLogo.avif" alt="Logo" width="100" height="100" priority="true" />
                    </Link>
                </div>
                <nav className="text-slate-100">
                    <ul className="flex justify-center [&>li>a]:px-3 [&>li>a]:py-2 [&>li>a:hover]:text-yellow-400">
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/blog">Blog</Link>
                        </li>
                        <li>
                            <Link href="/about">About</Link>
                        </li>
                        <li>
                            <Link href="/contact">Contact</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}