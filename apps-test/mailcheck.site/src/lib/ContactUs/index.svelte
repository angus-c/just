<script lang="ts">
  import { inview } from 'svelte-inview';
  import { inviewOptions } from '$utils/site-data';
  import Progress from '$lib/Progress/index.svelte';

  let intersecting: boolean;
  let isValid: boolean;
  let email = '';
  let isOpen = false;
  let isError = false;
  let contactForm = {
    reset: () => {
      ('');
    }
  };
  let popUpBlock: HTMLElement;
  let nameValue = '';
  let textareaValue = '';
  let isSending = false;
  function validate() {
    return {
      update() {
        const reg =
          /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        return (isValid = reg.test(String(email).toLowerCase()));
      }
    };
  }
  const onClose = () => {
    isOpen = false;
    isError = false;
    isSending = false;
    isValid = false;
    document.body.classList.remove('fixed');
  };
  const onSubmit = async (e: Event) => {
    e.preventDefault();
    isSending = true;
    isValid = true;
    const referrerValue = document.referrer;
    const data = {
      name: nameValue,
      email,
      subject: textareaValue,
      referrer: referrerValue
    };

    try {
      await fetch('/api/sendMail', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      isOpen = true;
      contactForm.reset();
    } catch (e) {
      isOpen = true;
      isError = true;
      console.error(e);
    }

    document.body.classList.add('fixed');
    window.dataLayer?.push({
      eventCategory: 'site',
      eventAction: 'contactform',
      eventLabel: 'submit',
      eventValue: '',
      event: 'gaEvent'
    });
  };
</script>

<section
  class:intersecting
  id="contact-us"
  class="contact-us"
  use:inview={inviewOptions}
  on:enter={(event) => {
    const { inView } = event.detail;
    intersecting = inView;
  }}>
  <div class="container">
    <form class="contact-form" bind:this={contactForm} on:submit={onSubmit}>
      <h2 class="title title-contact">contact us</h2>
      <input
        class="input input-name"
        type="text"
        placeholder="Name"
        bind:value={nameValue}
        required />
      <input
        class="input input-email"
        type="text"
        bind:value={email}
        placeholder="Email"
        use:validate={email}
        class:invalid={!isValid}
        required />
      <textarea
        class="input input-message"
        bind:value={textareaValue}
        placeholder="Message"
        required />
      <button disabled={!isValid} class="btn btn-submit" type="submit">
        {#if isSending}
          <span class="progress-wrapper">
            <Progress />
          </span>
        {:else}
          submit
        {/if}
      </button>
    </form>
  </div>
</section>

<div class="popup-container" class:open={isOpen} on:click={onClose} bind:this={popUpBlock}>
  <div class="popup" class:open={isOpen}>
    <span class="popup-close success" />
    <span class="popup-thanks">Thanks for filling out our form!</span>
    <p class="popup-text">
      We will look over your message and get back to you by tomorrow. Your friends at MailCheck!
    </p>
  </div>
  <div class="popup" class:open={isError && isOpen}>
    <span class="popup-close error" />
    <span class="popup-thanks">Something went wrong!</span>
    <p class="popup-text">Please try again later</p>
  </div>
</div>

<style lang="scss">
  .contact-us {
    @include intersection;

    z-index: 100;
    padding: 4.6875rem 0 7.3125rem;

    .contact-form {
      display: flex;
      flex-direction: column;
      align-items: center;

      .input-email {
        &.invalid {
          color: var(--pricing-plan-custom);
        }
      }

      textarea.input {
        overflow: auto;

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

      .input-message {
        max-height: 7.5rem;
        margin-bottom: var(--size-30);
        resize: none;

        &::placeholder {
          color: var(--primary-white);
        }
      }

      .title-contact {
        margin-bottom: var(--size-50);

        &::before {
          position: absolute;
          right: 0;
          left: 0;
          z-index: -1;
          display: block;
          width: 64rem;
          height: 10.625rem;
          margin: 0 auto;
          color: var(--section-titles-color);
          font-weight: var(--weight-900);
          font-size: var(--size-160);
          text-transform: uppercase;
          content: 'contact';
        }
      }

      .btn-submit {
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
    }
  }

  @media only screen and (max-width: 768px) {
    .contact-us {
      padding: 0;
    }
  }

  @media only screen and (max-width: 1024px) {
    .contact-us {
      .title-contact::before {
        display: none;
      }
    }
  }

  // popup

  @keyframes fade-in {
    from {
      transform: scale(0.5);
      opacity: 0;
    }

    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes fade-out {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }

  @keyframes fade {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  .popup-container {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 6;
    display: none;
    width: 100%;
    height: 100%;
    background: url('../footer/assets/city-transparent.png') no-repeat center 50%;
    background-size: 150% 150%;

    &.open {
      display: flex;
      animation-name: fade;
      animation-duration: 1s;
      animation-fill-mode: forwards;
    }

    &::before {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: inherit;
      filter: blur(var(--size-20));
      content: '';
    }

    .popup {
      position: fixed;
      top: calc(50% - 9.875rem);
      right: 0;
      bottom: 0;
      left: 0;
      display: none;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      max-width: 40rem;
      height: 19.75rem;
      margin: 0 auto;
      color: var(--primary-white);
      background-image: var(--popup-bg-gradient);

      &.open {
        display: flex;
        animation-name: fade-in;
        animation-duration: 1s;
        animation-fill-mode: forwards;
      }

      .popup-close {
        position: absolute;
        top: var(--size-20);
        right: var(--size-20);
        display: block;
        width: var(--size-24);
        height: var(--size-24);
        cursor: pointer;

        &::before {
          position: relative;
          top: 10px;
          display: block;
          width: var(--size-24);
          height: 3px;
          background: var(--primary-white);
          transform: rotate(-45deg);
          content: '';
        }

        &::after {
          position: relative;
          top: 7px;
          right: 0;
          display: block;
          width: var(--size-24);
          height: 3px;
          background-color: var(--primary-white);
          transform: rotate(45deg);
          content: '';
        }
      }

      .popup-thanks {
        color: var(--primary-white);
        font-weight: var(--weight-700);
        font-size: var(--size-36);
        line-height: var(--size-40);
        letter-spacing: var(--size-2);
        text-align: center;
        text-transform: uppercase;
      }

      .popup-text {
        max-width: 32.5rem;
        color: var(--primary-white);
        font-weight: var(--weight-400);
        font-size: var(--size-16);
        letter-spacing: var(--letter-spacing);
        text-align: center;
      }
    }
  }

  @media only screen and (max-width: 480px) {
    .popup {
      .popup-thanks {
        margin-top: var(--size-20);
      }
    }
  }

  @media only screen and (max-width: 768px) {
    .popup {
      height: 100%;
      max-height: 16rem;
      margin: 0 var(--size-20);

      .popup-thanks {
        max-width: 95%;
        font-size: var(--size-24);
        line-height: var(--size-28);
      }

      .popup-text {
        max-width: 80%;
        font-size: var(--size-16);
      }
    }
  }
</style>
