<script lang="ts">
  import { inview } from 'svelte-inview';
  import { inviewOptions } from '$utils/site-data';

  let intersecting: boolean;
</script>

<section
  class="choose-your"
  class:intersecting
  use:inview={inviewOptions}
  on:enter={(event) => {
    const { inView } = event.detail;
    intersecting = inView;
  }}>
  <div class="container">
    <div class="section-heading sm-left">
      <h2 class="title">Why do you choose mailcheck?</h2>
      <p class="section-title-lg">YOU CAN</p>
    </div>
    <div class="wrapper-choose">
      <p class="text-thin art">
        We are a team that validates emails and phones using social networks for the past 3 years.
        Previously, we did it manually and it took from 3 weeks to a year, but at the moment it
        takes from us only 15 minutes to check 1 000 000 email addresses.
      </p>
      <p class="text-thin art">
        Our service will be useful to those who are working every day to increase conversion in
        email mailings and want to decrease bounce rate. We will also be useful to those who want to
        know who is behind that email or phone in order to save their time and money.
      </p>
    </div>
  </div>
</section>

<style lang="scss">
  .choose-your {
    @include intersection;
  }

  .art {
    width: 49%;
    max-width: 32.5rem;
    margin: 0;
    text-align: left;
  }

  .wrapper-choose {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: var(--size-880);
    margin: 0 auto 5.94rem;
  }

  @media only screen and (max-width: 768px) {
    .art {
      width: 100%;
      max-width: 43.75rem;
      margin: 0 0 1.562rem 0;
      overflow: hidden;
    }

    .wrapper-choose {
      position: relative;
      flex-flow: column nowrap;
      align-items: flex-start;
      justify-content: center;
      height: auto;
      margin-bottom: var(--size-50);
    }

    .choose-your {
      &::before {
        top: -43%;
        left: 0;
        background-position: center left 40%;
        background-size: auto;
      }

      .title {
        margin-bottom: var(--size-6);
        text-transform: uppercase;
      }
    }
  }
</style>
