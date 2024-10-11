// Fetching a signle post : example : ('/Blog/post1' )
"use-client";
import { ReactMarkdown } from "react-markdown";

import {
  getPublishedBlogPosts,
  getSingleBlogPost,
} from "../../../../../services/NotionService";

export async function generateStaticParams() {
  const posts = await getPublishedBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

async function getPostData(slug) {
  const post = await getSingleBlogPost(slug);
  return post;
}

export default async function BlogPostPage({ params }) {
  if (!params?.slug) {
    // If no slug is provided, you can handle this gracefully.
    return <div>Post not found.</div>;
  }

  const { slug } = params;
  const { markdown, post } = await getPostData(slug);
  // console.log(markdown.parent);

  return (
    <>
      <main>
        {markdown?.parent ? (
          <ReactMarkdown>{markdown.parent}</ReactMarkdown>
        ) : (
          <div>No content available</div>
        )}
      </main>
    </>
  );
}
