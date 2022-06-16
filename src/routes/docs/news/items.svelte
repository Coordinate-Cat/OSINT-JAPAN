<script lang="ts">
  import data from './example.json'
  import CopyToClipboard from "svelte-copy-to-clipboard";

  const handleSuccessfullyCopied = (e) => {
      alert(`successfully copied to clipboard!`);
  }

  const handleFailedCopy = () => {
      alert('failed to copy :(');
  }

  const newsItems = [data];
  let items = newsItems[0].news
</script>

<ul class="items">
  {#each items as item}
  <li class="item">
    <div class="item_name">
      <a target="_blank" href="{item.url}">{item.id}</a>
    </div>
    <div class="item_desc">
      <span>
        <!-- {item.desc} -->
      </span>
    </div>
    <div class="item_copy">
      <CopyToClipboard
        text={item.url}
        on:copy={handleSuccessfullyCopied}
        on:fail={handleFailedCopy}
        let:copy
      >
        <button on:click={copy} class="copy"><span>copy!</span></button>
      </CopyToClipboard>
    </div>
  </li>
  {/each}
</ul>

<style>
  ul {
    display: grid;
    grid-template-columns: 50% 50%;
    column-gap: 4px;
    row-gap: 4px;
  }
  .item {
    margin: 0;
    display: grid;
    grid-template-columns: 4fr 1fr auto;
    column-gap: 4px;
  }
  .item > div {
    background: #5f5f5f;
    color:#fff;
    cursor: pointer;
    place-content: center start;
    text-align: left;
    display: grid;
    gap: 1ch;
  }
  .item > div > a {
    color: #fff;
    width: 100%;
    text-align: left;
    text-decoration: none;
  }
  .item > div > span{
    display: block;
  }
  .item_name > a:hover{
    color: #4a4a65;
  }
  .item_name {
    cursor: pointer;
  }
  .item_copy > button {
    width: 50px;
    cursor: pointer;
    text-align: center;
  }
</style>