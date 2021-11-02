<script context="module" lang="ts">
  import { img } from './components';
  export { img };
</script>

<script lang="ts">
  import Seo from '$lib/Seo/index.svelte';
  import { websiteSchema, articleSchema } from '$utils/json-ld';
  export let title = '';
  export let desc = '';
  export let canonical = '';
  export let noindex = false;
</script>

<Seo
  {title}
  {desc}
  isPost={true}
  {canonical}
  {noindex}
  schemas={[websiteSchema, { ...articleSchema, name: title, description: desc }]} />

<div class="container" id="article">
  <div class="content-block">
    <slot />
  </div>
</div>

<style lang="scss">
  .container {
    display: block;
    box-sizing: border-box;
    width: 100%;
    min-width: 320px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--size-30);
  }

  .content-block {
    display: flex;
    flex-direction: column;
    max-width: var(--size-880);
    margin: 0 auto;
  }

  :global(.container .content-block h1) {
    width: 100%;
    height: auto;
    margin-bottom: var(--size-24);
    color: var(--primary-white) !important;
    font-weight: var(--weight-700);
    font-size: var(--size-36);
    line-height: var(--size-40);
    letter-spacing: 0.1rem;
    text-align: center;
    text-transform: uppercase;
  }

  :global(.container .content-block h2) {
    color: var(--primary-white) !important;
    font-weight: var(--weight-700);
    font-size: var(--size-30);
  }

  :global(.container .content-block h3) {
    color: var(--primary-white) !important;
    font-weight: var(--weight-700);
    font-size: var(--size-24);
  }

  :global(.container .content-block pre) {
    padding: 0.5em;
    overflow-x: auto;
    color: var(--primary-white);
    background-color: var(--color-pre-global-bg);
    border-radius: var(--size-2);
    box-shadow: inset var(--size-1) var(--size-1) var(--size-6) var(--color-pre-global-shadow);
  }

  :global(.container .content-block pre code) {
    padding: 0;
    color: var(--primary-white);
    background-color: var(--transparent);
  }

  :global(.container .content-block h1 a) {
    color: var(--primary-white) !important;
    text-decoration: none !important;
  }

  :global(.container .content-block h2 a) {
    color: var(--primary-white) !important;
    text-decoration: none !important;
  }

  :global(.container .content-block h3 a) {
    color: var(--primary-white) !important;
    text-decoration: none !important;
  }

  :global(.container .content-block ul) {
    margin: 0 0 0 var(--size-24);
    padding: 0 0 0 var(--size-24);
    line-height: 1.5;
  }

  :global(.container .content-block li) {
    margin: 0 0 0.5em 0;
    color: var(--primary-white);
  }

  :global(.container .content-block p) {
    color: var(--primary-white) !important;
    font-weight: var(--weight-400);
    line-height: 1.5;
    letter-spacing: var(--letter-spacing);
    text-align: justify;
    text-indent: var(--size-20);
  }

  :global(.container .content-block p img) {
    display: block;
    margin: 0 auto;
  }

  :global(.container .content-block strong) {
    color: var(--primary-white);
    font-weight: var(--weight-700);
  }

  :global(.container .content-block a) {
    color: var(--primary-white);
    text-decoration: underline;
  }

  :global(.container .content-block a:hover) {
    text-decoration: none;
  }

  :global(.container .content-block img) {
    max-width: 100%;
    height: auto;
  }
</style>
