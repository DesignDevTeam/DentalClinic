// app/blog/page.js (or wherever your component resides)
import { getPublishedBlogPosts } from "../../../../services/notion";
const posts = await getPublishedBlogPosts();
const BlogPage = () => {
  console.log(posts);

  return (
    <div style={{ width: "100vw", display: "flex", justifyContent: "center" }}>
      <h1>A signle Blog Post , display contect</h1>
      <p>Blog Markdown</p>
      {posts?.map((blog) => {
        return (
          <div>
            <h1>{blog.author}</h1>
            <img src={blog.cover} alt="" />
            <h2>{blog.Status}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default BlogPage;
