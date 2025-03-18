import Image from "next/image";
import Link from "next/link";

export default function FeaturedImage({ post }) {
    console.log("FeaturedImage: Received post:", post);

    let img = {
        src: "https://headless.digitalhumanitydev.co.za/wp-content/uploads/2025/03/post-feature-9.webp",
        width: 300,
        height: 200,
    };

    if (post && post.featuredImage && post.featuredImage.node) {
        const { sourceUrl, mediaDetails } = post.featuredImage.node;
        img = {
            src: sourceUrl,
            width: mediaDetails.width,
            height: mediaDetails.height,
        };
    }

    return (
        <Link href={`/blog/${post.slug}`}>
            <Image
                src={img.src}
                width={img.width}
                height={img.height}
                alt={post.title}
                className="h-full object-cover rounded-xl"
            />
        </Link>
    );
}