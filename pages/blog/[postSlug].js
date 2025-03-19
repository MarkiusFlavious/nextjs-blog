import Head from "next/head";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { getPostSlugs, getSinglePost } from "@/lib/posts";
import Date from "../components/Date";

export async function getStaticProps({ params }) {
    const postData = await getSinglePost(params.postSlug);

    let featuredImageUrl = "https://headless.digitalhumanitydev.co.za/wp-content/uploads/2025/03/post-feature-9.webp";

    if(postData.featuredImage.node.sourceUrl) {
        featuredImageUrl = postData.featuredImage.node.sourceUrl;
    }

    return {
        props: {
            postData,
            featuredImageUrl: "url(" + featuredImageUrl + ")",
        }
    };
}

export async function getStaticPaths() {
    const postSlugs = await getPostSlugs();

    return {
        paths: postSlugs.map((s) => (
            {
                params: {
                postSlug: s.slug
                }
            }
        )),
        fallback: false
    };
}

export default function Post({ postData, featuredImageUrl }) {
    return (
        <>
        <Head>
            <title key="pageTitle">{postData.title}</title>
            <meta name="description" content={postData.excerpt} />
            <meta name="robots" content="noindex" />
        </Head>
        <section className="absolute w-full z-20">
            <SiteHeader className="header-single-post z-10 relative" />
        </section>
        <article>
            <section className="hero-area h-[60vh] min-h-[30rem] bg-no-repeat bg-cover bg-center relative" style={{backgroundImage: featuredImageUrl}}>
                <div className="absolute inset-0 bg-slate-900 opacity-60"></div>

                <div className="container mx-auto h-full flex flex-col justify-center lg:max-w-6xl">
                    <h1 className="text-6xl text-center text-slate-100 relative z-5 py-8 mt-12">{postData.title}</h1>
                    <div className="relative z-5 text-left text-xl text-slate-200 pb-2">Posted by Mark. Last updated: <Date dateString={postData.modified} /> </div>
                    <div dangerouslySetInnerHTML={{__html:postData.excerpt}} className="relative z-5 text-left text-2xl text-slate-200 pl-4 border-l-4 border-lime-200" />
                </div>
            </section>
            
            <section className="content-area py-8">
                <div dangerouslySetInnerHTML={{__html: postData.content}}
                className="post-content container mx-auto lg:max-w-6xl" />
            </section>
        </article>
        <SiteFooter />
        </>
    );
}