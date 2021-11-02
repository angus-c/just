<script lang="ts">
  import { inview } from 'svelte-inview';
  import { inviewOptions } from '$utils/site-data';
  import arrowNav from '$lib/Pricing/arrow-slide-nav.svg';

  let intersecting: boolean;
  let slider: HTMLElement;
  let active = false;
  let startX: number;
  let scrollLeft: number;
  const SCROLL_SPEED = 4;
  const ITEMS_TO_SCROLL = 1;
  const SCROLL = ITEMS_TO_SCROLL * 340;
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
  id="pricing"
  class:intersecting
  use:inview={inviewOptions}
  on:enter={(event) => {
    const { inView } = event.detail;
    intersecting = inView;
  }}>
  <div class="section-heading sm-left">
    <h2 class="title">Cost-effective pricing plans</h2>
    <p class="section-title-lg">Pricing</p>
    <p class="section-subtitle">Choose wisely.</p>
  </div>
  <div class="wrapper-cost">
    <ul
      class="cards"
      class:active
      bind:this={slider}
      on:mousedown={onMouseDown}
      on:mouseup={onMouseUp}
      on:mouseleave={onMouseUp}
      on:mousemove={onMouseMove}>
      <li class="card" id="pro">
        <h3 class="title-colored">pro</h3>
        <span class="title lowercase">$10/mo</span>
        <span class="card-features-text"> 1,000 emails to validate included</span>
        <span class="card-features-text"> $0.005/1 mail overage charge</span>
        <a
          title="choose"
          target="_blank"
          rel="external"
          href="https://app.mailcheck.co/dashboard/payment_plans"
          class="btn btn-choose">choose</a>
      </li>
      <li class="card" id="agency">
        <h3 class="title-colored cyan">agency</h3>
        <span class="title lowercase">$30/mo</span>
        <span class="card-features-text"> 5,000 emails to validate included</span>
        <span class="card-features-text"> $0.004/1 mail overage charge</span>
        <a
          title="choose"
          target="_blank"
          rel="external"
          href="https://app.mailcheck.co/dashboard/payment_plans"
          class="btn btn-choose btn-cyan">choose</a>
      </li>
      <li class="card" id="enterprise">
        <h3 class="title-colored grey">enterprise</h3>
        <span class="title lowercase">$90/mo</span>
        <span class="card-features-text"> 20,000 emails to validate included</span>
        <span class="card-features-text"> $0.003/1 mail overage charge</span>
        <a
          title="choose"
          target="_blank"
          rel="external"
          href="https://app.mailcheck.co/dashboard/payment_plans"
          class="btn btn-choose btn-grey">choose</a>
      </li>
      <li class="card" id="custom">
        <h3 class="title-colored red">custom</h3>
        <span class="card-features-text">
          <span class="bold">Epic</span>
          100,000+ emails to validate included</span>
        <span class="card-features-text">
          <span class="bold">Legendary</span>
          1,000,000,000+ emails to validate included</span>
        <a
          href="https://calendly.com/fm--29/15min"
          rel="external nofollow"
          target="_blank"
          title="request a demo"
          class="btn btn-choose btn-red">request a demo</a>
      </li>
    </ul>
  </div>
  <div class="button button-next" on:click={onNext}>
    <img src={arrowNav} width="20" height="20" alt="right" />
  </div>
  <div class="button button-prev" on:click={onPrev}>
    <img src={arrowNav} width="20" height="20" alt="left" />
  </div>
</section>

<style lang="scss">
  #pricing {
    padding-bottom: var(--size-50);

    @include intersection;

    &::before {
      position: absolute;
      top: 10%;
      z-index: -1;
      width: 100%;
      height: 28.625rem;
      background: url('./lines.svg') no-repeat center;
      background-size: cover;
      transform: scaleX(-1);
      content: '';
    }

    %shadow {
      position: absolute;
      top: 0;
      bottom: 0;
      z-index: 9;
      display: block;
      width: 20%;
      height: 100%;
      content: '';
    }

    %shadows {
      &::before {
        @extend %shadow;
      }

      &::after {
        @extend %shadow;
      }

      @media only screen and (max-width: 768px) {
        &::before {
          left: 0;
          background-image: linear-gradient(90deg, #0a172e, rgba(10, 23, 46, 0));
        }

        &::after {
          right: 0;
          background-image: linear-gradient(-90deg, #0a172e, rgba(10, 23, 46, 0));
        }
      }
    }

    .section-heading {
      .section-subtitle {
        position: relative;
      }
    }

    .wrapper-cost {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      max-width: var(--size-880);
      margin: 0 auto;
      padding: 0;

      .cards {
        @extend %shadows;

        display: grid;
        grid-row-gap: 1rem;
        grid-column-gap: 1rem;
        grid-template-rows: 1fr;
        grid-template-columns: repeat(4, 12.5rem);
        height: 26.25rem;
        margin: 0 auto;
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
          scroll-behavior: revert;
        }

        &::-webkit-scrollbar {
          display: none;
        }

        .card {
          display: flex;
          flex: 0 0 auto;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          max-width: none;
          height: 21.625rem;
          margin: 0 var(--size-16);
          background-image: var(--card-bg-gradient);
          border-radius: var(--size-6);
          transition: all 1s;
          scroll-snap-align: start;

          &#custom .btn-choose {
            padding: var(--size-20) var(--size-10);
          }

          .bold {
            font-weight: var(--weight-700);
            text-transform: uppercase;
          }

          .btn-choose {
            z-index: 10;
            margin-bottom: var(--size-30);
            color: var(--pricing-plan-pro);
            background: var(--transparent);
            border: var(--size-1) solid var(--pricing-plan-border-pro);

            &:hover {
              color: var(--primary-white);
              background-color: var(--pricing-plan-pro);
              border-color: var(--pricing-plan-pro);
            }

            &:active {
              color: var(--pricing-plan-pro);
              background: var(--transparent);
              border-color: var(--pricing-plan-border-pro);
            }
          }

          .btn-cyan {
            color: var(--pricing-plan-agency);
            border-color: var(--pricing-plan-border-agency);

            &:hover {
              color: var(--primary-white);
              background-color: var(--pricing-plan-agency);
              border-color: var(--pricing-plan-agency);
            }

            &:active {
              color: var(--pricing-plan-agency);
              background: var(--transparent);
              border-color: var(--pricing-plan-border-agency);
            }
          }

          .btn-grey {
            color: var(--pricing-plan-enterprise);
            border-color: var(--pricing-plan-border-enterprise);

            &:hover {
              color: var(--primary-white);
              background-color: var(--pricing-plan-enterprise);
              border-color: var(--pricing-plan-enterprise);
            }

            &:active {
              color: var(--pricing-plan-enterprise);
              background: transparent;
              border-color: var(--pricing-plan-border-enterprise);
            }
          }

          .btn-red {
            color: var(--pricing-plan-custom);
            border-color: var(--pricing-plan-border-custom);

            &:hover {
              color: var(--primary-white);
              background-color: var(--pricing-plan-custom);
              border-color: var(--pricing-plan-custom);
            }

            &:active {
              color: var(--pricing-plan-custom);
              background: var(--transparent);
              border-color: var(--pricing-plan-border-custom);
            }
          }

          .card-features-text {
            max-width: 8.75rem;
            margin-bottom: var(--size-16);
            color: var(--primary-white);
            font-weight: var(--weight-100);
            font-size: var(--size-16);
            line-height: var(--size-20);
            letter-spacing: var(--letter-spacing);
            text-align: center;

            &:last-of-type {
              margin-bottom: var(--size-20);
            }
          }

          .lowercase {
            margin-bottom: var(--size-16);
            font-weight: var(--weight-400);
            font-size: var(--size-36);
            text-transform: lowercase;
          }

          .title-colored {
            margin: var(--size-16) 0 var(--size-6);
            color: var(--pricing-plan-pro);
            font-weight: var(--weight-700);
            font-size: var(--size-24);
            line-height: var(--size-50);
            letter-spacing: 0.075rem;
            text-align: center;
            text-transform: uppercase;
          }

          .cyan {
            color: var(--pricing-plan-agency);
          }

          .grey {
            color: var(--pricing-plan-enterprise);
          }

          .red {
            color: var(--pricing-plan-custom);
          }
        }
      }
    }

    .button {
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
  }

  @media only screen and (max-width: 1024px) {
    #pricing {
      .wrapper-cost {
        padding: var(--size-20);

        .cards {
          grid-template-columns: repeat(4, 45%);

          .card {
            position: relative;
            width: 100%;
          }
        }
      }
    }
  }

  @media only screen and (max-width: 992px) {
    #pricing {
      .button {
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

  @media only screen and (max-width: 768px) {
    #pricing {
      &::before {
        top: 100%;
      }

      .wrapper-cost {
        padding: var(--size-20);

        .cards {
          grid-template-columns: repeat(4, 30%);

          .card {
            position: relative;
            width: 100%;
            min-width: var(--size-150);
          }
        }
      }
    }
  }

  @media only screen and (max-width: 560px) {
    #pricing {
      padding: 0;

      .wrapper-cost {
        padding: 0;

        .cards {
          grid-template-columns: repeat(4, 90%);
        }
      }
    }
  }
</style>
