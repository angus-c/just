<script lang="ts" context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ fetch }) {
    const videos = await fetch('videos.json').then((res: Response) => res.json());
    return {
      props: {
        videos
      }
    };
  }
</script>

<script lang="ts">
  import Video from '$lib/Video/video.svelte';
  import Slider from '$lib/Video/slider.svelte';
  import FaraAva from '$lib/Video/assets/fara.png?w=46&format=webp;png;avif&srcset';
  import FaraAvaDefault from '$lib/Video/assets/fara.png';

  interface IVideo {
    id: string;
    title: string;
    desc: string;
    date: string;
  }

  export let videos: IVideo[];
</script>

<main class="videos">
  <h1 class="title">Video Tutorials</h1>
  <div class="slider">
    <Slider slides={videos} />
  </div>
  <div class="list">
    {#each videos as video}
      <div class="content">
        <div class="video-wrapper">
          <Video id={video.id} title={video.title} />
        </div>
        <div class="description">
          <h2>{video.title}</h2>
          <p class="description-subtitle">{video.desc}</p>
          <div class="author">
            <div class="avatar">
              <img width="46" height="46" srcset={FaraAva} src={FaraAvaDefault} alt="Fara Muhammadiev" />
            </div>
            <div class="about">
              <h3 class="name">Fara Muhammadiev</h3>
              <p class="date">{video.date}</p>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
</main>

<style lang="scss">
  .videos {
    display: block;
    box-sizing: border-box;
    width: 100%;
    min-width: 320px;
    max-width: 1200px;
    margin: 0 auto var(--size-20);
    padding: 0 var(--size-30);

    .slider {
      width: 100%;
      margin-bottom: var(--size-30);
    }

    .list {
      display: flex;
      flex-flow: column wrap;
      min-height: var(--size-880);

      .content {
        z-index: 1;
        width: 100%;

        %text {
          color: var(--primary-white);
          line-height: 1.2;
          letter-spacing: normal;
          text-align: left;
          text-indent: initial;
        }

        .video-wrapper {
          overflow: hidden;
          background-color: var(--primary-white);
          border-radius: var(--br-10);
        }

        .description {
          h2 {
            @extend %text;

            font-weight: var(--weight-700);
            font-size: var(--size-20);
          }

          p {
            @extend %text;

            font-weight: var(--weight-400);
            font-size: var(--size-14);

            &.description-subtitle {
              min-height: var(--size-32);
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
          }

          .author {
            display: flex;
            align-items: center;
            margin-bottom: var(--size-20);

            .avatar {
              width: var(--size-46);
              height: var(--size-46);
              margin-right: var(--size-16);
              overflow: hidden;
              background-color: var(--primary-white);
              border-radius: var(--br-rounded);
            }

            .about {
              .name {
                @extend %text;

                margin: 0;
                font-weight: var(--weight-400);
                font-size: var(--size-18);
                text-transform: none;
              }

              p {
                margin: var(--size-8) 0 0;
                font-size: var(--size-14);
              }
            }
          }
        }
      }
    }
  }

  @media all and (min-width: 992px) {
    .videos {
      .list {
        flex-flow: row wrap;
        justify-content: space-between;

        .content {
          width: 45%;
        }
      }
    }
  }
</style>
