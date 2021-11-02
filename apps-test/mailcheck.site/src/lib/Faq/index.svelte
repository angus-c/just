<script lang="ts">
  import { inview } from 'svelte-inview';
  import { inviewOptions } from '$utils/site-data';
  import filterIcon from '$lib/MdLayouts/FaqLayout/filter.png';

  let intersecting: boolean;
</script>

<section
  class="frequent-questions"
  class:intersecting
  use:inview={inviewOptions}
  on:enter={(event) => {
    const { inView } = event.detail;
    intersecting = inView;
  }}>
  <div class="wrapper-questions">
    <h3 class="title-small">FAQ</h3>

    <div class="accordion">
      <div class="accordion-column">
        <div class="tab">
          <input class="input-radio" type="checkbox" name="acc-tabs" />
          <span class="tab-label">Where do you get the data for verification?</span>
          <div class="tab-content">
            <p class="tab-text">
              We take the data from public sources, system search, social networks, and open
              databases available online.
            </p>
          </div>
        </div>

        <div class="tab">
          <input class="input-radio" type="checkbox" name="acc-tabs" />
          <span class="tab-label">How to interpret a trust rate?</span>
          <div class="tab-content">
            <p class="tab-text">
              * Emails with a trust rate of 0-49% are Risky and most likely INVALID, we don't
              recommend using them<br />
              * Emails with a trust rate of 50-100% are VALID, feel free to use them<br />
            </p>
          </div>
        </div>

        <div class="tab">
          <input class="input-radio" type="checkbox" name="acc-tabs" />
          <span class="tab-label">What is the delimiter and how to use it?</span>
          <div class="tab-content">
            <p class="tab-text">
              A delimiter is the comma character, which acts as a field delimiter, we ask to set it
              in order to validate the chosen column, NOTE it only has to be an email column
            </p>
          </div>
        </div>
      </div>

      <div class="accordion-column">
        <div class="tab">
          <input class="input-radio" type="checkbox" name="acc-tabs" />
          <span class="tab-label">Is my data protected?</span>
          <div class="tab-content">
            <p class="tab-text">
              All information about our users is protected by Google systems, we do really care
              about privacy and that's why never share any data due to the GDPR compliance.
            </p>
          </div>
        </div>

        <div class="tab">
          <input class="input-radio" type="checkbox" name="acc-tabs" />
          <span class="tab-label">How many free email verifications do you offer?</span>
          <div class="tab-content">
            <p class="tab-text">
              We allow 100 free email validations if the billing information was verified, and 10
              free email validations if the payment details weren't provided<br />
              - with card 100 emails<br />
              - without card 10 emails<br />
            </p>
          </div>
        </div>

        <div class="tab">
          <input class="input-radio" type="checkbox" name="acc-tabs" />
          <span class="tab-label">I was charged more than my plan costs</span>
          <div class="tab-content">
            <p class="tab-text">
              Mailcheck works on a subscription basis and if you have any of the paid plans (PRO,
              AGENCY, ENTERPRISE, LEGENDARY) so you are able to verify more emails than you have
              according to your plan, to receive more detailed information, please contact our
              support team
            </p>
          </div>
        </div>
      </div>
    </div>

    <a href="/faq" title="faq" class="btn btn-start">Learn More</a>

    <img class="filter-img" src={filterIcon} width="444" height="568" alt="filter" />
  </div>
</section>

<style lang="scss">
  .frequent-questions {
    @include intersection;

    .btn-start {
      color: var(--primary-white);
      text-transform: uppercase;
      background-color: var(--primary-accent);
      border: none;

      &:hover {
        color: var(--primary-accent);
        background-color: var(--primary-white);
      }

      &:active {
        color: var(--primary-white);
        background-color: var(--primary-accent);
      }
    }

    .accordion {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      margin: var(--size-50) var(--size-20) var(--size-50);
    }

    .accordion-column {
      width: 48%;
    }

    .filter-img {
      position: absolute;
      top: 75px;
      right: 0;
      z-index: -1;
      width: 27.75rem;
      height: auto;
      opacity: 0.1;
      pointer-events: none;
    }

    .input-radio {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 9;
      width: 100%;
      height: var(--size-40);
      cursor: pointer;
      opacity: 0;

      &:checked ~ .tab-content {
        height: auto;
        padding: var(--size-10) 0;
        overflow: hidden;
        visibility: visible;
        opacity: 1;
      }

      &:checked ~ .tab-label::after {
        transform: rotate(135deg);
      }

      &:checked ~ .tab-label {
        padding-bottom: var(--size-6);
      }
    }

    .tab {
      position: relative;
      margin-bottom: var(--size-14);
      border-bottom: var(--size-1) solid var(--dark-02);
    }

    .tab-content {
      height: 0;
      overflow: hidden;
      visibility: hidden;
      opacity: 0;
      transition: 0.35s ease-in-out;

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

    .tab-text {
      margin-top: 0;
      padding: 0 var(--size-10);
      color: var(--primary-white);
      font-weight: var(--weight-300);
      font-size: var(--size-16);
      letter-spacing: var(--letter-spacing-text);
      text-align: initial;
      text-indent: initial;
      word-break: break-word;
    }

    .tab-label {
      position: relative;
      display: block;
      box-sizing: border-box;
      width: 100%;
      padding: 0 var(--size-14) var(--size-14) var(--size-10);
      color: var(--primary-white);
      font-weight: var(--weight-500);
      font-size: var(--size-18);
      line-height: var(--size-24);
      letter-spacing: var(--letter-spacing);

      &::after {
        position: absolute;
        top: var(--size-10);
        right: 0;
        display: block;
        width: var(--size-6);
        height: var(--size-6);
        border-bottom: var(--size-1) solid var(--primary-accent);
        border-left: var(--size-1) solid var(--primary-accent);
        transform: rotate(-45deg);
        transition: all 0.5s ease;
        content: '';
      }
    }

    .title-small {
      width: 100%;
      color: var(--primary-white);
      font-weight: var(--weight-700);
      font-size: var(--size-32);
      line-height: var(--size-50);
      letter-spacing: var(--size-2);
      text-align: center;
      text-transform: uppercase;

      &::before {
        position: absolute;
        right: 0;
        left: 0;
        z-index: 0;
        display: block;
        width: 64rem;
        height: 10.625rem;
        margin: 0 auto;
        color: var(--section-titles-color);
        font-weight: var(--weight-900);
        font-size: var(--size-160);
        text-transform: uppercase;
        content: 'faq';
      }
    }

    .wrapper-questions {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: center;
      max-width: 80rem;
      margin: 0 auto;
      padding: 0 var(--size-20) 0;
    }
  }

  @media only screen and (max-width: 1024px) {
    .frequent-questions {
      .accordion {
        margin: 0 0 var(--size-50) 0;
      }

      .filter-img {
        transform: none;
      }

      .title-small::before {
        display: none;
      }
    }
  }

  @media only screen and (max-width: 768px) {
    .frequent-questions {
      .accordion {
        flex-direction: column;
        justify-content: start;
        max-width: 80%;
        margin: 0 0 var(--size-30) 0;
        padding: 0 var(--size-10);
      }

      .accordion-column {
        width: 100%;
      }

      .filter-img {
        width: 50%;
        min-width: 10%;
        max-width: 70%;
        margin-bottom: var(--size-24);
        transform: translateY(var(--size-50));
      }

      .wrapper-questions {
        justify-content: center;
        padding: 0 var(--size-20) var(--size-50);
      }
    }
  }
</style>
