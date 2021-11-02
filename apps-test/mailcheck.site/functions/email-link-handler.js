import functions from 'firebase-functions';
import { BigQuery } from '@google-cloud/bigquery';
import admin from 'firebase-admin';
import { promises as dns } from 'dns';

const config = functions.config();
admin.initializeApp(config.firebase);
const BQ_DATASET = config.mailcheck?.bq_mail_link_dataset;
const BQ_TABLE = config.mailcheck?.bq_mail_link_table;
const dnsCache = new Map();

/** @type {import('@google-cloud/bigquery').Table} */
let bigQueryEmailOpenTable;
try {
  const bigQuery = new BigQuery({ projectId: config.mailcheck.bq_project_id });
  bigQueryEmailOpenTable = bigQuery.dataset(BQ_DATASET).table(BQ_TABLE);
} catch (err) {
  functions.logger.error(err);
}

/**
 * @param {string} subdomain
 * @return {Promise<URL>}
 */
async function getRedirectUrl(subdomain) {
  const fullDomain = `${subdomain}.${config.mailcheck.dns_txt_redirect_domain}`;
  let cachedUrl = dnsCache.get(fullDomain);
  if (!cachedUrl) {
    const txts = await dns.resolveTxt(fullDomain);
    cachedUrl = new URL(txts.map((row) => row.join('')).join(''));
    dnsCache.set(fullDomain, cachedUrl);
  }
  return cachedUrl;
}

/**
 * @param {functions.Request} req
 * @param {functions.Response} res
 */
export default async function (req, res) {
  const redirectSubdomain = req.query.redirect ?? '*';
  const row = {
    timestamp: new Date(),
    click_id: req.query.click_id,
    user_agent: req.get('User-Agent'),
    ip: req.get('fastly-client-ip'),
    email: req.query.email
  };
  let redirectUrl;
  try {
    redirectUrl = await getRedirectUrl(redirectSubdomain);
  } catch {
    return res.status(400).end();
  }
  try {
    await bigQueryEmailOpenTable?.insert(row);
    res.redirect(redirectUrl);
  } catch (err) {
    functions.logger.error(err);
    res.status(500).end();
  }
}
