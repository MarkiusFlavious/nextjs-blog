import graphqlRequest from "./graphqlRequest";

export async function getPageSlugs() {
    const query = {
        query: `
            query getPageSlugs {
                pages {
                    nodes {
                    slug
                    }
                }
            }
        `,
    }

    const resJson = await graphqlRequest(query);
    const slugs = resJson.data.pages.nodes;

    return slugs;
}

export async function getSinglePage(slug) {
    const query = {
        query: `
            query getSinglePage {
                pages(where: {name: "${slug}"}) {
                    nodes {
                    title(format: RENDERED)
                    content(format: RENDERED)
                    date
                    modified
                    slug
                    }
                }
            }
        `,
    }

    const resJson = await graphqlRequest(query);
    const pageData = resJson.data.pages.nodes[0];
    
    return pageData;
}