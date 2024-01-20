const fs = require('fs');
const { ctime } = require('../utils/helper.js');
const logDir = 'logs';
const requestLogFile = 'logs/requestLogs.log';

/* creating logs directory and requestLogs file if not exists */
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);
if (!fs.existsSync(requestLogFile)) fs.writeFileSync(requestLogFile, '');

/* func is used to log http request */
const requestLogger = (req, res, next) => {
    fs.appendFileSync(requestLogFile, `url: ${req.url}\t time: ${ctime()} \n`);
    next();
};

module.exports = { requestLogger };
