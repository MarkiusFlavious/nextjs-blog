import Image from "next/image";
import Link from "next/link";

export default function FeaturedImage({ post }) {
    let img = '';

    const defaultFeaturedImage = "https://headless.digitalhumanitydev.co.za/wp-content/uploads/2025/03/post-feature-9.webp";
    const defaultWidth = "300";
    const defaultHeight = "200";

    if(post.featuredImage) {
        const { sourceUrl, mediaDetails } = post.featuredImage.node;
        img = {
            src: sourceUrl,
            width: mediaDetails.width,
            height: mediaDetails.height,
        }
    }
    else {
        img = {
            src: defaultFeaturedImage,
            width: defaultWidth,
            height: defaultHeight
        }
    }

    return (
        <Link href={`/blog/${post.slug}`}>
            <Image src={img.src} width={img.width} height={img.height} alt={post.title} className="h-full object-cover rounded-xl" />
        </Link>
    );
}