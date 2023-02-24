import * as pulumi from '@pulumi/pulumi';
import * as newrelic from '@pulumi/newrelic';

export function emailDestination(email: string) {
  return new newrelic.NotificationDestination(`destination-${email}`, {
    type: 'EMAIL',
    active: true,
    properties: [
      {
        key: 'email',
        value: email,
      },
      {
        key: 'includeJsonAttachment',
        value: pulumi.output('true'),
      }
    ],
  })
}

export function emailChannel(destination: newrelic.NotificationDestination) {
  return new newrelic.NotificationChannel(`email-channel-${Math.floor(Math.random() * 9999)}`, {
    destinationId: destination.id.apply((id: string) => id),
    product: 'IINT',
    type: 'EMAIL',
    properties: [
      {
        key: 'subject',
        value: '{{issueTitle}}',
      },
    ],
  }, {
    dependsOn: destination,
  })
}