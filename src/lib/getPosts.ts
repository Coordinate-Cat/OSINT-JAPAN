import { data } from "../data/posts.json";

export function getPosts() {
  return { body: { posts: data } };
}