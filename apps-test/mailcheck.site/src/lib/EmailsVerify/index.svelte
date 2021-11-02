<script lang="ts">
  import Progress from '$lib/Progress/index.svelte';
  import { inview } from 'svelte-inview';
  import { inviewOptions } from '$utils/site-data';
  import arrowIcon from '$lib/EmailsVerify/icon-arrow-right.svg';

  export let isChecking = false;
  export let isChecked = false;
  export let validityClass = '';

  let intersecting: boolean;
  let emailResult = '';
  let existsResult = '';
  let smtpResult = '';
  let disposableResult = '';
  let catchResult = '';
  let validityEmailRisk = '';
  let emailInput = '';
  let rateResult = '';
  let loader = false;
  let result = false;
  const reset = () => {
    isChecking = false;
    isChecked = false;
  };
  const keyup = (e: KeyboardEvent) => {
    if (e.target.value === '') reset();
  };
  let links;
  let socialLinks = [
    {
      href: null,
      title: 'gravatar',
      className: 'gravatar'
    },
    {
      href: null,
      title: 'blogger',
      className: 'blogger'
    },
    {
      href: null,
      title: 'facebook',
      className: 'facebook'
    },
    {
      href: null,
      title: 'foursquare',
      className: 'foursquare'
    },
    {
      href: null,
      title: 'google',
      className: 'google'
    },
    {
      href: null,
      title: 'github',
      className: 'github'
    },
    {
      href: null,
      title: 'linkedin',
      className: 'linkedin'
    },
    {
      href: null,
      title: 'tripit',
      className: 'tripit'
    },
    {
      href: null,
      title: 'tumblr',
      className: 'tumblr'
    },
    {
      href: null,
      title: 'twitter',
      className: 'twitter'
    },
    {
      href: null,
      title: 'vimeo',
      className: 'vimeo'
    },
    {
      href: null,
      title: 'wordpress',
      className: 'wordpress'
    },
    {
      href: null,
      title: 'youtube',
      className: 'youtube'
    }
  ];

  type fetchData = {
    email: string;
    trustRate: number;
    mxExists: boolean;
    smtpExists: boolean;
    isNotSmtpCatchAll: boolean;
    isNotDisposable: boolean;
    gravatar: {
      entry: [
        {
          profileUrl: string;
          preferredUsername: string;
          accounts: [
            {
              domain: string;
              shortname:
                | 'facebook'
                | 'wordpress'
                | 'vimeo'
                | 'foursquare'
                | 'tripit'
                | 'tumblr'
                | 'twitter';
              username: string;
              userid: string;
              url: string;
              verified: boolean;
            }
          ];
        }
      ];
    };
    githubUsername: string;
  };

  const verifyEmailFormSubmit = async () => {
    isChecking = true;
    result = true;
    loader = true;
    try {
      const response = await fetch('/api/checkMail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: emailInput
        })
      });
      const data: fetchData = await response.json();
      const exist = data.mxExists ? '+' : '-';
      const smpt = data.smtpExists ? '+' : '-';
      const disposable = data.isNotDisposable ? '+' : '-';
      const catchAll = data.isNotSmtpCatchAll ? '+' : '-';
      emailResult = data.email;
      existsResult = exist;
      smtpResult = smpt;
      rateResult = data?.trustRate.toString() ?? '0';
      disposableResult = disposable;
      catchResult = catchAll;

      const gravatar = data.gravatar && data.gravatar.entry && data.gravatar.entry[0];

      links = (gravatar?.accounts ?? []).reduce(
        (acc, el) => {
          acc[el.shortname] = el.url;
          return acc;
        },
        { gravatar: gravatar?.profileUrl ?? '' }
      );

      socialLinks = socialLinks.map((link) => {
        const id = link.title.toLowerCase();
        if (links[id]) {
          link.href = links[id];
          link.className = `${link.className}`;
          return link;
        } else {
          link.href = null;
          return link;
        }
      });

      if (data.trustRate <= 49 || response.status >= 400) {
        validityEmailRisk = 'invalid';
        validityClass = 'error';
      } else if (data.trustRate > 49 && data.trustRate < 80) {
        validityEmailRisk = 'risky but deliverable';
        validityClass = 'warning';
      } else {
        validityEmailRisk = 'valid';
        validityClass = 'success';
      }
      loader = false;
      isChecked = true;
      reset();
    } catch (e) {
      loader = false;
      (e) => console.error(e);
    }
  };
  const closeBtn = () => {
    result = false;
    loader = false;
  };
</script>

<div
  class="container"
  class:intersecting
  use:inview={inviewOptions}
  on:enter={(event) => {
    const { inView } = event.detail;
    intersecting = inView;
  }}>
  <div class="wrapper-main sm-left">
    <h1 class="title">Validate your mailing list in one click</h1>
    <p class="main-text">
      Get assured your mailing list contains only real emails addresses, get rid of bots and
      inactive users
    </p>
    <div class="emails-block">
      <div class="main-buttons">
        <a rel="external" href="https://app.mailcheck.co/" target="_blank" class="btn btn-live-demo"
          >Get free emails now</a>
        <a rel="external" href="https://app.mailcheck.co/" target="_blank" class="btn btn-start"
          >Start</a>
      </div>
      <div class="verify-email">
        <p class="verify-email-title">Verify email address in real-time!</p>
        <form
          class="verify-email-form"
          id="verify-email"
          on:submit|preventDefault={verifyEmailFormSubmit}>
          <div class="email-block">
            <input
              class="input input-verify"
              type="email"
              name="email"
              id="email"
              placeholder="Email to verify"
              bind:value={emailInput}
              on:keyup={keyup} />
            {#if isChecking && !isChecked}
              <div class="progress-wrapper">
                <Progress />
              </div>
            {:else}
              <button type="submit" class="btn-verify-email">
                <img src={arrowIcon} width="20" height="16" alt="Verify email" />
              </button>
            {/if}
          </div>
          <div class="email-results" class:result>
            {#if loader}
              <div class="form-preloader" />
            {/if}
            <p class="results-title">
              Validation RESULTS -
              <span id="email-risk" class={validityClass}>
                {validityEmailRisk}
              </span>
            </p>
            <ul class="results-list">
              <ul class="list-left">
                <li class="list-item email">
                  <p class="list-item-title">Checked email:</p>
                  <p id="email-result" class="list-item-result">
                    {emailResult}
                  </p>
                </li>
                <li class="list-item exists">
                  <p class="list-item-title">Exists:</p>
                  <p id="exists-result" class="list-item-result">
                    {existsResult}
                  </p>
                </li>
                <li class="list-item smtp">
                  <p class="list-item-title">SMTP:</p>
                  <p id="smtp-result" class="list-item-result">
                    {smtpResult}
                  </p>
                </li>
              </ul>

              <ul class="list-right">
                <li class="list-item rate">
                  <p class="list-item-title">Trust rate:</p>
                  <p id="rate-result" class="list-item-result">
                    {rateResult}
                  </p>
                </li>
                <li class="list-item disposable">
                  <p class="list-item-title">Is Not Disposable:</p>
                  <p id="disposable-result" class="list-item-result">
                    {disposableResult}
                  </p>
                </li>
                <li class="list-item smpt-ca">
                  <p class="list-item-title">Is Not SMTP catch-all:</p>
                  <p id="catch-result" class="list-item-result">
                    {catchResult}
                  </p>
                </li>
              </ul>
            </ul>
            <div class="results-icons">
              {#each socialLinks as link}
                {#if typeof link.href === 'string'}
                  <a
                    href={link.href}
                    target="_blank"
                    rel="external"
                    class={`social-link active ${link.className}`}
                    title={link.title}>&nbsp;</a>
                {:else}
                  <span class={`social-link ${link.className}`} title={link.title}>&nbsp;</span>
                {/if}
              {/each}
            </div>
            <button type="button" id="close-btn" class="close-results" on:click={closeBtn} />
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @keyframes pulse-blue {
    from {
      transform: scale(0.5);
      opacity: 1;
    }

    to {
      transform: scale(3);
      opacity: 0;
    }
  }

  .container {
    @include intersection;
  }

  .wrapper-main {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: 4.375rem 0 var(--size-50);
  }

  .title {
    max-width: 23.75rem;

    &::before {
      display: none;
    }
  }

  .main-text {
    z-index: 1;
    max-width: 23.75rem;
    margin: 0 0 var(--size-40);
    color: var(--primary-white);
    font-size: var(--size-14);
    line-height: var(--size-22);
    letter-spacing: var(--letter-spacing);
    text-align: left;
    text-indent: initial;
  }

  .emails-block {
    width: 100%;
    max-width: 26.75rem;
  }

  .main-buttons {
    display: flex;
    min-height: 3.25rem;
    margin-bottom: var(--size-22);
  }

  .btn {
    font-size: var(--size-16);
  }

  .btn-live-demo {
    z-index: 1;
    width: 100%;
    margin-right: var(--size-20);
    color: var(--primary-white);
    text-transform: uppercase;
    text-decoration: none;
    background: var(--transparent);
    border: var(--size-1) solid var(--dark-05);

    &:hover {
      border-color: var(--primary-white);
    }

    &:active {
      border-color: var(--dark-05);
    }
  }

  .btn-start {
    z-index: 1;
    color: var(--primary-white);
    background-color: var(--primary-accent);
    border: none;

    &:hover {
      color: var(--primary-accent);
      text-decoration: none;
      background-color: var(--primary-white);
    }

    &:active {
      color: var(--primary-white);
      background-color: var(--primary-accent);
    }
  }

  .verify-email-title {
    color: var(--primary-white);
    font-weight: var(--weight-400);
    font-size: var(--size-18);
    line-height: var(--size-28);
    letter-spacing: var(--letter-spacing);
    text-align: center;
    text-indent: initial;
  }

  .email-block {
    position: relative;
  }

  .input-verify {
    position: relative;
    margin-bottom: var(--size-8);
    padding: var(--size-20) var(--size-46) var(--size-18) var(--size-16);
    background-color: var(--dark-01);
    border-color: var(--transparent);
    border-radius: 0.25rem;

    &::placeholder {
      color: var(--dark-02);
      font-size: var(--size-16);
      font-style: italic;
      letter-spacing: var(--letter-spacing);
    }

    &:focus {
      font-weight: var(--weight-500);
      background-color: var(--dark-05);
      box-shadow: 0 0 0 var(--size-1) var(--primary-white) inset;
    }
  }

  .progress-wrapper {
    position: absolute;
    top: var(--size-2);
    right: var(--size-6);
  }

  .btn-verify-email {
    position: absolute;
    top: var(--size-8);
    right: var(--size-6);
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--size-38);
    height: var(--size-36);
    background-color: var(--color-progress);
    border: none;
    border-radius: var(--size-6);
    transition: 0.35s;

    &:hover {
      transform: translateX(var(--size-2));
    }
  }

  .email-results {
    position: relative;
    display: none;
    padding: var(--size-18) var(--size-16);
    color: var(--primary-white);
    background-color: var(--dark-02);
    border-radius: 0.25rem;

    &.result {
      display: block;
    }
  }

  .form-preloader {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    background-color: var(--gradient-4);
    opacity: 0.98;
    content: '';

    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 1;
      width: 6.25rem;
      height: 6.25rem;
      background-image: url('./preloader-bars.svg');
      background-repeat: no-repeat;
      background-position: center center;
      transform: translate(-50%, -50%);
      content: '';
    }
  }

  .results-title {
    margin-top: 0;
    color: var(--primary-white);
    font-weight: var(--weight-700);
    font-size: var(--size-18);
    line-height: 1.2;
    letter-spacing: var(--letter-spacing);
    text-transform: uppercase;
    text-indent: initial;

    #email-risk {
      &.error {
        color: var(--color-important);
      }

      &.warning {
        color: var(--color-warning);
      }

      &.success {
        color: var(--color-success);
      }
    }
  }

  .results-list {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-between;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .list-left {
    margin: 0;
    padding: 0;
  }

  .list-item {
    display: flex;
    align-items: center;
    font-size: var(--size-12);
  }

  .list-item-title {
    min-width: 5.3125rem;
    margin-bottom: 0;
    padding-right: var(--size-10);
    color: var(--primary-white);
    text-indent: initial;
  }

  .list-item-result {
    margin-bottom: 0;
    color: var(--primary-white);
    text-indent: initial;
  }

  .list-right {
    margin: 0;
    padding: 0;
  }

  .results-icons {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: var(--size-10) 0 0;

    .social-link {
      width: var(--size-30);
      height: var(--size-30);
      margin: var(--size-6);
      background: 50% no-repeat;
      background-size: contain;
      opacity: 0.2;
      filter: grayscale(1);
      pointer-events: none;

      &.active {
        cursor: pointer;
        opacity: 1;
        filter: none;
        pointer-events: all;
      }

      &.gravatar {
        background-image: url('./gravatar.svg');
      }

      &.blogger {
        background-image: url('./blogger.svg');
      }

      &.facebook {
        background-image: url('./facebook.svg');
      }

      &.foursquare {
        background-image: url('./foursquare.svg');
      }

      &.google {
        background-image: url('./google.svg');
      }

      &.linkedin {
        background-image: url('./linkedin.svg');
      }

      &.tripit {
        background-image: url('./tripit.svg');
      }

      &.tumblr {
        background-image: url('./tumblr.svg');
      }

      &.twitter {
        background-image: url('./twitter.svg');
      }

      &.vimeo {
        background-image: url('./vimeo.svg');
      }

      &.wordpress {
        background-image: url('./wordpress.svg');
      }

      &.youtube {
        background-image: url('./youtube.svg');
      }

      &.github {
        background-image: url('./github.svg');
      }
    }
  }

  .close-results {
    position: absolute;
    top: var(--size-28);
    right: var(--size-16);
    width: var(--size-12);
    height: var(--size-12);
    background-color: var(--transparent);
    border: none;
    outline: none;

    &:focus {
      border: none;
      outline: none;
    }

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: var(--size-2);
      background-color: var(--primary-white);
      transform: rotate(45deg);
      content: '';
    }

    &::after {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: var(--size-2);
      background-color: var(--primary-white);
      transform: rotate(-45deg);
      content: '';
    }
  }

  @media (min-width: 728px) {
    .wrapper-main {
      padding: 4.375rem 0 13.75rem;
    }

    .title {
      z-index: 1;
      max-width: 33.125rem;
      font-size: var(--size-38);

      &::before {
        position: absolute;
        top: 6.875rem;
        right: 0;
        left: 0;
        z-index: -1;
        display: block;
        width: 64rem;
        height: 10.3125rem;
        margin: 0 auto;
        color: var(--section-titles-color);
        font-weight: var(--weight-700);
        font-size: var(--size-150);
        text-transform: uppercase;
        content: 'mailcheck';
      }
    }

    .main-text {
      max-width: 33.75rem;
      font-size: var(--size-18);
      line-height: var(--size-28);
      text-align: center;
    }
  }

  @media all and (max-width: 768px) {
    .btn {
      font-size: var(--size-14);
    }
  }
</style>
