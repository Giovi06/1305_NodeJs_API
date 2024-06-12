const { format } = require('date-fns');
const {v4 : uuid} = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const { log, error } = require('console');

const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss:ms')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);
    try {
        if(!fs.existsSync(path.join(__dirname, 'logs'))) {
            await fs.promises.mkdir(path.join(__dirname, 'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, 'logs', logName), logItem);
    } catch (err) {
        console.log(err);
    }
}

module.exports = logEvents;