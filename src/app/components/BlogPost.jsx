import React from "react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import Link from "next/link";

const BlogPost = ({ post }) => {
  dayjs.extend(localizedFormat);
  return (
    <>
      {/* <Link href={`/Blog/${post.slug}`}> */}
      <div>
        <div className="flex flex-col shadow-md">
          {/* image  */}
          <h3> Author {post.author}</h3>
          <div>
            <img height="200px" width="300px" src={post.cover} alt="cover" />
          </div>
          {/* text  */}
          <div>
            <div>
              <span>
                <h4 className="text-xs"> {dayjs(post.date).format("LL")} </h4>
              </span>
              <span>
                <h4 className="text-xs"> {post.title} </h4>
              </span>
              <span>
                <h4 className="text-xs">description : {post.description} </h4>
              </span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
