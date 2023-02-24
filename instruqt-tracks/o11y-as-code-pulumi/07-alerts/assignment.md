---
slug: alerts
id: 7xsbegfxhq4z
type: challenge
title: 'Lab: Alerts'
teaser: Creating Alerts, Workflows and Notifications
notes:
- type: text
  contents: |-
    # Your first pulumi up

    In this challenge, you're tasked with
    - install project dependencies in the `o11y` directory.
    - Including your pulumi access token
    - Setting up and configuring your pulumi stack
    - run pulumi up
tabs:
- title: Terminal
  type: terminal
  hostname: docker-vm
- title: Editor
  type: code
  hostname: docker-vm
  path: /newrelic
difficulty: basic
timelimit: 600
---

🧪 Step 1: Install dependencies
=======================

Navigate to the o11y directory and install the pulumi dependencies

```
cd o11y
npm install
```
🧪 Step 2: Add your pulumi access token
=======================

- Prepare pulumi to use your access token. You may need to create one if you don't already have one.
```
pulumi login
```

- run `pulumi stack select` -- when it prompts to  `<create a new stack>` stack, name it `dev`.

```
pulumi stack select
```

🏁 Step 3: Configure your Pulumi stack
=========

- Configure pulumi to use your [New Relic Account ID](https://docs.newrelic.com/docs/accounts/accounts-billing/account-structure/account-id/).

```
pulumi config set newrelic:accountId 01234567
```

- Configure pulumi to use your [New Relic User API Key](https://docs.newrelic.com/docs/apis/intro-apis/new-relic-api-keys/#api-table). It should start with "NRAK-".
- Use the same User API Key for `apiKey` and `adminApiKey`.

```
pulumi config set newrelic:apiKey --secret NRAK-YYYYYYYYYYYYYY
pulumi config set newrelic:adminApiKey --secret NRAK-YYYYYYYYYYYYYY
```

- To receive alert notification emails, configure your `notifyViaEmail` to use your email address.

```
pulumi config set o11y-as-code-pulumi-newrelic-workshop:notifyViaEmail user@acme.email
```

- Finally, confirm everything is working by running `pulumi up`
```
pulumi up
```

To complete the challenge, press **Check**
