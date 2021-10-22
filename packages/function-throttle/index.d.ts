// Definitions by: Dominik Rowicki <https://github.com/papermana>
// Modified by: Angus Croll <https://github.com/angus-c>

declare type options = {
  leading?: boolean,
  trailing?: boolean,
}

type Methods = {
  cancel: () => void,
  flush: () => void,
}

declare function throttle<Func extends (...args: any[]) => any>(fn: Func, interval: number, options?: options): Func & Methods;

export default throttle;
