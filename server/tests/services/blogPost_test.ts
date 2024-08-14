import { assertEquals } from "../../deps.ts";
import { assert } from "../../deps.ts";
import { BlogPostRepository } from "../../repositories/blogPost.ts";
import { BlogPostService } from "../../services/blogPost.ts";
import { BlogPost } from "../../types/blogPost.ts";
import { testKv } from "../index.ts";

const blogPostRepository = BlogPostRepository(testKv);
const blogPostService = BlogPostService(blogPostRepository);

const blogPosts: BlogPost[] = [
  {
    id: "",
    title: "いえーい",
    body: "見てる〜？",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

Deno.test(
  "BlogPostService.create() はblogPostをDeno KVに保存してuuidを返す",
  async () => {
    const id = await blogPostService.create(blogPosts[0]);

    assert(typeof id === "string");
    blogPosts[0].id = id;
  },
);

Deno.test(
  "BlogPostService.update() は既存のblogPostを更新してDeno KVに保存できる",
  async () => {
    blogPosts[0].updatedAt = new Date();
    await blogPostService.update(blogPosts[0]);

    const results = await blogPostService.fetchAll();
    const blogPost = results.find((result) => result.id === blogPosts[0].id);
    assertEquals(blogPost, blogPosts[0]);
  },
);

Deno.test(
  "BlogPostService.fetchAll() はblogPostをDeno KVから全取得して返す",
  async () => {
    const results = await blogPostService.fetchAll();
    assert(results.length > 0);

    const blogPost = results.find((result) => result.id === blogPosts[0].id);
    assertEquals(blogPost, blogPosts[0]);
  },
);
