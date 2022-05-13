<script lang="ts">
  export let post: Post;
  import { MetaTags } from "svelte-meta-tags";
  import PostDetail from "$lib/components/PostDetail.svelte";
  import { blogMetaData } from "$lib/blogMetaData";
  import { envVariables } from "$lib/envVariables";

  const meta = {
    title: `${post.title} | ${blogMetaData.blogTitle}`,
    description: post.description ?? post.title,
    url: `/blog/${post.slug}`,
    siteName: blogMetaData.blogTitle,
    author: blogMetaData.blogTitle,
    image: {
      url: `${envVariables.basePath}/background.jpeg`,
      width: 1000,
      height: 523,
      alt: "image",
    },
  };
</script>

<MetaTags
  title={meta.title}
  description={meta.description}
  canonical={meta.url}
  openGraph={{
    article: {
      authors: [meta.author],
    },
    images: [
      {
        ...meta.image,
      },
    ],
    description: meta.description,
    site_name: meta.siteName,
    title: meta.title,
    type: "article",
    url: meta.url,
  }}
  twitter={{
    cardType: "summary_large_image",
    title: meta.title,
    description: meta.description,
    image: meta.image.url,
    imageAlt: meta.image.alt,
  }}
/>

<PostDetail {post} />
