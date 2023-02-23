[![New Relic Experimental header](https://github.com/newrelic/opensource-website/raw/master/src/images/categories/Experimental.png)](https://opensource.newrelic.com/oss-category/#new-relic-experimental)

# Workshop: Observability as Code with Pulumi

This app demonstrates how to incorporate Pulumi and New Relic together using Observability as Code.

## Set up Pulumi and manage your secrets

### Setup accounts
- [Pulumi](https://www.pulumi.com/docs/get-started/aws/begin/#install-pulumi)
- [New Relic](https://newrelic.com/signup)

#### Confirm pulumi is installed
```
which pulumi
```

#### Install Pulumi
```
brew install pulumi/tap/pulumi
```

#### Get Credentials
- https://app.pulumi.com/account/tokens
- https://one.newrelic.com/launcher/api-keys-ui.api-keys-launcher

#### Clone the repo and run the app
```
git clone
docker compose up
```

#### Configure your secrets
```
cd infra
pulumi config set newrelic:accountId 01234567
pulumi config set newrelic:apiKey YYYYYYYYYYYYYY --secret
pulumi config set newrelic:adminApiKey YYYYYYYYYYYYYY --secret
pulumi config set o11y-as-code-pulumi-newrelic-workshop:notifyViaEmail user@acme.email
```

### Run Pulumi
```
pulumi up
pulumi down
```

## LICENSE

This is licensed with the Apache 2.0 [license](LICENSE).
