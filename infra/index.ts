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

// Let's use the values from Pulumi.<stack>.yaml
const config = new pulumi.Config

// Applications to monitor
const apps = [
  'newrelic-pulumi-express',
  'newrelic-pulumi-next',
]

// Tag all resources created with my team
const myTeamTag = {
  key: 'team',
  values: ['acme_corp'],
}

// Group all your resources under a workload
const workload = 'New Relic x Pulumi Workshop'

// simple type definitions so TypeScript doesn't complain :D
let policies: { [key: string]: any } = {}
let tags: { [key: string]: any } = {}
let synthetics: { [key: string]: any } = {}



/**
 * Tags
 * 
 * Add tags to our applications to help organize and find your data.
 * 
 * @link https://docs.newrelic.com/docs/new-relic-solutions/new-relic-one/core-concepts/use-tags-help-organize-find-your-data/
 */
apps.forEach(name => {  
  // Fetch an application by name
  const app = newrelic.getEntityOutput({
    name,
  })

  // Create tags for the application
  tags[name] = new newrelic.EntityTags(`${name}-tags`, {
    guid: app.guid,
    tags: [
      myTeamTag,
      {
        key: 'env',
        values: ['testing'],
      }
    ],
  })
})



/**
 * Workloads
 * 
 * Group all of the resources together into a single view.
 * 
 * @link https://docs.newrelic.com/docs/new-relic-solutions/new-relic-one/workloads/use-workloads/
 */
const _workload = new newrelic.plugins.Workload(workload, {
  entitySearchQueries: [{
    query: `tags.team = '${myTeamTag.values[0]}'`,
  }],
});

export const workload_permalink = _workload.permalink







/**
 * Dashboards
 * 
 * @link https://docs.newrelic.com/docs/query-your-data/explore-query-data/dashboards/introduction-dashboards/
 */

// Import Dashboards from JSON
const dashboard = new newrelic.OneDashboardJson('imported-dashboard', {
    json: JSON.stringify(require('./dashboards/multipage.json')),
});
export const dashboard_permalink = dashboard.permalink

// Fetch an existing dashboard from New Relic by GUID
// const dashboard = newrelic.OneDashboardJson.get('dashboard', 'AABBCCDDEEFFGGHHIIJJKKLLMMNNOOPP')
// export const getDashboardByGuid = dashboard.updatedAt














/**
 * Configure email notifications for our alerts
 * 
 * @link https://docs.newrelic.com/docs/alerts-applied-intelligence/new-relic-alerts/alert-notifications/notification-channels-control-where-send-alerts/
 */
const emailDestination = new newrelic.NotificationDestination('email-destination', {
  type: 'EMAIL',
  active: true,
  properties: [
    {
      key: 'email',
      value: config.require('notifyViaEmail'),
    },
    {
      key: 'includeJsonAttachment',
      value: pulumi.output('true'),
    }
  ],
});

const emailChannel = new newrelic.NotificationChannel('email-channel', {
  destinationId: emailDestination.id.apply(id => id),
  product: 'IINT',
  type: 'EMAIL',
  properties: [
    {
      key: 'subject',
      value: '{{issueTitle}}',
    },
  ],
}, {
  dependsOn: emailDestination,
});






/**
 * Alerts
 * 
 * Receive notifications when an incident is created, closed, or updated.
 * 
 * @link https://docs.newrelic.com/docs/alerts-applied-intelligence/new-relic-alerts/get-started/your-first-nrql-condition/
 * @link https://docs.newrelic.com/docs/query-your-data/nrql-new-relic-query-language/get-started/introduction-nrql-new-relics-query-language/
 */
apps.forEach(name => {
  policies[name] = new newrelic.AlertPolicy(`${name}-alert`, {
    /**
     * The rollup strategy for the policy.
     * Options include: `PER_POLICY`, `PER_CONDITION`, or `PER_CONDITION_AND_TARGET`.  The default is `PER_POLICY`.
     */
    incidentPreference: 'PER_CONDITION',
  });

  const latencyCondition = new newrelic.NrqlAlertCondition(`${name}-latency-condition`, {
    description: 'Alert when latency exceed acceptable threshold.',
    policyId: policies[name].id.apply((id: any) => parseInt(id)),
    nrql: {
      query: `SELECT (count(apm.service.error.count) / count(apm.service.transaction.duration))*100 FROM Metric WHERE (appName ='${name}') AND (transactionType = 'Web')`,
    },
    critical: {
      operator: 'above_or_equals',
      threshold: 1,
      thresholdDuration: 60,
      thresholdOccurrences: 'at_least_once',
    },
    aggregationMethod: 'EVENT_FLOW',
    aggregationDelay: '60',
    violationTimeLimitSeconds: 300000,
    enabled: true,
  }, {
    dependsOn: policies[name],
  });

  const errorCondition = new newrelic.NrqlAlertCondition(`${name}-error-condition`, {
    description: 'Alert when errors exceed acceptable threshold.',
    policyId: policies[name].id.apply((id: any) => parseInt(id)),
    nrql: {
      query: `SELECT count(*) FROM TransactionError WHERE (appName = '${name}') AND (\`error.expected\` IS FALSE OR \`error.expected\` IS NULL)`,
    },
    critical: {
      operator: 'above_or_equals',
      threshold: 1,
      thresholdDuration: 300,
      thresholdOccurrences: 'at_least_once',
    },
    aggregationMethod: 'EVENT_FLOW',
    aggregationDelay: '60',
    violationTimeLimitSeconds: (3 * 60000), // 3 minutes
    enabled: true,
  }, {
    dependsOn: policies[name],
  });








  /**
   * Workflow notifications
   * 
   * Configure notifications for incident workflows to use email.
   * 
   * @link https://docs.newrelic.com/docs/alerts-applied-intelligence/applied-intelligence/incident-workflows/incident-workflows/
   */
  const workflow = new newrelic.Workflow(`${name}-workflow`, {
    accountId: newrelic.config.accountId,
    issuesFilter: {
      name,
      type: 'FILTER',
      predicates: [{
          attribute: 'accumulations.policyName',
          operator: 'EXACTLY_MATCHES',
          values: [policies[name].name.apply((name: any) => name)],
      }],
    },
    destinations: [
      {
        channelId: emailChannel.id.apply(id => id)
      },
    ],
    mutingRulesHandling: 'NOTIFY_ALL_ISSUES',
  });
})












/**
 * Synthetics
 * 
 * Proactively monitor your web applications and APIs from around the world.
 * 
 * @link https://docs.newrelic.com/docs/synthetics/synthetic-monitoring/getting-started/get-started-synthetic-monitoring/
 */
let urls = [
  'http://acme-corp.com',
  'https://acme-corp.com/0101/index.html',
]

urls.forEach(url => {
  synthetics[url] = new newrelic.synthetics.Monitor(`check-${url}`, {
    status: 'ENABLED',
    type: 'BROWSER',
    uri: url,
    period: 'EVERY_MINUTE',
    
    // https://docs.newrelic.com/docs/synthetics/synthetic-monitoring/administration/synthetic-public-minion-ips/#location
    locationsPublics: ['AWS_US_EAST_1', 'AWS_US_WEST_1'],
  
    enableScreenshotOnFailureAndScript: true,
    validationString: 'success',
    verifySsl: true,
    runtimeTypeVersion: '100',
    runtimeType: 'CHROME_BROWSER',
    scriptLanguage: 'JAVASCRIPT',
    tags: [myTeamTag],
  }, {
    ignoreChanges: ['locationsPublics'],
  });
})

// That's all folks :D