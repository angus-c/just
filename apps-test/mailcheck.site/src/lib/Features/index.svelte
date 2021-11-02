<script lang="ts">
  import { inview } from 'svelte-inview';
  import { inviewOptions } from '$utils/site-data';
  import mailFloat from '$lib/Features/mail-float.png?format=webp;png;avif&srcset';

  let intersecting: boolean;
</script>

<section
  id="features"
  class="features"
  class:intersecting
  use:inview={inviewOptions}
  on:enter={(event) => {
    const { inView } = event.detail;
    intersecting = inView;
  }}>
  <div class="section-heading sm-left">
    <h2 class="title">The Features</h2>
    <p class="section-title-lg">Features</p>
    <p class="section-subtitle">We improve our service everyday</p>
  </div>
  <div class="welcome-flex">
    <img class="mail" srcset={mailFloat} width="765" height="575" alt="mail" />
    <ul class="welcome-items">
      <li>
        <span class="digits">01</span>
        <p class="text-thin item">Turn your cold emails into a hot leads</p>
      </li>
      <li>
        <span class="digits">02</span>
        <p class="text-thin item">Validate emails through social networks</p>
      </li>
      <li>
        <span class="digits">03</span>
        <p class="text-thin item">
          Increase your delivery rate up to 5 times with our validation algorithm
        </p>
      </li>
      <li>
        <span class="digits">04</span>
        <p class="text-thin item">Spend less on outbound marketing</p>
      </li>
      <li>
        <span class="digits">05</span>
        <p class="text-thin item">Risk-free 40 days money-back guarantee</p>
      </li>
    </ul>
  </div>
</section>

<style lang="scss">
  .features {
    @include intersection;

    margin-top: 6rem;
  }

  .section-title-lg {
    text-transform: uppercase;
  }

  .welcome-flex {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    width: 100%;
    max-width: 80rem;
    margin: 4.69rem auto 0;
  }

  .mail {
    min-width: 10%;
    margin: var(--size-20) 0;
  }

  .welcome-items {
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    max-width: 25rem;
    list-style: none;
  }

  li {
    width: 100%;
    margin-bottom: var(--size-16);
  }

  .digits {
    color: var(--primary-accent);
    font-weight: var(--weight-900);
    font-size: var(--size-36);
    line-height: var(--size-42);
    letter-spacing: var(--size-2);
    opacity: 0.91;
  }

  .item {
    max-width: 21.56rem;
    margin: var(--size-6) 0 0 0;
    text-align: left;
  }

  @media only screen and (max-width: 1024px) {
    .mail {
      position: absolute;
      transform: translateY(-15%);
      opacity: 0.3;
    }

    .item {
      max-width: 64rem;
      margin: var(--size-6);
      font-size: var(--size-14);
      line-height: var(--size-22);
    }

    .welcome-items {
      width: 100%;
      max-width: 63.75rem;
      margin-left: var(--size-30);
      padding: 0;
    }

    .welcome-flex {
      flex-flow: row wrap;
      justify-content: center;
    }
  }

  @media only screen and (max-width: 768px) {
    .title {
      font-size: var(--size-24);
      line-height: var(--size-28);
      text-transform: uppercase;
    }

    .digits {
      margin-right: var(--size-10);
      font-size: var(--size-24);
      line-height: var(--size-28);
    }

    .mail {
      top: 0;
      right: -10%;
      z-index: -1;
      max-width: 150%;
      margin: 0 var(--size-10) 0 0;
      transform: translate(-5%, -30%);
    }

    .welcome-items {
      flex-flow: row wrap;
      max-width: 90%;
      margin-left: 0;
    }
    li {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-bottom: 0;
    }

    .welcome-flex {
      flex-flow: row wrap;
      justify-content: flex-start;
      margin-top: var(--size-10);
      margin-left: var(--size-30);
    }
  }

  @media only screen and (max-width: 425px) {
    .welcome-flex {
      margin-left: var(--size-16);
    }
  }
</style>
