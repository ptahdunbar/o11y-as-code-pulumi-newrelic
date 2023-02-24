import * as newrelic from '@pulumi/newrelic';

export default function ({
    name,
    incidentPreference = 'PER_CONDITION',
}: {
    name: string,
    incidentPreference: string,
}): newrelic.AlertPolicy {
  return new newrelic.AlertPolicy(`${name}-alert`, {
    name: `${name} Alert Policy (Pulumi)`,
    incidentPreference,
  });
}