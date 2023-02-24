import * as newrelic from '@pulumi/newrelic';

export default function (props: any): newrelic.synthetics.Monitor {
  
  // let default = {
  //   uri: props.url,
  //   name: `Check ${props.url} (Pulumi)`,
  //   // https://docs.newrelic.com/docs/synthetics/synthetic-monitoring/administration/synthetic-public-minion-ips/#location
  //   enableScreenshotOnFailureAndScript: true,
  //   validationString: 'success',
  // };

  props.name = `Check ${props.uri} (Pulumi)`;

  return new newrelic.synthetics.Monitor(`check-${props.uri}`, props, {
    ignoreChanges: ['locationsPublics'],
  });
}