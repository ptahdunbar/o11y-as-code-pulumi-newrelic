import * as newrelic from '@pulumi/newrelic';

export default function ({
    name,
    policyName,
    channelId,
    dependsOn = {}
}: {
  name: string;
  policyName: string;
  channelId: any;
  dependsOn?: any;
}) {
  return new newrelic.Workflow(`${name}-workflow`, {
    // accountId: newrelic.config.accountId,
    name: `${name}-workflow (Pulumi)`,
    issuesFilter: {
      name,
      type: 'FILTER',
      predicates: [{
        attribute: 'accumulations.policyName',
        operator: 'EXACTLY_MATCHES',
        values: [
          policyName,
        ],
      }],
    },
    destinations: [{
      channelId,
    }],
    mutingRulesHandling: 'NOTIFY_ALL_ISSUES',
  }, {
    dependsOn,
  });
}