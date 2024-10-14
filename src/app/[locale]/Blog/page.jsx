// app/blog/page.js (or wherever your component resides)
import BlogPost from "components/app/components/BlogPost";
import { getPublishedBlogPosts } from "../../../../services/NotionService";
import SinglePost_btn from "components/app/components/SinglePost_btn";

const BlogPage = async () => {
  const posts = await getPublishedBlogPosts(); // Fetch data

  return (
    <div style={{ width: "100vw", display: "flex", justifyContent: "center" }}>
      <h1>Blog Posts</h1>
      <div style={{ width: "40%" }}>
        {posts.map((pt) => (
          <div>
            <BlogPost key={pt.id} post={pt} />
            <SinglePost_btn id={pt.slug} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
