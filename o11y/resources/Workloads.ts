import * as newrelic from '@pulumi/newrelic';

export default function (name: any, query: any) {
  return new newrelic.plugins.Workload(name, {
    name,
    entitySearchQueries: [{
      query,
    }],
  })
}