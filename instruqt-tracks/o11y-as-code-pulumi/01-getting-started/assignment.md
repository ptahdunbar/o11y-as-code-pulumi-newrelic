---
slug: getting-started
id: ssfoayegmm4s
type: challenge
title: 'Lab: Getting Started'
teaser: Setup and run your applications
notes:
- type: text
  contents: |-
    # Getting Started with Observability as Code

    In this challenge, you're tasked with
    - configuring your applications with the proper `NEW_RELIC_LICENSE_KEY`
    - start your applications using docker compose
tabs:
- title: Terminal
  type: terminal
  hostname: docker-vm
- title: Editor
  type: code
  hostname: docker-vm
  path: /newrelic
difficulty: basic
timelimit: 300
---

🧪 Step 1: run make
=======================

In the root workspace directory, run the `make` command.
It will generate `.env` files for your applications.
Update the `NEW_RELIC_LICENSE_KEY` in both .env files.
Once you're finish editing, run `docker compose up -d`

```
make
vim apps/web-api/.env
vim apps/login-service/.env
```
🧪 Step 2: Add your New Relic License Keys
=======================

Using the Editor tab, update the `.env` files to add your `NEW_RELIC_LICENSE_KEY` to each application.

.env file:
```
NEW_RELIC_LICENSE_KEY=AABBCC
```

🏁 Finish
=========
Verify that everything is working by checking Docker.

```
docker compose up -d
```

```
docker compose logs -f
```

To complete the challenge, press **Check**
