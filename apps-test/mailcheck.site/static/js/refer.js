(function (window, document) {
  const COOKIE_KEY = "affil";
  const DOMAIN = ".mailcheck.co";

  const isEmpty = (obj) => Object.keys(obj).length === 0;

  const getCookie = (name) => {
    const matches = document.cookie.match(
      new RegExp(
        // eslint-disable-next-line no-useless-escape
        "(?:^|; )" +
          name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") +
          "=([^;]*)"
      )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  };

  const setCookie = (name, value, options) => {
    options = options || {};

    let expires = options.expires;

    if (typeof expires === "number" && expires) {
      const d = new Date();
      d.setTime(d.getTime() + expires * 1000);
      expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
      options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    let updatedCookie = name + "=" + value;

    for (const propName in options) {
      if (options[propName]) {
        updatedCookie += "; " + propName;
        const propValue = options[propName];
        if (propValue !== true) {
          updatedCookie += "=" + propValue;
        }
      }
    }

    document.cookie = updatedCookie;
  };

  const getQueryParams = (search) => {
    search = search.substring(1);
    const res = {};
    if (!search) {
      return res;
    }
    const query = search.split("&");
    for (const param of query) {
      const pair = param.split("=");
      if (pair && pair[0] && pair[1]) {
        res[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
      }
    }
    return res;
  };

  const getSearch = () =>
    (window && window.location && window.location.search) || "";

  const processUtm = (params) => {
    params = params || {};
    const utm = {};
    Object.keys(params).forEach((key) => {
      if (key.indexOf("utm_") === 0) {
        utm[key] = params[key];
        delete params[key];
      }
    });
    return isEmpty(utm) ? params : Object.assign({}, params, { utm });
  };

  const processQueryParams = () => {
    const params = getQueryParams(getSearch());
    if (isEmpty(params)) {
      return;
    }
    return processUtm(params);
  };

  const readExistedParams = () => {
    const cookie = getCookie(COOKIE_KEY);
    // eslint-disable-next-line no-extra-boolean-cast
    if (!!cookie) {
      try {
        return JSON.parse(cookie);
      } catch (e) {
        return {};
      }
    }
    return {};
  };

  const main = () => {
    const newParams = processQueryParams();
    const existedParams = readExistedParams();
    // Note that utm object is not copied with deep-clone method
    const merged = Object.assign({}, existedParams, newParams);
    const cookie = JSON.stringify(merged);
    setCookie(COOKIE_KEY, cookie, { path: "/", domain: DOMAIN });
  };

  const run = () => {
    if (!window && !document) {
      console.warn("Window or Document is undefined");
      return;
    }
    main();
  };

  run();
})(window, document);
