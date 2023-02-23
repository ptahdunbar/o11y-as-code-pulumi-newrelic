// load up our shiny new route for users
const webRoutes = require('./webrequest');
const postsData = require('./postsData');

const appRouter = (app, fs) => {
    // we've added in a default route here that handles empty routes
    // at the base API url
    app.get('/', (req, res) => {
        res.send('<h1>First hop service is working</h1>');
    });

    // run our user route module here to complete the wire up
    webRoutes(app,fs);
    postsData(app,fs);
};

// this line is unchanged
module.exports = appRouter;
