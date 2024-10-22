// services/NotionService.js
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

const notionClient = new Client({ auth: process.env.NOTION_ACCESS_TOKEN });
const notionToMarkdown = new NotionToMarkdown({ notionClient });

export const getPublishedBlogPosts = async () => {
  const database = process.env.NOTION_BLOG_DATABASE_ID;
  try {
    const response = await notionClient.databases.query({
      database_id: database,
      filter: {
        property: "Published",
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: "Created",
          direction: "descending",
        },
      ],
    });

    const posts = response.results.map((res) => pageToPostsTransformer(res));
    return posts;
  } catch (error) {
    console.error("Error fetching published blog posts:", error);
    throw error; // Re-throw the error if needed
  }
};

export const getSingleBlogPost = async (slug) => {
  let post, markdown;
  const database = process.env.NOTION_BLOG_DATABASE_ID;
  const response = await notionClient.databases.query({
    database_id: database,
    filter: {
      property: "Slug",
      formula: {
        text: {
          equals: slug,
        },
      },
    },
  });

  if (!response.results[0]) {
    throw "No results available";
  }

  const page = response.results[0];
  const madBlocks = await notionToMarkdown.pageToMarkdown(page.id); // converting the page to Markdown (array of blocks)
  markdown = notionToMarkdown.toMarkdownString(madBlocks); // converting the array blocks to actual markdown string
  post = pageToPostsTransformer(page); // assigning it to post variable
  return {
    post,
    markdown,
  };
};

const pageToPostsTransformer = (page) => {
  let cover = page.cover;
  // Handle cover type and set cover variable accordingly
  switch (page.cover?.type) {
    case "file":
      cover = page.cover.file.url;
      break;
    case "external":
      cover = page.cover.external.url;
      break;
    default:
      cover = "";
  }

  return {
    id: page.id,
    cover: cover,
    author: page.properties.Author.rich_text[0].plain_text,
    Status: page.properties.Status.status.name,
  };
};
