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

declare function throttle(fn: Function, interval: number, options?: options): Function & Methods;

export = throttle;
