import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { getAllPosts } from "../../lib/posts";
import FeaturedImage from "../components/FeaturedImage";
import Date from "../components/Date";

export async function getStaticProps() {
    const allPosts = await getAllPosts();

    return {
        props: {
            allPosts: allPosts,

        },
    }
}

export default function BlogHome({ allPosts }) {
    return (
        <>
            <Head>
                <title>Blog</title>
                <meta name="robots" content="noindex" />
            </Head>
            <div className="h-[55vh] min-h-[20rem] bg-[url('/home-background.avif')] relative">
                <div className="absolute bg-gradient-to-b from-slate-900 via-slate-800 via-70% to-slate-700 to-120% inset-0 z-0 opacity-50"></div>
                <SiteHeader className="header-blog-home z-10 relative mb-4" />
                
                <h1 className="text-6xl text-center text-slate-100 relative z-1 py-10">Blog</h1>
                <p className=" text-2xl text-center text-slate-200 relative z-1">Read our latest articles</p>
            </div>
            <main>
                <section className="post-list py-[4rem] container mx-auto lg:max-w-5xl">
                    <ul>
                        {
                            allPosts.nodes.map((post) => (
                                <li key={post.slug} className="grid grid-cols-5 gap-4 mb-4">
                                    <div className="col-span-2">
                                        <FeaturedImage post={post} />
                                    </div>
                                    <div className="col-span-3">
                                        <h2 className="pt-4 text-blue-500 text-2xl hover:text-blue-800">
                                            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                                        </h2>
                                        <div className="py-4">
                                            Date Published: <Date  dateString={post.date}/>
                                        </div>
                                        <div dangerouslySetInnerHTML={
                                            {
                                            __html: post.excerpt
                                            }} className="text-xl">
                                        </div>
                                        <div className="mt-3">
                                            Posted Under: {
                                                post.categories.nodes.map
                                                ((category, index) => (
                                                    <span key={category.slug} className="text-blue-500 hover:text-blue-800">
                                                        <Link href={`category/${category.slug}`} >
                                                            {category.name}
                                                        </Link>
                                                        {index < post.categories.nodes.length - 1 && ", "}
                                                    </span>
                                                    
                                                ))
                                            }
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </section>
            </main>
            <SiteFooter />
        </>
    );
}