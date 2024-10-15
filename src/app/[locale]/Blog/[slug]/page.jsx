// Fetching a signle post : example : ('/Blog/post1' )
import { ReactMarkdown } from "react-markdown";

// export async function generateStaticParams() {

// //   return posts.map((post) => ({
// //     slug: post.slug,
// //   }))
//  }

export default async function BlogPostPage({ params }) {
  // if (!params?.slug) {
  //   // If no slug is provided, you can handle this gracefully.
  //   return <div>Post not found.</div>;
  // }

  // const { slug } = params;
  // const { markdown, post } = await getPostData(slug);
  // console.log(markdown.parent);

  return (
    <>
      <main>
        {/* {markdown?.parent ? (
          <ReactMarkdown>{markdown.parent}</ReactMarkdown>
        ) : (
          <div>No content available</div>
        )} */}
        Singl post haere
      </main>
    </>
  );
}
