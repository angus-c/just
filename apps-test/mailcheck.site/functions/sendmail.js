import functions from 'firebase-functions';
import nodemailer from 'nodemailer';
import { EmailValidator } from './email-validator.js';

const gmailEmail = functions.config().gmail?.email ?? 'email';
const gmailPassword = functions.config().gmail?.password ?? 'password';

const emailValidator = new EmailValidator();

const MIN_ALLOWED_EMAIL_TRUST_RATE = 40;

const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});

export default async function (req, res) {
  let pb;
  try {
    pb = JSON.parse(req.body);
  } catch (e) {
    return res.status(400).json({ error: 'wrong input params (json expected)' });
  }

  const userEmail = pb.email;
  const reqIp = req.headers['fastly-client-ip'];
  const { code, data } = await emailValidator.validate(userEmail, reqIp);

  if (code !== 200 || !data.trustRate || data.trustRate < MIN_ALLOWED_EMAIL_TRUST_RATE)
    return res.status(412).json(data);

  let keys = Object.keys(pb);

  let template = '<h2>Contact form from mailcheck.co</h2>';

  keys.forEach((key) => (template += `<p><b>${key}: </b>${pb[key]}</p>`));
  functions.logger.info('Got mail:', template);

  const mailOptions = {
    from: `Mailcheck Landing <${gmailEmail}>`,
    to: 'contact@mailcheck.co',
    subject: 'Mailcheсk form',
    html: template
  };

  mailTransport.sendMail(mailOptions, function (error, info) {
    if (error) {
      functions.logger.error('Error sending mail: ', error.message);
      return res.status(500).json({ error: error.message });
    }
    functions.logger.info('Message sent to: ', info.envelope.to);
    return res.status(200).send({ data: 'ok' });
  });
}
