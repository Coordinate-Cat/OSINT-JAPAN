<script lang="ts">
  export let posts;
  import { envVariables } from "$lib/envVariables";
  import { blogMetaData } from "$lib/blogMetaData";
  import { MetaTags } from "svelte-meta-tags";
  import PostList from "$lib/components/PostList.svelte";
  import PostItem from "$lib/components/Post.svelte";

  const meta = {
    title: `Home | ${blogMetaData.blogTitle}`,
    description: blogMetaData.description,
    url: envVariables.basePath,
    siteName: blogMetaData.blogTitle,
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
    description: meta.description,
    images: [
      {
        ...meta.image,
      },
    ],
    site_name: meta.siteName,
    title: meta.title,
    type: "website",
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

<h1>
  OSINT JAPAN
</h1>

<div class="home_development">
  <p>
    Under Development<br>
    This is <a href="https://github.com/Coordinate-Cat/JAPAN-OSINT/issues" class="home_development_issue">OSS</a>.<br>
    We are waiting for your great ideas.
  </p>
</div>

<div class="home_docs">
  <h2>
    Docs
  </h2>
  <ul class="home_docs_links">
    <li class="home_docs_links_item">
      <a href="/docs/news" class="">News</a>
    </li>
  </ul>
</div>

<div class="home_tools">
  <h2>
    Tools
  </h2>
</div>

<div class="home_blogs">
  <h2>
    Blogs
  </h2>
  <PostList>
    {#each posts as post}
      <PostItem {post} />
    {/each}
  </PostList>
</div>

<style>
  .home_development {
    background-color: #f5eeea;
    color: #787878;
    padding: 4px;
    border-radius: 4px;
  }

  .home_development > p {
    margin: 0;
  }

  .home_development_issue {
    color: #787878;
    font-size: 1.1rem;
    font-weight: 600;
    text-decoration: none;
  }

  .home_development_issue:hover {
    border-bottom: 2.5px solid #787878;
  }

  .home_docs_links {
    list-style: none;
  }
</style>
