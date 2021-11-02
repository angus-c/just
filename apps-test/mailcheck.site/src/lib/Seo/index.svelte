<script lang="ts">
  import { page } from '$app/stores';
  import data from '$utils/site-data';
  import { serializeSchema } from '$utils/json-ld';
  import type { Schema } from '$utils/json-ld';
  import { browser } from '$app/env';

  export let schemas: Schema[];
  export let canonical = '';
  export let title: string;
  export let isPost = false;
  export let thumbnail = '';
  export let desc = '';
  export let noindex = false;

  const { siteName, siteUrl } = data;
  const defaultDesc = data.description;
</script>

<svelte:head>
  <title>{siteName} | {title}</title>
  <link rel="canonical" href={canonical ? siteUrl + canonical : siteUrl + ($page.path ?? '')} />
  <meta name="description" content={desc || defaultDesc} />
  <meta name="robots" content={noindex ? 'noindex' : 'all'} />
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content={isPost ? 'blog' : 'website'} />
  <meta property="og:url" content="{siteUrl}{$page.path ?? ''}" />
  <meta property="og:title" content={title || siteName} />
  <meta property="og:description" content={desc || defaultDesc} />
  <meta property="og:image" content={thumbnail || siteUrl + '/favicon.png'} />
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="{siteUrl}{$page.path ?? ''}" />
  <meta property="twitter:title" content={title || siteName} />
  <meta property="twitter:description" content={desc || defaultDesc} />
  {#if thumbnail !== ''}<meta property="twitter:image" content={thumbnail} />{/if}
  {#if !browser}<!-- RSS Feed -->
    <link
      rel="alternate"
      type="application/rss+xml"
      title="RSS Feed for mailcheck.co"
      href="/rss.xml" />

    <!-- JSON-LD Schema -->
    {#each schemas as schema}
      {@html serializeSchema(schema)}
    {/each}{/if}
</svelte:head>
