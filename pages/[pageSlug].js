import Head from "next/head";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import { getPageSlugs, getSinglePage } from "@/lib/pages";

export async function getStaticProps({ params }) {
    const pageData = await getSinglePage(params.pageSlug);

    return {
        props: {
            pageData
        }
    };
}

export async function getStaticPaths() {
    const pageSlugs = await getPageSlugs();

    return {
        paths: pageSlugs.map((s) => (
            {
                params: {
                    pageSlug : s.slug
                },
            }
        )),
        fallback: false
    };
}

export default function Page({ pageData }) {
        
    return(
        <>
        <Head>
            <title>{pageData.title}</title>
            <meta name="robots" content="noindex" />
        </Head>
        
        <section className="bg-slate-700 z-10 relative">
            <SiteHeader />
        </section>
        
        <section className="content-area py-10">
            <h1 className="text-6xl text-center text-slate-900 py-8">{pageData.title}</h1>
            
            <div dangerouslySetInnerHTML={{ __html: pageData.content }} 
                className="post-content mx-auto lg:max-w-6xl"/>
        </section>
        <SiteFooter />
        </>
    );
}


