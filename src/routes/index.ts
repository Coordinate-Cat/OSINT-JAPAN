import { data } from "../data/posts.json";

export function get() {
  return { body: { posts: data } };
}
