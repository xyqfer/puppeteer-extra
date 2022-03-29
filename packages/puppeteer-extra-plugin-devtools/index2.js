const puppeteer = require('puppeteer-extra')
const devtools = require('./index.js')()
puppeteer.use(devtools)

puppeteer
  .launch({ headless: true, defaultViewport: {
    "width": 375,
    "height": 712
  }, args: ['--no-sandbox', '--disable-setuid-sandbox'], })
  .then(async browser => {
    console.log('Start')
    const tunnel = await devtools.createTunnel(browser)
    console.log(tunnel.url)

    const page = await browser.newPage()
    await page.goto('https://example.com')
    console.log('All setup.')
  })