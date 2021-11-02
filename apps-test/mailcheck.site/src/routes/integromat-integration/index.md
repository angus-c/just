---
slug: integromat-integration
title: Integromat Integration instructions
date: 24.04.2021
readingTime: 3 min read
snippet: Step by step guide on how to use Mailcheck with Integromat
desc: Step by step guide on how to use Mailcheck with Integromat.
---

# **{title}**

## Step by step guide

### Step 1

- Open Mailcheck Integrations - [https://app.mailcheck.co/dashboard/integration](https://app.mailcheck.co/dashboard/integration)
  and click "Connect" you will be redirected into "Integromat"

![integromat email verification integration](./integromat-1.png)

### Step 2

- Click "Add to my inventory" and follow the instructions to "Sign up".
- Once signed up you can "Add to my inventory" our app and click "Start using Mailcheck".

![integromat enable email verification](./integromat-2.png)

### Step 3

- Choose the service you want to integrate with (Mailchimp, Google Sheet, ActiveCampaign, etc.)

![integromat integration options](./integromat-3.png)

- Once chosen click "Continue".

I am going to use "Mailchimp" as an example, however, you can use any of the existing apps based on your preferences.

![integromat mailchimp integration](./integromat-4.png)

### Step 4

- Click on the sign of Mailchimp or any other app you are using, and find "Get a list"
- Now, set you your Mailchimp account

![connect mailchimp to Integromat](./integromat-5.png)

- Follow the next steps to authorize your Mailchimp account

### Step 5

- Once authorized, deactivate "Map"

![email list choose in Integromat](./integromat-6.png)

- Select your List (usually named under the name of the audience)

### Step 6

- Add another module

![connect Mailcheck to Integromat](./integromat-7.png)

- Find Mailcheck to connect with the previous module

!choose api method in Integromat](./integromat-8.png)

- Click on "+" and type "Mailcheck"
- Choose "Single Email check"

![validate email in Integromat](./integromat-9.png)

### Step 7

- Click on "Add"
- Go to your Mailcheck account and click "API" from the Top menu

![api key for email validation](./integromat-10.png)

![validate email in integromat](./integromat-11.png)

- Copy your API KEY and get back to Integromat to paste it

### Step 8

![Email from the modal window](./integromat-12.png)

- Choose "Email from the modal window"

![update segment](./integromat-13.png)

- And now we want to update our segment pasting "Mailcheck Trust rate" to define the validity of the email

### Step 9

- Adding another Mailchimp Module

![connect Mailchimp to Integromat](./integromat-14.png)

- We need to choose "Mailchimp" again
- And from the Modal window "Add/Update subscriber"

### Step 10

- Choose your list from the dropdown menu and make sure "Map" disabled
- Choose on the "email address field "Email address" however, make sure the Map is "ENABLED"

![update map option](./integromat-15.png)

### Step 11

- Set tag
- Choose "trust rate" from the modal window option

![email trust rate in Integromat](./integromat-16.png)

### Step 12

- Run once

![run email validation in Integromat](./integromat-17.png)

And your integration is fully working now.
If you can't make it work, please reach out at [integromat@mailcheck.co](mailto:integromat@mailcheck.co)
