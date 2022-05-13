<script lang="ts">
  export let post: Post;
  import { format } from "fecha";
</script>

<div class="post-item">
  <p class="post-item__date">{format(new Date(post.date), "MMMM DD, YYYY")}</p>
  <h2 class="post-item__title">
    <a class="post-item__title__link" href={`/blog/${post.slug}`}
      >{post.title}</a
    >
  </h2>
  <p class="post-item__description">{post.description}</p>
</div>

<style>
  .post-item {
    border-bottom: solid 1px var(--border-color);
    padding: 1rem 0;
    line-height: 1.6;
  }
  .post-item__date {
    color: var(--secondary-color);
  }

  .post-item__title {
    margin: 0.5rem 0;
  }

  .post-item__title__link {
    color: var(--main-color);
    font-size: 1.5rem;
    text-decoration: none;
  }
</style>
