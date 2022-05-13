import { envVariables } from "$lib/envVariables";
import { getPosts } from '$lib/getPosts'

export async function get() {
  const response = getPosts()

  const body = xml(response.body.posts)

  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/xml',
  }
  return {
    headers,
    body,
  }
}


const xml =
  posts => `<rss xmlns:dc="https://purl.org/dc/elements/1.1/" xmlns:content="https://purl.org/rss/1.0/modules/content/" xmlns:atom="https://www.w3.org/2005/Atom" version="2.0">
  <channel>
    <title>K-Sato</title>
    <link>${envVariables.basePath}</link>
    <description>A blog built with SvelteKit about tech and stuff!</description>
    ${posts
      .map(
        post =>
          `
        <item>
          <title>${post.title}</title>
          <description>${post.description}</description>
          <link>${envVariables.basePath}/blog/${post.slug}/</link>
          <pubDate>${new Date(post.date)}</pubDate>
          <content:encoded>
            <div style="margin-top: 50px; font-style: italic;">
              <strong>
                <a href="${envVariables.basePath}/blog/${post.slug}">
                  Keep reading
                </a>
              </strong>  
            </div>
          </content:encoded>
        </item>
      `
      )
      .join('')}
  </channel>
</rss>`