<script lang="ts" context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ fetch }) {
    const list = await fetch('videos.json').then((res: Response) => res.json());
    const videos = [list[0], list[1]];
    return {
      props: {
        videos
      }
    };
  }
</script>

<script lang="ts">
  import Seo from '$lib/Seo/index.svelte';
  import { websiteSchema, organizationSchema } from '$utils/json-ld';
  import EmailsVerify from '$lib/EmailsVerify/index.svelte';
  import Partners from '$lib/Partners/index.svelte';
  import Features from '$lib/Features/index.svelte';
  import Choose from '$lib/Choose/index.svelte';
  import Pricing from '$lib/Pricing/index.svelte';
  import Reviews from '$lib/Reviews/index.svelte';
  import Team from '$lib/Team/index.svelte';
  import Testimonials from '$lib/Testimonials/index.svelte';
  import Faq from '$lib/Faq/index.svelte';
  import ContactUs from '$lib/ContactUs/index.svelte';
  import Cta from '$lib/Cta/index.svelte';
  import Affiliate from '$lib/Affiliate/index.svelte';
  import Videos from '$lib/Video/videos.svelte';
  import map from 'just-map-values';

  map({ a: 3, b: 5, c: 9 }, (value) => value + 1);

  interface IVideo {
    id: string;
    title: string;
    desc: string;
    date: string;
  }

  export let videos: IVideo[];
</script>

<Seo title="Home" schemas={[websiteSchema, organizationSchema]} />

<main class="manage-customers" role="main" id="main">
  <!-- EMAILS VERIFY -->
  <EmailsVerify />

  <!-- PARTNERS SECTION -->
  <Partners />

  <!--Welcome to the features-->
  <Features />

  <!--Choose your audience-->
  <Choose />

  <!--Pricing plans-->
  <Pricing />

  <!-- SECTION REVIEWS -->
  <Reviews />

  <!-- SECTION TEAM -->
  <Team />

  <!-- SECTION TESTIMONIALS -->
  <Testimonials />

  <!-- SECTION VIDEOS -->
  <Videos {videos} />

  <!-- SECTION AFFILIATES -->
  <Affiliate />

  <!--Questions-->
  <Faq />

  <!--Contact Us-->
  <ContactUs />

  <!-- SECTION CTA -->
  <Cta />
</main>

<style lang="scss">
  .manage-customers {
    position: relative;
    z-index: 1;

    &::before,
    &::after {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 100%;
      height: 45.625rem;
      background: url('./lines.svg') no-repeat center;
      background-size: 100% 66%, 40.875rem 46.25rem;
      content: '';
      pointer-events: none;
    }

    &::after {
      transform: scaleX(-1);
    }
  }

  @media only screen and (min-width: 1920px) {
    .manage-customers::before {
      background-position: 0 35%, 70.9375rem 0;
    }
  }

  @media only screen and (min-width: 1200px) and (max-width: 1440px) {
    .manage-customers::before {
      background-position: 0 35%, 48.75rem calc(#{var(--size-20)} * -1);
    }
  }

  @media only screen and (max-width: 1024px) {
    .manage-customers::before {
      background-position: 0 35%, 44.6875rem -0.9375rem;
    }
  }

  @media only screen and (max-width: 768px) {
    .manage-customers::before {
      margin-top: -6.25rem;
      padding-top: 6.25rem;
      background-position: top 35% left 30%;
      background-size: auto;
    }

    .manage-customers::after {
      display: none;
    }
  }

  @media only screen and (max-width: 480px) {
    .manage-customers::before {
      background-position: center left 35%;
    }
  }

  @media only screen and (max-width: 320px) {
    .manage-customers::before {
      background-position: 6.25rem -3.5rem;
      background-size: 0, 40.875rem 46.25rem;
    }
  }
</style>
