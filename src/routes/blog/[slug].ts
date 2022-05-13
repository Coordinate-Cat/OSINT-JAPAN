import { data } from "../../data/posts.json";

export async function get({ params }) {
  const slug = params.slug.toLowerCase();
  const post = data.find((post) => post.slug == slug);

  if(post) {
    return {
      body: { post },
    };  
  }
  
  return {
    body: { message: "Not found", post: null, },
  };
}