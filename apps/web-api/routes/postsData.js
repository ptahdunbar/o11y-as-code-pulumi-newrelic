const logger = require('../logger');
const userRoutes = (app, fs) => {
    // READ
    app.post('/update', (req, res) => {
        console.log(req.headers);
        logger.info(req.body);

        res.send(req.body);
    });
};

module.exports = userRoutes;
