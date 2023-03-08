const { join } = require('path');
const { Configuration } = require('puppeteer');

const puppeteerConfig: Configuration = {
  cacheDirectory:join(__dirname, '.cache', 'puppeteer'),
};

export default puppeteerConfig;