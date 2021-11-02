<script lang="ts">
  import esLogo from '$lib/Footer/assets/es-logo.svg';
  import mailcheckLogo from '$lib/Footer/assets/mailcheck-logo.svg';
  import iconTwitter from '$lib/Footer/assets/icon-twitter.svg';
  import iconFacebook from '$lib/Footer/assets/icon-facebook.svg';
  import iconLinkedin from '$lib/Footer/assets/icon-linkedin.svg';
  import iconGitHub from '$lib/Footer/assets/icon-github.svg';
  import iconYoutube from '$lib/Footer/assets/youtube-light.svg';
  import iconMoneyBack from '$lib/Footer/assets/icon-money-back.svg';
  import iconRSS from '$lib/Footer/assets/rss.svg';

  export let footerBg = true;
</script>

<footer class="footer">
  {#if footerBg}
    <div class="footer-bg" />
  {/if}
  <div class="container">
    <div class="footer-top">
      <div class="footer-logo-copyright">
        <a class="logo2" href="/" title="logo">
          <img src={mailcheckLogo} width="162" height="27" alt="logo2" /></a>
        <address class="footer-address">
          Suite 4005 43 Bedford Street,<br />
          London, England, WC2E 9HA
        </address>
      </div>
      <div class="footer-nav nav-affiliate">
        <a
          rel="external"
          target="_blank"
          class="nav-link footer-nav-link"
          title="Refer a friend"
          href="https://app.mailcheck.co/auth/login">Refer a friend</a>
        <a class="nav-link footer-nav-link" title="For affiliates" href="/affiliates"
          >For affiliates</a>
      </div>

      <nav class="footer-nav" role="navigation">
        <a class="nav-link footer-nav-link" title="features" href="/#features">Features</a>
        <a class="nav-link footer-nav-link" title="pricing" href="/#pricing">Pricing</a>
        <a class="nav-link footer-nav-link" title="contact us" href="/#contact-us">Contact Us</a>
        <a class="nav-link footer-nav-link" title="blog" href="/blog">Blog</a>
        <a
          class="nav-link footer-nav-link"
          href="/l/docs#tag--email"
          rel="external"
          title="API"
          target="_blank">API</a>
        <a class="nav-link footer-nav-link" title="Privacy policy" href="/privacy"
          >Privacy policy</a>
        <a class="nav-link footer-nav-link" title="Terms and conditions" href="/terms"
          >Terms and conditions</a>
        <a class="nav-link footer-nav-link" title="Cookie policy" href="/cookies">Cookie policy</a>
        <a class="nav-link footer-nav-link" title="Video tutorials" href="/videos"
          >Video tutorials</a>
        <a
          rel="external"
          target="_blank"
          title="Product of NodeArt"
          class="nav-link footer-nav-link"
          href="/l/na">Product of NodeArt</a>
      </nav>
      <div class="footer-social-mobile">
        <a
          href="/l/fb"
          target="_blank"
          rel="external"
          title="Facebook page"
          class="footer-social-link">
          <img
            width="18"
            height="18"
            class="footer-social-icon"
            src={iconFacebook}
            alt="Facebook" />
        </a>
        <a
          href="/l/linkedin"
          target="_blank"
          rel="external"
          title="LinkedIn page"
          class="footer-social-link">
          <img
            width="18"
            height="18"
            class="footer-social-icon"
            src={iconLinkedin}
            alt="LinkedIn" />
        </a>
        <a
          href="/l/youtube"
          target="_blank"
          rel="external"
          title="Youtube channel"
          class="footer-social-link">
          <img width="18" height="18" class="footer-social-icon" src={iconYoutube} alt="Youtube" />
        </a>
        <a
          href="/l/twitter"
          target="_blank"
          rel="external"
          title="Twitter page"
          class="footer-social-link">
          <img width="18" height="18" class="footer-social-icon" src={iconTwitter} alt="Twitter" />
        </a>
        <a
          href="/l/github"
          target="_blank"
          rel="external"
          title="GitHub page"
          class="footer-social-link">
          <img width="18" height="18" class="footer-social-icon" src={iconGitHub} alt="GitHub" />
        </a>
        <a href="/rss.xml" class="footer-social-link">
          <img width="18" height="18" class="footer-social-icon" src={iconRSS} alt="LinkedIn" />
        </a>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-info left">
        <div class="footer-info-item">
          <img class="footer-info-logo" width="36" height="36" src={esLogo} alt="logo" />
          <p class="footer-info-text">
            GDPR Compliant<br />
            We will never share your data.
          </p>
        </div>
        <div class="footer-info-item">
          <img
            class="footer-info-logo"
            width="36"
            height="36"
            src={iconMoneyBack}
            alt="40 days money-back guarantee" />
          <p class="footer-info-text">
            40 days<br />
            money-back guarantee
          </p>
        </div>
      </div>
      <div class="footer-info right">
        <span class="copyright2">&#x24B8; 2017-{new Date().getUTCFullYear()} Mailcheck</span>
        <div class="footer-social">
          <a
            href="/l/fb"
            target="_blank"
            rel="external"
            title="Facebook page"
            class="footer-social-link">
            <img
              width="18"
              height="18"
              class="footer-social-icon"
              src={iconFacebook}
              alt="Facebook" />
          </a>
          <a
            href="/l/linkedin"
            target="_blank"
            rel="external"
            title="LinkedIn page"
            class="footer-social-link">
            <img
              width="18"
              height="18"
              class="footer-social-icon"
              src={iconLinkedin}
              alt="LinkedIn" />
          </a>
          <a
            href="/l/yt"
            target="_blank"
            rel="external"
            title="Youtube channel"
            class="footer-social-link">
            <img
              width="18"
              height="18"
              class="footer-social-icon"
              src={iconYoutube}
              alt="Youtube" />
          </a>
          <a
            href="/l/twitter"
            target="_blank"
            rel="external"
            title="Twitter page"
            class="footer-social-link">
            <img
              width="18"
              height="18"
              class="footer-social-icon"
              src={iconTwitter}
              alt="Twitter" />
          </a>
          <a
            href="/l/github"
            target="_blank"
            rel="external"
            title="GitHub page"
            class="footer-social-link">
            <img width="18" height="18" class="footer-social-icon" src={iconGitHub} alt="GitHub" />
          </a>
          <a href="/rss.xml" class="footer-social-link">
            <img width="18" height="18" class="footer-social-icon" src={iconRSS} alt="LinkedIn" />
          </a>
        </div>
      </div>
    </div>
  </div>
</footer>

<style lang="scss">
  .footer {
    position: relative;
    padding-top: 6.25rem;
    background: var(--footer-gradient);
  }

  .footer-bg::before {
    position: absolute;
    display: block;
    width: 100%;
    height: 64rem;
    background: url('assets/city-transparent.png') no-repeat center;
    background-size: cover;
    transform: translateY(-105%);
    opacity: 0.4;
    content: '';
    pointer-events: none;
  }

  .footer-top {
    display: flex;
    justify-content: space-between;
    padding-bottom: var(--size-36);
  }

  .footer-logo-copyright {
    display: flex;
    flex-basis: 50%;
    flex-direction: column;
    align-content: center;
  }

  .footer-address {
    max-width: 15.3rem;
    margin-top: var(--size-36);
    color: var(--primary-white);
    font-weight: var(--weight-400);
    font-size: var(--size-14);
    font-style: normal;
    letter-spacing: var(--letter-spacing);
    opacity: 0.5;
  }

  img {
    max-width: fit-content;
  }

  .footer-nav {
    display: flex;
    flex-basis: 33%;
    flex-flow: column wrap;
    align-items: flex-start;
    max-height: 10.625rem;

    &.nav-affiliate {
      flex-basis: 15%;
    }
  }

  .footer-nav-link {
    margin: 0 0 var(--size-16) 0;

    &:hover {
      text-decoration: none;
    }
  }

  .footer-social-mobile {
    display: none;
  }

  .footer-social-link {
    display: inline-block;
    margin-left: var(--size-16);
  }

  .footer-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--size-30) 0 var(--size-50);
    border-top: var(--size-2) solid var(--footer-divider-border);
  }

  .footer-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .footer-info-item {
    display: flex;
    align-items: center;
  }

  .footer-info-logo {
    max-width: var(--size-36);
    max-height: var(--size-36);
    margin-right: var(--size-16);
  }

  .footer-info-item + .footer-info-item {
    margin-left: var(--size-46);
  }

  .footer-info-text {
    color: var(--primary-white);
    font-size: var(--size-14);
    text-align-last: left;
    text-indent: initial;
  }

  .footer-social {
    display: flex;
  }

  .copyright2 {
    color: var(--primary-white);
    font-weight: var(--weight-400);
    font-size: var(--size-14);
    letter-spacing: var(--letter-spacing);
    opacity: 0.5;
  }

  @media only screen and (max-width: 768px) {
    .footer {
      padding-top: var(--size-50);

      &::before {
        height: 50rem;
        background-position-x: 0;
        transform: translateY(-92%);
      }
    }

    .footer-top,
    .footer-bottom {
      flex-direction: column;
    }

    .footer-nav {
      width: 100%;
      height: 25.625rem;
      margin: 0 0 var(--size-24) 0;
      padding-top: var(--size-40);
    }

    .footer-nav-link {
      margin-right: var(--size-24);
    }

    .footer-logo-copyright {
      padding-bottom: var(--size-30);
      border-bottom: var(--size-2) solid var(--footer-divider-border);
    }

    .footer-bottom {
      align-items: flex-start;
      padding-bottom: var(--size-30);
    }

    .footer-info {
      flex-direction: column;
      align-items: flex-start;
    }

    .footer-info-item + .footer-info-item {
      margin-left: 0;
    }

    .copyright2 {
      padding: var(--size-20) 0;
    }

    .footer-social {
      display: none;
    }

    .footer-social-mobile {
      display: block;
    }
  }
</style>
