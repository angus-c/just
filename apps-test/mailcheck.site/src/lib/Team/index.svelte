<script lang="ts">
  import { inview } from 'svelte-inview';
  import { inviewOptions } from '$utils/site-data';
  import SeregaAva from '$lib/Team/serega-karetnik.png?w=200&format=webp;png;avif&srcset';
  import KonstantinAva from '$lib/Team/konstantin-nosov.png?w=200&format=webp;png;avif&srcset';
  import FaraAva from '$lib/Team/fara-muhammadiev.png?w=200&format=webp;png;avif&srcset';

  let intersecting: boolean;
</script>

<section
  class="team"
  class:intersecting
  use:inview={inviewOptions}
  on:enter={(event) => {
    const { inView } = event.detail;
    intersecting = inView;
  }}>
  <div class="container">
    <div class="section-wrapper">
      <div class="section-heading sm-left">
        <h2 class="title">Mailcheck team</h2>
        <p class="section-title-lg">Team</p>
      </div>
      <div class="team-members">
        <div class="team-member csm">
          <div class="team-member-avatar">
            <img srcset={SeregaAva} alt="csm" class="avatar" />
          </div>
          <div class="team-member-info">
            <p class="team-member-name">Serhii Karetnyk</p>
            <p class="team-member-description">CSM</p>
          </div>
        </div>
        <div class="team-member cto">
          <div class="team-member-avatar">
            <img srcset={KonstantinAva} alt="cto" class="avatar" />
          </div>
          <div class="team-member-info">
            <p class="team-member-name">Konstantin Nosov</p>
            <p class="team-member-description">CTO / Founder</p>
          </div>
        </div>
        <div class="team-member own">
          <div class="team-member-avatar">
            <img srcset={FaraAva} alt="own" class="avatar" />
          </div>
          <div class="team-member-info">
            <p class="team-member-name">Fara Muhammadiev</p>
            <p class="team-member-description">Product Owner</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style lang="scss">
  .team {
    @include intersection;

    margin-top: 6rem;
    padding-bottom: var(--size-50);

    .team-members {
      display: flex;
      justify-content: space-between;
      padding-top: 4.375rem;
    }

    .team-member {
      display: flex;
      flex-basis: 33.33%;
      flex-direction: column;
      align-items: center;
    }

    .team-member-avatar {
      position: relative;
      width: 18vw;
      max-width: 12.5rem;
      height: 18vw;
      max-height: 12.5rem;
      overflow: hidden;
      background-color: var(--dark-02);
      border-radius: var(--size-10);
      transform: rotate(45deg);

      .avatar {
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 100%;
        height: 100%;
        transform: rotate(-45deg) scale(1.42);
      }
    }

    .team-member-info {
      text-align: center;
    }

    .team-member-name {
      margin-bottom: 0;
      padding-top: var(--size-50);
      color: var(--primary-white);
      font-weight: var(--weight-700);
      font-size: var(--size-20);
      line-height: 1.2;
      text-indent: initial;
    }

    .team-member-description {
      margin-top: var(--size-10);
      color: var(--primary-white);
      font-size: var(--size-16);
      line-height: 1.5;
      text-indent: initial;
    }
  }

  @media all and (max-width: 600px) {
    .team {
      margin-top: 0;

      .team-members {
        flex-direction: column;
        align-items: flex-start;
        padding-top: var(--size-16);
      }

      .team-member {
        flex-direction: row;

        &.csm,
        &.own {
          padding-left: 10%;
        }

        &.csm {
          margin-bottom: 2.2rem;
        }
        &.own {
          margin-top: 2.2rem;
        }
      }

      .cto {
        &.team-member {
          padding-left: 3.5rem;
        }

        .team-member-info {
          margin-left: 0.5rem;
        }
      }

      .team-member-info {
        margin-left: 1rem;
        text-align: left;
      }

      .team-member-avatar {
        left: -2rem;
        min-width: 6.875rem;
        min-height: 6.875rem;
      }

      .team-member-name {
        padding-top: 0;
      }
    }
  }
</style>
