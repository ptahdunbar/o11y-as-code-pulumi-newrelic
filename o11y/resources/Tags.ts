import * as newrelic from '@pulumi/newrelic';

export default async function (app: any, tags: any) {
  // Create tags for the application
  return new newrelic.EntityTags(`tags-${app.name}`, {
    guid: app.guid,
    tags,
  })
}