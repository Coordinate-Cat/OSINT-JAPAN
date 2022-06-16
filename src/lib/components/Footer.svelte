<script>
var year = new Date().getFullYear();
</script>

<footer class="footer">
  <ul class="footer__links">
    <li class="footer__links_item">
      <a href="/" class="footer__links__item__link">Home</a>
    </li>
    <li class="footer__links_item">
      <a href="/docs" class="footer__links__item__link">Docs</a>
    </li>
    <li class="footer__links_item">
      <a href="/about" class="footer__links__item__link">About</a>
    </li>
    <li class="footer__links_item">
      <a href="/rss.xml" class="footer__links__item__link">RSS</a>
    </li>
    <li class="footer__links_item">
      <a href="https://github.com/Coordinate-Cat/JAPAN-OSINT/blob/main/LICENSE" class="footer__links__item__link">MIT</a>
    </li>
    <!-- <li class="footer__links_item">
    </li> -->
  </ul>
  <div class="footer__copyright">
    <a href="https://github.com/Coordinate-Cat" class="footer__links__item__link">© {year} OKA</a>
  </div>
</footer>

<style>
  .footer {
    height: 6rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .footer__links {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    list-style: none;
  }

  .footer__links_item {
    margin-left: 1rem;
  }

  .footer__links_item > a {
    white-space: nowrap;
  }

  .footer__links_item:last-child {
    margin-right: 1rem;
  }

  @media screen and (max-width: 480px) {
	/* under 480px */
    .footer__links {
      justify-content: start;
    }
    .footer__links_item {
      width: calc(25%);
    }
  }

  .footer__links__item__link {
    padding-bottom: 0.2rem;
    color: var(--secondary-color);
    text-decoration: none;
  }

  .footer__links__item__link:hover {
    border-bottom: 1.5px solid var(--secondary-color);
  }

  .footer__copyright {
    text-align: center;
  }
</style>
