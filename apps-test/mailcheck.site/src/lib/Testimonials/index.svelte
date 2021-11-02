<script lang="ts">
  import { inview } from 'svelte-inview';
  import { inviewOptions } from '$utils/site-data';
  import k5Logo from '$lib/Testimonials/5k-logo.svg';
  import baglletLogo from '$lib/Testimonials/bagllet.svg';
  import sammyLogo from '$lib/Testimonials/sammy-logo.svg';
  import zitkaniLogo from '$lib/Testimonials/zitkani.svg';
  import echoLogo from '$lib/Testimonials/echo-logo.svg';
  import arrowNav from '$lib/Testimonials/arrow-slide-nav.svg';

  let intersecting;
  let slider;
  let active = false;
  let startX;
  let scrollLeft;
  const SCROLL_SPEED = 4; // DON'T CHANGE!!!
  const ITEMS_TO_SCROLL = 1;
  const SCROLL = ITEMS_TO_SCROLL * 420;
  const TIMEOUT = SCROLL_SPEED * 100;

  function deactivate(e: { target: any }) {
    setTimeout(() => {
      active = false;
      e.target.style.pointerEvents = 'auto';
    }, TIMEOUT);
  }

  function onPrev(e: { target: { style: { pointerEvents: string } } }) {
    e.target.style.pointerEvents = 'none';
    active = true;
    scrollLeft = slider.scrollLeft;
    slider.scrollLeft = scrollLeft - SCROLL;
    deactivate(e);
  }

  function onNext(e: { target: { style: { pointerEvents: string } } }) {
    e.target.style.pointerEvents = 'none';
    active = true;
    scrollLeft = slider.scrollLeft;
    slider.scrollLeft = scrollLeft + SCROLL;
    deactivate(e);
  }

  function onMouseDown(e: MouseEvent) {
    active = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  }

  function onMouseUp() {
    active = false;
  }

  function onMouseMove(e: MouseEvent) {
    if (!active) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * SCROLL_SPEED;
    slider.scrollLeft = scrollLeft - walk;
  }
</script>

<section
  class="testimonials"
  class:intersecting
  use:inview={inviewOptions}
  on:enter={(event) => {
    const { inView } = event.detail;
    intersecting = inView;
  }}>
  <div class="section-heading sm-left">
    <h2 class="title">Testimonials</h2>
    <p class="section-title-lg">Testimonials</p>
  </div>
  <div class="section-wrapper">
    <div class="testimonials-container">
      <ul
        class="testimonials-wrapper"
        class:active
        bind:this={slider}
        on:mousedown={onMouseDown}
        on:mouseup={onMouseUp}
        on:mouseleave={onMouseUp}
        on:mousemove={onMouseMove}>
        <li class="testimonial-slide">
          <div class="slider-item">
            <div class="slide-logo-wrapper">
              <img width="119" height="94" class="slide-logo" src={baglletLogo} alt="Bagllet" />
            </div>
            <p class="slide-text">
              Been using Mailcheck for about 6 months now. Tried other services before but decided
              to stay with Mailcheck as these guys are truly doing what they offer. I had a years
              old email list but after running it through a verification never thought that 20% of
              it would come back as invalid! No wonder why my sender score was so bad! Also, as an
              online-store owner, I really enjoyed the benefits of their API feature. And the
              cost..Absolutely worth it!
            </p>
            <p class="slide-name">Timofei G.</p>
          </div>
        </li>
        <li class="testimonial-slide">
          <div class="slider-item">
            <div class="slide-logo-wrapper">
              <img width="94" height="94" class="slide-logo" src={sammyLogo} alt="Sammy Icon" />
            </div>
            <p class="slide-text">
              "Probably one of the most comfortable validation services, simple in use.
            </p>
            <p class="slide-name">Nick A.</p>
          </div>
        </li>
        <li class="testimonial-slide">
          <div class="slider-item">
            <div class="slide-logo-wrapper">
              <img width="94" height="94" class="slide-logo" src={k5Logo} alt="5000 miles" />
            </div>
            <p class="slide-text">
              Name of the brand popped my attention, I decided to try because was planning to launch
              my marketing campaign, some leads were outdated, didn't want to blacklist my email
              account status and my domain, so went to Mailcheck. I can say honestly these guys
              kicking their A***s off to make sure their users receive what they paid for. Highly
              recommend!!!
            </p>
            <p class="slide-name">Vadim С.</p>
          </div>
        </li>
        <li class="testimonial-slide">
          <div class="slider-item">
            <div class="slide-logo-wrapper">
              <img width="150" height="88" class="slide-logo" src={zitkaniLogo} alt="Zitkani" />
            </div>
            <p class="slide-text">
              The file I have checked have been accepted by MailerLite, thank you! Your service did
              it better than 2 others I have tried before.
            </p>
            <p class="slide-name">Claude I.</p>
          </div>
        </li>
        <li class="testimonial-slide">
          <div class="slider-item">
            <div class="slide-logo-wrapper">
              <img width="150" height="88" class="slide-logo" src={echoLogo} alt="ECHO" />
            </div>
            <p class="slide-text">
              So far, the best mail validation service we tried. It doesn’t rely only on mx check
              (as the majority of cleaning tool does) but it retrieve data from social networks and
              many other sources to assign a score to a specific mail. Customer service is great.
              Very happy with Mailcheck
            </p>
            <p class="slide-name">Francesco E.</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="testimonials-button testimonials-button-next" on:click={onNext}>
      <img src={arrowNav} width="20" height="20" alt="right" />
    </div>
    <div class="testimonials-button testimonials-button-prev" on:click={onPrev}>
      <img src={arrowNav} width="20" height="20" alt="left" />
    </div>
  </div>
</section>

<style lang="scss">
  .testimonials {
    @include intersection;

    color: var(--primary-white);
  }

  .section-wrapper {
    position: relative;
  }

  .testimonials-container {
    position: relative;
    z-index: 1;
    width: 100%;
    overflow: hidden;
  }

  .testimonials-wrapper {
    display: grid;
    grid-row-gap: 1rem;
    grid-column-gap: 1rem;
    grid-template-rows: 1fr;
    grid-template-columns: repeat(5, 26.25rem);
    height: 23.75rem;
    margin-left: var(--size-10);
    padding: 0;
    overflow-x: scroll;
    touch-action: manipulation;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
    scroll-padding: 1rem;
    scrollbar-width: none;
    scrollbar-color: var(--transparent);

    &.active {
      scroll-snap-type: unset;
      scroll-behavior: smooth;
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .testimonial-slide {
    display: inline-block;
    width: 26.25rem;
    height: 23.75rem;
    font-size: var(--size-0);
    border-radius: var(--br-3);
    scroll-snap-align: start;
  }

  .slider-item {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    height: 20rem;
    padding: var(--size-30);
    background: url('./testimonial-slides-img.png') var(--gradient-4) no-repeat top 10% right 10%;
    border-radius: var(--size-6);
  }

  .slide-logo-wrapper {
    display: flex;
    align-items: center;
    height: 5.875rem;
    overflow: hidden;
  }

  .slide-logo {
    max-width: var(--size-150);
    max-height: 100%;
    padding: var(--size-6);
    text-align: center;
  }

  .slide-text {
    max-height: 8.125rem;
    margin-bottom: auto;
    padding-right: var(--size-16);
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 0.3em;
    }

    &::-webkit-scrollbar-track {
      background-color: var(--section-titles-color);
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--primary-accent);
      border: var(--size-2) solid var(--primary-accent);
      border-radius: var(--size-6);
    }
  }

  .slide-text,
  .slide-name {
    color: var(--primary-white);
    font-weight: var(--weight-400);
    font-size: var(--size-14);
    line-height: 1.714;
    text-align: left;
    text-indent: initial;
  }

  .slide-name {
    color: var(--primary-accent);
    font-style: italic;
  }

  .testimonials-button {
    position: absolute;
    top: 50%;
    width: var(--size-20);
    height: var(--size-20);
    transform: translateY(-50%);
    cursor: pointer;

    &-prev {
      left: -5%;

      & > img {
        transform: rotate(-180deg);
      }
    }

    &-next {
      right: -5%;
    }
  }

  @media all and (max-width: 768px) {
    .testimonials {
      .testimonials-container {
        &::before,
        &::after {
          position: absolute;
          top: 0;
          bottom: 0;
          z-index: 9;
          display: block;
          width: 20%;
          height: 100%;
          content: '';
          pointer-events: none;
        }

        &::before {
          left: 0;
          background-image: var(--slider-overlay-gradient-left);
        }

        &::after {
          right: 0;
          background-image: var(--slider-overlay-gradient-right);
        }
      }

      .testimonials-wrapper {
        padding: 0;
      }

      .slider-item {
        padding: var(--size-30) 6.25rem;
      }

      .testimonials-button {
        z-index: 10;

        &-prev {
          left: 5%;
        }

        &-next {
          right: 5%;
        }
      }
    }
  }
</style>
