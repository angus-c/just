import * as functions from 'firebase-functions';

function lazyOnRequest(path) {
  return functions.https.onRequest(async (...args) => {
    const mod = await import(path);
    mod.default(...args);
  });
}

export const sendMail = lazyOnRequest('./sendmail.js');
export const checkMail = lazyOnRequest('./checkmail.js');
export const internalRedirect = lazyOnRequest('./internal-redirect.js');
export const emailOpenHandler = lazyOnRequest('./email-open-handler.js');
export const emailLinkHandler = lazyOnRequest('./email-link-handler.js');
export const postbackLogger = lazyOnRequest('./postback-logger.js');
