import { getPublishedPosts } from './blog/_blog';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
  const maxAge = 600;
  const posts = await getPublishedPosts();
  const body = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xml:base="https://www.mailcheck.co" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <atom:link href="https://www.mailcheck.co/rss.xml" rel="self" type="application/rss+xml" />
    <title>Mailcheck | Blog</title>
    <link>https://www.mailcheck.co/</link>
    <description>An application to clean your subscription list from bounces, and enrich data with customers. Verify your real customers in one way</description>
    ${posts
      .map(
        (post) => `<item>
          <guid>https://www.mailcheck.co/blog/${post.slug}</guid>
          <title>${post.title}</title>
          <link>https://www.mailcheck.co/blog/${post.slug}</link>
          <pubDate>${post.date}</pubDate>
          <description>${post.desc}</description>
          </item>`
      )
      .join('')}
  </channel>
</rss>
`;
  const headers = {
    'Cache-Control': `max-age=0, s-max-age=${maxAge}`,
    'Content-Type': 'application/xml'
  };
  return {
    headers,
    body
  };
};
