import Link from "next/link";

export default function SiteFooter() {
    return (
        <>
        <footer id="site-footer" className="bg-slate-200">
            <div className="flex justify-center items-center container mx-auto lg:max-w-6xl py-4">
                
                <div className=" border-r border-black pr-4">&copy; 2025 Mark Test</div>
                <ul className="flex [&>li]:px-2 [&>li:hover]:opacity-75 [&>li]:text-black pl-2">
                    <li className="">
                        <Link href="/about">About</Link>
                    </li>
                    <li>
                        <Link href="/privacy-policy">Privacy Policy</Link>
                    </li>
                </ul>

            </div>
                        
        </footer>
        </>
    );
}