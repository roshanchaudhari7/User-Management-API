
const logger = ((req, res, next) => {
    try {
        console.log(`Request URL: ${req.url} Request Method: ${req.method} Request Time: ${new Date().toString()}`);
        next();
    }
    catch (err) {
        console.log(err);
    }
})

module.exports = logger;