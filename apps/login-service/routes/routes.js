// load up our shiny new route for users
const userRoutes = require('./users');

const newrelic = require('newrelic');
const logger = require('../logger');

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const appRouter = (app, fs) => {

    // we've added in a default route here that handles empty routes
    // at the base API url
    app.get('/', (req, res) => {
        res.send('<h1>Second hop is working</h1>');
    });

    app.get("/health", async function healthCheck(req, res) {
        logger.info("Checking service health...");
        await new Promise((resolve) => {
            setTimeout(resolve, random(1000, 3000))
        })
    
        // Deliberately return a server error.
        if ( 1 == random(0, 1) ) {
            logger.info("Looking good...");
            res.status(200).send('OK');
        } else {
            const error = new Error('Health check failed. Please try again.')
            logger.error(error);
            newrelic.noticeError(error)
            res.status(500).send(error);
        }
    });

    app.get("/confirmation", async function healthCheck(req, res) {
        logger.info("Confirming order...");
        await new Promise((resolve) => {
            setTimeout(resolve, random(1000, 3000))
        })
    
        // Deliberately return a server error.
        if ( 1 == random(0, 1) ) {
            logger.info("Looking good...");
            res.status(200).send('OK');
        } else {
            const error = new Error('Order confirmation failed. Please try again.')
            logger.error(error);
            newrelic.noticeError(error)
            res.status(500).send(error);
        }
    });

    // run our user route module here to complete the wire up
    userRoutes(app, fs);

};

// this line is unchanged
module.exports = appRouter;
