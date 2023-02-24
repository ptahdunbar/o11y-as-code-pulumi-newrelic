// Let's go autobots!

/**
 * Pulumi New Relic Provider
 * 
 * See Pulumi API Docs for more wizardy:
 * 
 * @link https://www.pulumi.com/registry/packages/newrelic/api-docs/
 */
import * as pulumi from '@pulumi/pulumi';
import * as newrelic from '@pulumi/newrelic';

// Applications to monitor
const apps = [
  'login-service',
  'web-api',
]

/**
 * Tags
 * 
 * Add tags to our applications to help organize and find your data.
 * 
 * @link https://docs.newrelic.com/docs/new-relic-solutions/new-relic-one/core-concepts/use-tags-help-organize-find-your-data/
 */

// TODO: Add tags here
apps.forEach(async name => {
  console.log(name)
})

/**
 * Workloads
 * 
 * Group all of the resources together into a single view.
 * 
 * @link https://docs.newrelic.com/docs/new-relic-solutions/new-relic-one/workloads/use-workloads/
 */

// TODO: Add workloads here


/**
 * Dashboards
 * 
 * @link https://docs.newrelic.com/docs/query-your-data/explore-query-data/dashboards/introduction-dashboards/
 */

// TODO: Add dashboards here


/**
 * Configure email notifications for our alerts
 * 
 * @link https://docs.newrelic.com/docs/alerts-applied-intelligence/new-relic-alerts/alert-notifications/notification-channels-control-where-send-alerts/
 */

// TODO: Add email notification destinations here


/**
 * Alerts
 * 
 * Receive notifications when an incident is created, closed, or updated.
 * 
 * @link https://docs.newrelic.com/docs/alerts-applied-intelligence/new-relic-alerts/get-started/your-first-nrql-condition/
 * @link https://docs.newrelic.com/docs/query-your-data/nrql-new-relic-query-language/get-started/introduction-nrql-new-relics-query-language/
 */
apps.forEach(async name => {

  // TODO: Add alert policies and conditions here

  /**
   * Workflow notifications
   * 
   * Configure notifications for incident workflows to use email.
   * 
   * @link https://docs.newrelic.com/docs/alerts-applied-intelligence/applied-intelligence/incident-workflows/incident-workflows/
   */

  // TODO: Add workflow notifications here
})

/**
 * Synthetics
 * 
 * Proactively monitor your web applications and APIs from around the world.
 * 
 * @link https://docs.newrelic.com/docs/synthetics/synthetic-monitoring/getting-started/get-started-synthetic-monitoring/
 */

// TODO: Add synthetic monitors here

// That's all folks :D