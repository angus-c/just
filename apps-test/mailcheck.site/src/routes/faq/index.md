---
layout: faq
slug: faq
title: FAQ
date: 25.06.2020
readingTime: 1 min read
snippet: Frequent Questions
desc: Frequent Questions
---

<script>
  import Video from '$lib/Video/video.svelte';

  let idVideoDelimiter = 'XTpv879nfjc';
  let titleVideoDelimiter = 'How to select the delimiter?';

  let idVideoAddEmails = 'YL4a5M50_Pk';
  let titleVideoAddEmails = 'How to manually add emails?';

  let idVideoAdaptData = 'dFcw9wEXsAg';
  let titleVideoAdaptData = 'How to adapt data in Excel?';

  let idVideoSendgridInstructions = 'L2TCGUk0iZ0';
  let titleVideoSendgridInstructions = 'Mailcheck + SendGrid Integration instructions';
</script>

<div class="accordion-column left">
<details>

    <summary>Where do you get the data for verification?</summary>

We take the data from public sources, system search, social networks, and open databases available online.

</details>

<details>

    <summary>What social networks do you use for validation?</summary>

We use - Google, Gravatar, Linkedin, Facebook, etc.

</details>

<details>

    <summary>What is your difference from the competitors?</summary>

The main difference from our competitors is that we do not use only the automatic search and validation but we provide manual moderation, so we use all the power of social networks and search engines for more in-depth validation.

</details>

<details>

    <summary>What is your trial?</summary>

We let our customers potentially feel the difference by verifying 10 emails FOR FREE without adding a payment method and increase the number of verifications up to 100 emails with the payment method added.

</details>

<details>

    <summary>Do you check phone numbers?</summary>

We are currently testing a beta version of our phone base validations. But it is available in manual mode. In order to check the phone base, please [contact our support team](mailto:support+faq@mailcheck.co).

</details>

<details>

    <summary>How to get started with Mailcheck?</summary>

1. **Step 1** Go to [login](https://app.mailcheck.co/auth/login) and create an account. Our registration process is one of the easiest in the known systems

2. **Step 2** Set your email address and password

3. **Step 3** Fill in your profile information or Skip if you don't have time

4. **Step 4** Choose the plan you want to go with or skip if you don't have time

5. **Step 5** Set your billing information ( in case you didn't choose a plan, you can still go with "Free Tier" 100 emails for free). We have two scenarios if you want a free tier

   - 10 emails if you didn't set your card

   - 100 emails if your card details were provided (we don't charge you anything unless you previously has chosen a plan)

6. **Step 6** Ta da! You are in

7. **Step 7** If you have any questions, always [ping our support team](mailto:support+faq@mailcheck.co)

</details>

<details>

    <summary>How to get verified your first list?</summary>

1. **Step 1** If you have data collected in .csv, .tsv formats, feel free to click "Upload"

2. **Step 2** Drag and drop your file or choose from your computer

3. **Step 3** specify a delimiter (choose one column with emails only)

4. **Step 4** send a file for the validation

5. **Step 5** go to the uploaded files and click "Process"

6. **Step 6** When the file processed, you will receive results as the download button inside the site or via email

</details>

<details>

    <summary>How to interpret a trust rate?</summary>

- Emails with a trust rate of 0-49% are Risky and most likely INVALID, we don't recommend using them

- Emails with a trust rate of 50-100% are VALID, feel free to use them

</details>

<details>

    <summary>How can I sign up?</summary>

1. **Step 1** We made our service so easy, that no extra confirmation required, simply set your email and password to register

2. **Step 2** Use your Google, facebook account to register with us

</details>

<details>

    <summary>How can I login?</summary>

1. **Step 1** Fill in email/password

1. **Step 1** Log in using Google or Facebook

</details>

<details>

    <summary>How to delete an account at Mailcheck?</summary>

If you want to delete account because of the uploaded database, you can simply hide all of the info or [contact support](mailto:support+faq@mailcheck.co) so your account can be deactivated

</details>

<details>

    <summary>What is the delimiter and how to use it?</summary>

A delimiter is the comma character, which acts as a field delimiter, we ask to set it in order to validate the chosen column, NOTE it only has to be an email column

<Video id={idVideoDelimiter} title={titleVideoDelimiter} />
</details>

<details>

    <summary>How to prepare a list to get it verified?</summary>

If your data in Google Sheets or Excel you can export them to .csv and upload to your Mailcheck account

</details>

<details>

    <summary>How to adapt data in Excel?</summary>

Watch our video about how to adapt data in Excel

<Video id={idVideoAdaptData} title={titleVideoAdaptData} />

</details>

<details>

    <summary>How to manually add emails?</summary>

Watch our video about how to manually add emails?

<Video id={idVideoAddEmails} title={titleVideoAddEmails} />

</details>

</div>

<div class="accordion-column right">
<details>

    <summary>How can I get my API key</summary>

A step-by-step guide to [API key creation](/create-api-key)

</details>

<details>

    <summary>Is my data protected?</summary>

All information about our users is protected by Google systems, we do really care about privacy and that's why never share any data due to the GDPR compliance.

</details>

<details>

    <summary>How many free email verifications do you offer?</summary>

We allow 100 free email validations if the billing information was verified, and 10 free email validations if the payment details weren't provided

- with card 100 emails

- without card 10 emails

</details>

<details>

    <summary>What is a quick validation?</summary>

Quick validation aimed to help our customers to verify a single email without loading the complete .csv file, it helps to save time and get the result right away. You can quickly validate your email [here](https://app.mailcheck.co/dashboard/)

</details>

<details>

    <summary>Downloading Verified Lists</summary>

We send the results via [dashboard](https://app.mailcheck.co/dashboard/my_files) as well as an email notification, all you need to do is to click on "Download" sign or button and save on your Computer to preview

</details>

<details>

    <summary>Integrations</summary>

As of now, we are developing Mailchimp integration.

</details>

<details>

    <summary>How does Mailcheck work?</summary>

Mailcheck is one place where you can validate all of your emails. Besides the plans we offer, we also don't set the limits for email validations on paid plans, while processing an overcharge. Imagine you have a list of 1200 emails and currently purchased a "PRO" plan. Since the PRO plan includes 1000 emails, we will do 200 email validation and at the end of the billing cycle will inform about the overcharge. Overuse charge: $0.005 for the PRO plan For more please visit
[payment plans](https://app.mailcheck.co/dashboard/payment_plans) or [contact our support team](mailto:support+faq@mailcheck.co)

</details>

<details>

    <summary>What is the overuse charge?</summary>

Since Mailcheck doesn't set any limits for the verification we allow our clients under the paid subscriptions to verify as many emails as they can, overuse charge applies when the plan limited was used up. For example, the overuse charge for the PRO = **$0.005** Agency = **$0.004** Enterprise = **$0.003** The bigger plan you choose the lower overuse charge can be

</details>

<details>

    <summary>Can I delete my files?</summary>

In the Mailcheck we allow our clients to hide their data, just follow the link [my files](https://app.mailcheck.co/dashboard/my_files) and choose "X" sign next to each file

</details>

<details>

    <summary>How can I cancel my subscription?</summary>

In order to cancel a subscription, please [contact our support team](mailto:support+faq@mailcheck.co).

</details>

<details>

    <summary>I was charged more than my plan costs</summary>

Mailcheck works on a subscription basis and if you have any of the paid plans (PRO, AGENCY, ENTERPRISE, LEGENDARY) so you are able to verify more emails than you have according to your plan, to receive more detailed information, please [contact our support team](mailto:support+faq@mailcheck.co).

</details>

<details>

    <summary>Why I can't see a dark mode option on my account?</summary>

We apply Dark Mode only for those users who have purchased paid plans and planning to develop more features

</details>

<details>

    <summary>How long does usually take to verify 1M files?</summary>

It depends but usually takes around 20min-60min just because our innovative technology allows making in-depth validation and run the data through multiply sources making sure we give the most accurate answer.

</details>

<details>

    <summary>Mailchimp Integration instructions</summary>

Step by step guide on how to use [Mailchimp](/mailchimp-integration)

</details>

<details>

    <summary>Zapier Integration instructions</summary>

A step-by-step guide to integrate Mailcheck with daily services using [Zapier](/zapier-integration)

</details>

<details>

    <summary>Integromat Integration instructions</summary>

A step-by-step guide to integrate Mailcheck with daily services using [Integromat](/integromat-integration)

</details>

<details>

    <summary>How to use Sendgrid instructions?</summary>

A step-by-step guide to integrate Mailcheck with daily services using [Sendgrid](/sendgrid-integration)

<Video id={idVideoSendgridInstructions} title={titleVideoSendgridInstructions} />
</details>
</div>
