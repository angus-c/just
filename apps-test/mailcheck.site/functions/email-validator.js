import functions from 'firebase-functions';
import fetch from 'node-fetch';

const apiLink =
  functions.config().mailcheck?.link ?? 'https://api.mailcheck.co/v1/singleEmail:check';
const apiKey = functions.config().mailcheck?.key ?? 'apiKey';

export class EmailValidator {
  constructor() {
    this.callLimitForOneIp = 7;
    this.ipCache = new Map();
    this.mailCache = new Map();
  }

  async validate(email, reqIp) {
    const cachedResult = this.mailCache.get(email);
    if (cachedResult)
      return {
        code: 200,
        data: cachedResult
      };

    const reqCount = this.ipCache.get(reqIp) || 0;
    this.ipCache.set(reqIp, reqCount + 1);

    if (reqCount > this.callLimitForOneIp)
      return {
        code: 429,
        data: {
          code: '429',
          message: 'rate limit reached for ip ' + reqIp
        }
      };

    functions.logger.info(reqIp + ': reqCount:', reqCount);

    try {
      const apires = await fetch(apiLink, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + apiKey,
          'user-agent': 'mailcheck landing'
        },
        body: JSON.stringify({ email })
      });

      const json = await apires.json();
      this.mailCache.set(email, json);

      return {
        code: apires.status,
        data: json
      };
    } catch (err) {
      return {
        code: 500,
        data: {
          code: '500',
          message: err.toString()
        }
      };
    }
  }
}
