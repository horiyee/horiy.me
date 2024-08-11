import { assertEquals } from "../../deps.ts";
import { assert } from "../../deps.ts";
import { BlogPostService } from "../../services/blogPost.ts";
import { BlogPost } from "../../types/blogPost.ts";

const kv = await Deno.openKv("./tests/test.db");
const blogPostService = BlogPostService(kv);

const blogPosts: BlogPost[] = [
  {
    id: "",
    title: "いえーい",
    body: "見てる〜？",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

Deno.test("create() はblogPostをDeno KVに保存してuuidを返す", async () => {
  const id = await blogPostService.create(blogPosts[0]);

  assert(typeof id === "string");
  blogPosts[0].id = id;
});

Deno.test("fetchAll() はblogPostをDeno KVから全取得して返す", async () => {
  const results = await blogPostService.fetchAll();
  assert(results.length > 0);

  const blogPost = results.find((result) => result.id === blogPosts[0].id);
  assertEquals(blogPost, blogPosts[0]);
});
