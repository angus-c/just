<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, fetch }) {
    const post = await fetch(`${page.path}.json`).then((res: Response) => res.json());

    if (!post || !post.published) {
      return {
        status: 404,
        error: new Error('Post could not be found')
      };
    }

    return {
      props: {
        post
      }
    };
  }
</script>

<script lang="ts">
  import ContactUs from '$lib/ContactUs/index.svelte';

  export let post: {
    title: string;
    desc: string;
  };
</script>

<slot />

<ContactUs />

<style>
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
