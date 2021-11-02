<script lang="ts">
  import { inview } from 'svelte-inview';
  import { inviewOptions } from '$utils/site-data';
  import Video from '$lib/Video/video.svelte';

  interface IVideo {
    id: string;
    title: string;
    desc: string;
    date: string;
  }

  export let videos: IVideo[];
  let intersecting: boolean;
  let title = 'Video Tutorials';
</script>

<section
  class="tutorials"
  class:intersecting
  use:inview={inviewOptions}
  on:enter={(event) => {
    const { inView } = event.detail;
    intersecting = inView;
  }}>
  <div class="section-heading sm-left">
    <h3 class="title-small">{title}</h3>
    <p class="section-title-lg">Tutorials</p>
  </div>

  <div class="grid">
    {#each videos as video}
      <div class="video-wrapper">
        <Video id={video.id} title={video.title} />
      </div>
    {/each}
  </div>
  <a href="/videos" {title}>view all</a>
</section>

<style lang="scss">
  .tutorials {
    @include intersection;

    margin-top: 6rem;
    padding: 0 var(--size-30) var(--size-50);

    .section-heading {
      position: relative;

      .title-small {
        width: 100%;
        height: auto;
        margin-bottom: var(--size-24);
        color: var(--primary-white);
        font-weight: var(--weight-700);
        font-size: var(--size-32);
        line-height: var(--size-40);
        letter-spacing: var(--size-2);
        text-align: center;
        text-transform: uppercase;
      }

      .section-title-lg {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        margin: 0;
        color: var(--section-titles-color);
        font-weight: var(--weight-700);
        font-size: var(--size-clamped);
        line-height: 0.2;
        letter-spacing: var(--letter-spacing);
        text-align: center;
        text-transform: uppercase;
        pointer-events: none;
      }
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(18.75rem, 1fr));
      max-width: var(--size-880);
      margin: 2rem auto var(--size-60);
      text-align: center;
      column-gap: var(--size-40);

      .video-wrapper {
        &:first-child {
          margin-bottom: var(--size-60);
        }
      }
    }

    a {
      display: block;
      max-width: 10rem;
      height: var(--size-60);
      margin: 0 auto;
      padding: 0 var(--size-40);
      color: var(--primary-white);
      font-weight: var(--weight-700);
      font-size: var(--size-16);
      line-height: var(--size-60);
      letter-spacing: var(--letter-spacing);
      text-align: center;
      text-transform: uppercase;
      border: var(--size-1) solid var(--primary-white);
      border-radius: var(--size-6);
      outline: none;
      transition: transform 0.25s ease;

      &:hover {
        color: var(--primary-accent);
        text-decoration: none;
        background-color: var(--primary-white);
        transform: translateY(var(--size-1-invert));
      }
    }
  }

  @media only screen and (min-width: 768px) {
    .tutorials {
      .grid {
        .video-wrapper {
          &:first-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
</style>
