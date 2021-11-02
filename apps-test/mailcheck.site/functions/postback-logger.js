import functions from 'firebase-functions';
import admin from 'firebase-admin';
import { BigQuery } from '@google-cloud/bigquery';

const config = functions.config();
admin.initializeApp(config.firebase);
/** @type {import('@google-cloud/bigquery').Table} */
let bigQueryTable;
try {
  const bigQuery = new BigQuery({ projectId: config.mailcheck.bq_project_id });
  bigQueryTable = bigQuery
    .dataset(config.mailcheck.bq_postbacks_dataset)
    .table(config.mailcheck.bq_postbacks_table);
} catch (err) {
  functions.logger.error(err);
  process.exit(1);
}

/**
 * @param {functions.Request} req
 * @param {functions.Response} res
 */
export default async function (req, res) {
  const u = new URL(`${req.protocol}://${req.hostname}${req.originalUrl}`);
  let row = {
    player_id: +u.searchParams.get('PlayerID'),
    mid: +u.searchParams.get('mid'),
    saleid: +u.searchParams.get('saleid'),
    dpst: +u.searchParams.get('dpst'),
    btag: u.searchParams.get('btag'),
    timestamp: new Date(),
    cf_worker: req.get('cf-worker'),
    referer: req.get('Referer'),
    user_agent: req.get('User-Agent'),
    path: u.pathname
  };
  for (const [key, val] in Object.entries(row)) {
    if ((typeof val === 'number' && isNaN(val)) || val === undefined) {
      delete row[key];
    }
  }
  try {
    await bigQueryTable.insert(row);
  } catch (err) {
    functions.logger.error(err);
  }
  return res.status(200).end();
}
