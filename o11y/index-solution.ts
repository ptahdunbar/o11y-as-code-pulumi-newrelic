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
import Tag from "./resources/Tags"

// Fetch an application by name
const myTeamTag = {
  key: 'team',
  values: ['acme_corp'],
}
apps.forEach(async name => {  
  const app = await newrelic.getEntity({
    name,
  })

  Tag(app, [
    myTeamTag,
    {
      key: 'env',
      values: ['staging'],
    }
  ])
})

/**
 * Workloads
 * 
 * Group all of the resources together into a single view.
 * 
 * @link https://docs.newrelic.com/docs/new-relic-solutions/new-relic-one/workloads/use-workloads/
 */
import Workload from "./resources/Workloads"
export const workload_permalink = Workload(
  'O11yAsCode Workload Example (Pulumi)',
  `tags.team = 'acme_corp'`
).permalink

/**
 * Dashboards
 * 
 * @link https://docs.newrelic.com/docs/query-your-data/explore-query-data/dashboards/introduction-dashboards/
 */
import DashboardJson from "./resources/Dashboards"
const nodeDashboard = DashboardJson(
  './dashboards/node.json', {
  name: 'O11y as Code Dashboard (Pulumi)'
})
export const dashboard_permalink = nodeDashboard.permalink

/**
 * Configure email notifications for our alerts
 * 
 * @link https://docs.newrelic.com/docs/alerts-applied-intelligence/new-relic-alerts/alert-notifications/notification-channels-control-where-send-alerts/
 */
const config = new pulumi.Config
import { emailDestination, emailChannel } from "./resources/Notifications"
const _emailDestination = emailDestination(config.require('notifyViaEmail'))

/**
 * Alerts
 * 
 * Receive notifications when an incident is created, closed, or updated.
 * 
 * @link https://docs.newrelic.com/docs/alerts-applied-intelligence/new-relic-alerts/get-started/your-first-nrql-condition/
 * @link https://docs.newrelic.com/docs/query-your-data/nrql-new-relic-query-language/get-started/introduction-nrql-new-relics-query-language/
 */
let policies: { [key: string]: any } = {}
import AlertPolicy from './resources/AlertPolicy';
import NrqlAlertCondition from "./resources/NrqlAlertCondition"
import Workflow from "./resources/Workflow"
apps.forEach(async name => {
  policies[name] = AlertPolicy({
    name,
    /**
     * The rollup strategy for the policy.
     * Options include: `PER_POLICY`, `PER_CONDITION`, or `PER_CONDITION_AND_TARGET`. The default is `PER_POLICY`.
     */
    incidentPreference: 'PER_CONDITION',
  });

  NrqlAlertCondition({
    name: `${name}-latency-condition`,
    policyId: policies[name].id.apply((id:any) => id),
    nrql: {
      query: `SELECT (count(apm.service.error.count) / count(apm.service.transaction.duration))*100 FROM Metric WHERE (appName ='${name}') AND (transactionType = 'Web')`,
    },
    dependsOn: policies[name],
  })

  NrqlAlertCondition({
    name: `${name}-error-condition`,
    policyId: policies[name].id.apply((id:any) => id),
    nrql: {
      query: `SELECT count(*) FROM TransactionError WHERE appName = '${name}'`,
    },
    dependsOn: policies[name],
  })

  /**
   * Workflow notifications
   * 
   * Configure notifications for incident workflows to use email.
   * 
   * @link https://docs.newrelic.com/docs/alerts-applied-intelligence/applied-intelligence/incident-workflows/incident-workflows/
   */
  const _emailChannel = emailChannel(_emailDestination)
  Workflow({
    name,
    policyName: policies[name].name.apply((name: string) => name),
    channelId: _emailChannel.id.apply((id: string) => id),
    dependsOn: [
      _emailDestination,
      _emailChannel,
    ]
  })
})

/**
 * Synthetics
 * 
 * Proactively monitor your web applications and APIs from around the world.
 * 
 * @link https://docs.newrelic.com/docs/synthetics/synthetic-monitoring/getting-started/get-started-synthetic-monitoring/
 */
import SyntheticsMonitor from "./resources/SyntheticsMonitor"
let urls = [
  'http://acme-corp.com',
  'https://acme-corp.com/0101/index.html',
]
urls.forEach(url => SyntheticsMonitor({
  uri: url,
  // https://docs.newrelic.com/docs/synthetics/synthetic-monitoring/administration/synthetic-public-minion-ips/#location
  locationsPublics: ['AWS_US_EAST_1', 'AWS_US_WEST_1'],
  enableScreenshotOnFailureAndScript: true,
  status: 'ENABLED',
  type: 'BROWSER',
  period: 'EVERY_MINUTE',
  verifySsl: true,
  runtimeTypeVersion: '100',
  runtimeType: 'CHROME_BROWSER',
  scriptLanguage: 'JAVASCRIPT',
  tags: [myTeamTag]
}))

// That's all folks :D