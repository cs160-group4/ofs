export default function BlogPage({ params }: { params: { slug: string } }) {
    return <h1>Blog post: {params.slug} </h1>;
}