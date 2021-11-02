<progress class="progress" />

<style>
  .progress {
    box-sizing: border-box;
    width: 3em;
    height: 3em;
    padding: 0.25em;
    overflow: hidden;
    color: var(--color-progress);
    font-size: var(--size-16);
    background-color: var(--transparent);
    border: none;
    border-radius: 50%;
    appearance: none;
  }

  .progress::-webkit-progress-bar {
    background-color: var(--transparent);
  }

  /* Indeterminate */
  .progress:indeterminate {
    -webkit-mask-image: linear-gradient(var(--transparent) 50%, black 50%),
      linear-gradient(to right, var(--transparent) 50%, black 50%);
    mask-image: linear-gradient(var(--transparent) 50%, black 50%),
      linear-gradient(to right, var(--transparent) 50%, black 50%);
    animation: pure-material-progress-circular 6s infinite cubic-bezier(0.3, 0.6, 1, 1);
  }

  .progress:indeterminate::before,
  .progress:indeterminate::-webkit-progress-value {
    display: block;
    box-sizing: border-box;
    width: 100% !important;
    height: 100%;
    margin-bottom: 0.25em;
    background-color: var(--transparent);
    border: solid 0.25em var(--transparent);
    border-top-color: var(--color-progress);
    border-radius: 50%;
    animation: pure-material-progress-circular-pseudo 0.75s infinite linear alternate;
    content: '';
  }

  .progress:indeterminate::-moz-progress-bar {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background-color: var(--transparent);
    border: solid 0.25em var(--transparent);
    border-top-color: var(--color-progress);
    border-radius: 50%;
    animation: pure-material-progress-circular-pseudo 0.75s infinite linear alternate;
  }

  .progress:indeterminate::-ms-fill {
    animation-name: -ms-ring;
  }

  @keyframes pure-material-progress-circular {
    0% {
      transform: rotate(0deg);
    }
    12.5% {
      transform: rotate(180deg);
      animation-timing-function: linear;
    }
    25% {
      transform: rotate(630deg);
    }
    37.5% {
      transform: rotate(810deg);
      animation-timing-function: linear;
    }
    50% {
      transform: rotate(1260deg);
    }
    62.5% {
      transform: rotate(1440deg);
      animation-timing-function: linear;
    }
    75% {
      transform: rotate(1890deg);
    }
    87.5% {
      transform: rotate(2070deg);
      animation-timing-function: linear;
    }
    100% {
      transform: rotate(2520deg);
    }
  }

  @keyframes pure-material-progress-circular-pseudo {
    0% {
      transform: rotate(-30deg);
    }
    29.4% {
      border-left-color: var(--transparent);
    }
    29.41% {
      border-left-color: var(--color-progress);
    }
    64.7% {
      border-bottom-color: var(--transparent);
    }
    64.71% {
      border-bottom-color: var(--color-progress);
    }
    100% {
      border-bottom-color: var(--color-progress);
      border-left-color: var(--color-progress);
      transform: rotate(225deg);
    }
  }
</style>
