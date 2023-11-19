
/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export default function BlogPage({ params }: { params: { slug: string } }) {
    return <h1>Blog post: {params.slug} </h1>;
}