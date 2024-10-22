// app/blog/page.js (or wherever your component resides)
import { getPublishedBlogPosts } from "../../../../services/notion";
const BlogPage = () => {
  getPublishedBlogPosts();

  return (
    <div style={{ width: "100vw", display: "flex", justifyContent: "center" }}>
      <h1>A signle Blog Post , display contect</h1>
      <p>Blog Markdown</p>
    </div>
  );
};

export default BlogPage;
