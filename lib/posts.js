import graphqlRequest from "./graphqlRequest";

export async function getAllPosts() {
    const query = {
        query: `query getAllPosts {
                posts {
                    nodes {
                        date
                        slug
                        title
                        excerpt(format: RENDERED)
                        featuredImage {
                            node {
                                file
                                sourceUrl
                                mediaDetails {
                                    width
                                    height
                                }
                            }
                        }
                    categories {
                        nodes {
                                name
                                slug
                                }
                            }
                        }
                    pageInfo {
                        endCursor
                        hasNextPage
                        hasPreviousPage
                        startCursor
                        }
                    }
                }`
    };

    const resJson = await graphqlRequest(query);
    const allPosts = resJson.data.posts;

    return allPosts;
}