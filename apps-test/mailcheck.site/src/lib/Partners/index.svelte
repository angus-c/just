<script lang="ts">
  import { inview } from 'svelte-inview';
  import { inviewOptions } from '$utils/site-data';
  import acellLogo from '$lib/Partners/acell-mail.svg';
  import k5Logo from '$lib/Partners/5k-logo.svg';
  import baglletLogo from '$lib/Partners/bagllet.svg';
  import sammyLogo from '$lib/Partners/sammy-logo.svg';
  import zitkaniLogo from '$lib/Partners/zitkani.svg';
  import echoLogo from '$lib/Partners/echo-logo.svg';

  let intersecting: boolean;
</script>

<section
  class="partners"
  class:intersecting
  use:inview={inviewOptions}
  on:enter={(event) => {
    const { inView } = event.detail;
    intersecting = inView;
  }}>
  <div class="section-heading sm-left">
    <h2 class="title">You’re in good company</h2>
    <p class="section-title-lg">Partners</p>
  </div>
  <div class="partners-list">
    <div class="partners-list-item">
      <img width="150" height="60" src={k5Logo} alt="5000 miles" class="partners-logo" />
    </div>
    <div class="partners-list-item">
      <img width="150" height="60" src={baglletLogo} alt="Bagllet" class="partners-logo" />
    </div>
    <div class="partners-list-item">
      <img width="150" height="19" src={acellLogo} alt="Acell Mail" class="partners-logo" />
    </div>
    <div class="partners-list-item">
      <img width="150" height="60" src={sammyLogo} alt="Sammy-logo" class="partners-logo" />
    </div>
    <div class="partners-list-item">
      <img width="150" height="60" src={zitkaniLogo} alt="Zitkani" class="partners-logo" />
    </div>
    <div class="partners-list-item">
      <img width="150" height="60" src={echoLogo} alt="ECHO" class="partners-logo" />
    </div>
  </div>
</section>

<style lang="scss">
  .partners {
    @include intersection;

    padding-bottom: var(--size-50);
  }

  .partners-list {
    position: relative;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
  }

  .partners-list-item {
    width: var(--size-150);
    margin: var(--size-20);
    padding: var(--size-6);
    text-align: center;

    & > img {
      max-height: var(--size-60);
    }
  }

  @media all and (max-width: 768px) {
    .partners-list-item {
      flex: 1 1 6.25rem;
      margin: var(--size-10);
    }
  }
</style>
