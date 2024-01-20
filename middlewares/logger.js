const express = require('express');

const logger = express()
const reqlogs = require('../logs/requests.log');

const logging = () => (req, res, next) => {
    console.log(reqlogs);
}

module.exports = logger;
