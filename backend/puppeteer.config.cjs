const { join } = require('path');

const puppeteerConfig = {
  cacheDirectory:join(__dirname, '.cache', 'puppeteer'),
};

export default puppeteerConfig;