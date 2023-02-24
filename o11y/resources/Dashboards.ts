import * as newrelic from '@pulumi/newrelic';
declare var require: any
import path from 'path'

// Import Dashboards from JSON
export default function (pathtoJSON: any, override = {}) {
    let importedDashboard = require(
        path.resolve(pathtoJSON)
    )

    return new newrelic.OneDashboardJson(pathtoJSON, {
        json: JSON.stringify(
            { ...importedDashboard, ...override }
        ),
    });
}