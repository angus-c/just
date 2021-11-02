---
slug: zapier-integration
title: Zapier Integration instructions
date: 18.02.2021
readingTime: 3 min read
snippet: A step-by-step guide to integrate Mailcheck with daily services using Zapier
desc: Zapier helps to configure several services to work in conjunction with Mailcheck. With the help of Zapier around 2000 apps can get their emails validated.
---

# **Zapier Integration instructions**

## A step-by-step guide to integrate Mailcheck with daily services using Zapier

Zapier helps to configure several services to work in conjunction with Mailcheck. With the help of Zapier around 2000 apps can get their emails validated.

Using Mailcheck with Zapier here is what you need:

1. **A Zapier account**: create an account or sign up for free - it usually has limited features, however, Mailcheck will be creating a Zap that works with a free Zapier account
2. **A Mailcheck account (with the API key)**: In your Mailcheck Account access your dashboard, click “API” from the top menu, enter the key name and copy the API key
3. **A Google account**: A Google account and spreadsheet in Google Drive, before you begin please set the following columns and headers:

- **Email** - this is the source where Zapier will get your emails from
- **Status or Trust rate** - Mailcheck Validation results

Now let’s proceed to the step-by-step instructions:

### Step 1:

Open your Zapier account and log in. Choose **“+”** or **“Make a Zap”.**

![Open your Zapier account and log in](./open-your-zapier-account-and-log-in.jpg)

### Step 2:

You can add a name to your zap just click on **“Name your Zap”**.

![add a name to your zap](./add-a-name-to-your-zap.jpg)

### Step 3:

On the **“Choose app & event”** section click on **“Google Sheets”**.

![add a name to your zap](./choose-app-google-sheets.jpg)

### Step 4:

The next thing is to trigger **“New or Updated Spreadsheet Row”**, then tap **“Continue”**.

![trigger new or updated spreadsheet row](./trigger-new-or-updated-spreadsheet-row.jpg)

### Step 5:

Tap **“Choose Account”** and connect your Google account to get your Google Sheet information

![choose google account](./choose-account-google.jpg)

![connect your google account](./connect-your-google-account.jpg)

### Step 6:

Choose a spreadsheet you require for the validation
Choose the worksheet
For the Trigger Column always choose **“Email”**
Then, tap **“Continue”**.

![choose a spreadsheet you require for the validation](./choose-a-spreadsheet-you-require-for-the-validation.jpg)

### Step 7:

Click **“Test your trigger”**. A summary of the trigger setup will be displayed. Peruse the details to see if everything is correct. Then, click **“Done Editing”**. Action section will pop up if every detail is in order. Otherwise, an error message will be displayed. In such a case, re-check the settings from the past steps, make the necessary corrections, then perform the test again. Now that the setup is correct, choose **“Continue”**.

![test your zap trigger](./test-your-trigger.jpg)

![check summary of the trigger setup](./summary-of-the-trigger-setup.jpg)

### Step 8:

It is time to establish the Action. Please find “Mailcheck” in the search field and select it

![establish the action](./establish-the-action.jpg)

### Step 9:

Here, the only actionable option will be “Verify Email Address,” which has been chosen already. Tap **“Continue”**, followed by **“Choose Account”**. This will help link your Mailcheck account. In the subsequent page, type in your API key – you can generate your API key under the API section in your mailcheck account. Next, select **“Yes, continue”**.

![verify email address](./verify-email-address.jpg)

### Step 10:

At this stage, you have to establish Mailcheck account, click **“Choose an account”** and click on **“connect a new account”**

![establish link to mailcheck account](./establish-link-to-mailcheck-account.jpg)

![connect a new mailcheck account](./connect-a-new-mailcheck-account.jpg)

### Step 11:

After a successful Mailcheck API key procedure, choose the right email data from the drop-down list, click **“Continue”** proceed with **“test and review”**
As the screenshot indicates, the test was successful, so you have the validated data in Mailcheck

![choose the right email data](./choose-the-right-email-data-from-the-drop-down-list.jpg)

### Step 12:

You can turn on Zap and close or export the results back to Google Sheets

![turn on Zap](./turn-on-zap.jpg)

### Step 13:

In order to receive back the validation results to the Google sheet we need to establish another action, for that please click **“+”** as indicated in the screenshot

![receive back the validation results](./receive-back-the-validation-results-to-the-google-sheet.jpg)

### Step 14:

You need to choose Google Sheets again

![choose google sheets again](./choose-google-sheets-again.jpg)

### Step 15:

Action event must be the **“Update Spreadsheet Row”** because we will be updating the row with “trust rate” and **“validation status”** results.

![choose app](./choose-app.jpg)

### Step 16:

Once the **“Action Event”** has been chosen, please click **“Continue”** and choose your Google Sheet account

![choose account](./choose-account.jpg)

### Step 17:

Same as we set for step 6, we are going to choose your Google Drive (1)
Select the spreadsheet similar to step 6 make sure you have chosen the exactly same name of the spreadsheet file that you’ve selected above (2)
And choose your worksheet similar to step 6 (3)

![setup the action](./setup-action.jpg)

### Step 18:

When choosing the row, please select **“Custom”** then choose **“New or Updated Spreadsheet Row in Google Sheets** -> final step choose Row ID

![choosing the row](./new-row.jpg)

![choosing the row ID](./row-id.jpg)

### Step 19:

Find **“Result”** field, click on **“verify email address in Mailcheck”** choose “Status” proceed with **“Continue”**

![insert data to form](./insert-data.jpg)

### Step 20:

Just click on **“test and continue”**

### Step 21:

At this point, we can activate our Zap

![update spreadsheet row](./update-spreadsheet-row.jpg)

### Step 22:

Let’s perform manual tests to ensure everything is working properly.

![perform manual tests](./perform-manual-tests.jpg)

**Note**: The operation explained above is one of the several ways to use a Zapier in collaboration with Mailcheck.
However, the fundamental principles remain the same. Zapier’s library contains more than 2,000 online apps, which means that they are likely to support the CRM or ESP which you are currently using.
Be creative while exploring the endless possibilities of Zapier. If you ever encounter any issues, kindly get in touch with our LiveChat support team for proper assistance.
