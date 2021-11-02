<script lang="ts">
  export let id: string;
  export let title: string;

  let iframePlaceholder = true;
</script>

<div class="video" on:click|once={() => (iframePlaceholder = false)}>
  {#if iframePlaceholder}
    <picture>
      <source srcset="https://i.ytimg.com/vi_webp/{id}/maxresdefault.webp" type="image/webp" />
      <img src="https://i.ytimg.com/vi/{id}/maxresdefault.jpg" alt={title} />
    </picture>
    <button>
      <svg width="68" height="48" viewBox="0 0 68 48">
        <path
          class="shape"
          d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" />
        <path class="icon" d="M 45,24 27,14 27,34" />
      </svg>
    </button>
  {:else}
    <iframe
      loading="lazy"
      width="560"
      height="315"
      src="https://www.youtube.com/embed/{id}/?rel=0&showinfo=0&autoplay=1"
      {title}
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen />
  {/if}
</div>

<style lang="scss">
  %fill {
    fill: var(--youtube-red);
    fill-opacity: 1;
  }

  .video {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%;
    background-color: var(--black);
    cursor: pointer;

    picture {
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: none;
      }
    }

    button {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 1;
      width: 68px;
      height: 48px;
      padding: 0;
      background-color: var(--transparent);
      border: none;
      transform: translate(-50%, -50%);
      cursor: pointer;

      svg {
        .shape {
          fill: var(--dark-06);
          fill-opacity: 0.8;
        }

        .icon {
          fill: var(--primary-white);
        }
      }

      &:focus {
        outline: none;

        .shape {
          @extend %fill;
        }
      }
    }

    iframe {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    &:hover {
      .shape {
        @extend %fill;
      }
    }
  }
</style>
