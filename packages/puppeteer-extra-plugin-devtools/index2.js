const puppeteer = require('puppeteer-extra')
const devtools = require('./index.js')()
puppeteer.use(devtools)

puppeteer
  .launch({ headless: true, defaultViewport: {
    "width": 375,
    "height": 712,
    isMobile: true,
  }, args: ['--no-sandbox', '--disable-setuid-sandbox'], })
  .then(async browser => {
    console.log('Start')
    const tunnel = await devtools.createTunnel(browser)
    console.log(tunnel.url)

    const page = await browser.newPage()
    const mobile = puppeteer.devices['iPhone X']
    console.log(mobile)
    await page.emulate(mobile)
    await page.goto('https://isawa.badambiz.com/html/sawa-card-challenge/ksa/?lan=ar')
    console.log('All setup.')
  })